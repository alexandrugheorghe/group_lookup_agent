import { QdrantClient } from "@qdrant/js-client-rest";
import embeddings from "@themaximalist/embeddings.js";
import { MOCK_GROUPS } from "../lib/mockGroups";
import type { Group } from "../lib/types";

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
const COLLECTION_NAME = "groups";

function createTextForEmbedding(group: Group): string {
  // Combine all searchable text fields for embedding
  const parts = [
    group.name,
    group.description,
    ...group.tags,
    group.cadence || "",
  ];
  return parts.filter(Boolean).join(" ");
}

async function main() {
  console.log("🚀 Starting Qdrant seeding service...");

  // Initialize Qdrant client
  const client = new QdrantClient({ url: QDRANT_URL });

  // Check if Qdrant is accessible
  try {
    await client.getCollections();
    console.log("✅ Connected to Qdrant at", QDRANT_URL);
  } catch (error) {
    console.error("❌ Failed to connect to Qdrant:", error);
    console.error("💡 Make sure Qdrant is running: docker-compose up -d");
    process.exit(1);
  }

  // Initialize embeddings.js (open-source, no API key required)
  console.log("📦 Initializing embeddings.js (open-source embedding model)...");
  
  // Prepare texts for embedding
  const texts = MOCK_GROUPS.map((group) => {
    return createTextForEmbedding(group);
  });
  console.log(`🔢 Generating embeddings for ${texts.length} groups...`);

  // Generate a test embedding to determine vector size
  console.log("  Determining embedding dimensions...");
  const testEmbedding = await embeddings(texts[0], {
    service: "transformers", // local embeddings
    cache: true,
  });
  
  if (!Array.isArray(testEmbedding) || testEmbedding.length === 0) {
    throw new Error("Failed to get test embedding");
  }
  
  const vectorSize = testEmbedding.length;
  console.log(`  ✅ Embedding dimension: ${vectorSize}`);
  console.log("✅ embeddings.js initialized");

  // Check if collection exists, delete if it does (for fresh seed)
  try {
    const collections = await client.getCollections();
    if (collections.collections.some((c) => c.name === COLLECTION_NAME)) {
      console.log(`🗑️  Deleting existing collection: ${COLLECTION_NAME}`);
      await client.deleteCollection(COLLECTION_NAME);
    }
  } catch {
    // Collection doesn't exist, which is fine
    console.log(`📝 Collection ${COLLECTION_NAME} doesn't exist yet`);
  }

  // Create collection with detected vector size
  console.log(`📦 Creating collection: ${COLLECTION_NAME}`);
  await client.createCollection(COLLECTION_NAME, {
    vectors: {
      size: vectorSize,
      distance: "Cosine",
    },
  });

  // Generate embeddings in batches using embeddings.js
  const batchSize = 50; // Process in batches for efficiency
  const allEmbeddings: number[][] = [];
  
  console.log("  Generating embeddings in batches...");
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    // Generate embeddings for each text in the batch
    // embeddings.js returns a float array directly for each text
    const batchPromises = batch.map((text) =>
      embeddings(text, {
        service: "transformers", // local embeddings
        cache: true,
      })
    );
    
    const batchResults = await Promise.all(batchPromises);
    
    // Validate and collect embeddings
    const convertedBatch: number[][] = batchResults.map((embedding: number[], idx: number) => {
      if (!Array.isArray(embedding) || embedding.length === 0) {
        throw new Error(`Invalid embedding for text at index ${i + idx}`);
      }
      return embedding;
    });
    
    allEmbeddings.push(...convertedBatch);
    const batchCount = Math.floor(i / batchSize) + 1;
    console.log(`  Processed batch ${batchCount} (${allEmbeddings.length}/${texts.length} embeddings)`);
  }

  console.log("✅ Generated all embeddings");

  // Prepare points for Qdrant
  const points = MOCK_GROUPS.map((group, index) => ({
    id: index + 1, // Qdrant uses numeric IDs or UUIDs
    vector: allEmbeddings[index] as number[], // Ensure it's a regular number array
    payload: {
      // Store all original data for text search and retrieval
      id: group.id,
      name: group.name,
      description: group.description,
      tags: group.tags,
      cadence: group.cadence || null,
      // Store the full text for text search
      text: createTextForEmbedding(group),
    },
  }));

  // Upsert points in batches
  console.log(`💾 Storing ${points.length} points in Qdrant...`);
  const upsertBatchSize = 50;
  for (let i = 0; i < points.length; i += upsertBatchSize) {
    const batch = points.slice(i, i + upsertBatchSize);
    await client.upsert(COLLECTION_NAME, {
      wait: true,
      points: batch,
    });
    console.log(`  Stored batch ${Math.floor(i / upsertBatchSize) + 1}/${Math.ceil(points.length / upsertBatchSize)}`);
  }

  // Verify the collection
  const collectionInfo = await client.getCollection(COLLECTION_NAME);
  console.log("✅ Seeding complete!");
  console.log(`📊 Collection info:`);
  console.log(`   - Points count: ${collectionInfo.points_count}`);
  const vectorsConfig = collectionInfo.config?.params?.vectors;
  if (vectorsConfig && typeof vectorsConfig === "object" && "size" in vectorsConfig) {
    console.log(`   - Vector size: ${vectorsConfig.size}`);
    if ("distance" in vectorsConfig) {
      console.log(`   - Distance: ${vectorsConfig.distance}`);
    }
  }
}

main().catch((error) => {
  console.error("❌ Error during seeding:", error);
  process.exit(1);
});
