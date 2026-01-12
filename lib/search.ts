import { QdrantClient } from "@qdrant/js-client-rest";
import embeddings from "@themaximalist/embeddings.js";
import type { Group } from "./types";

const COLLECTION_NAME = "groups";

// Lazy initialization of Qdrant client
let qdrantClient: QdrantClient | null = null;

/**
 * Get Qdrant URL from environment or use default
 */
function getQdrantUrl(): string {
  return process.env.QDRANT_URL || "http://localhost:6333";
}

/**
 * Get or initialize the Qdrant client
 */
function getQdrantClient(): QdrantClient {
  if (!qdrantClient) {
    qdrantClient = new QdrantClient({ url: getQdrantUrl() });
  }
  return qdrantClient;
}

/**
 * Reset the Qdrant client (useful for testing)
 */
export function resetQdrantClient(): void {
  qdrantClient = null;
}

/**
 * Generate embedding for a single text
 * Uses embeddings.js which returns a float array directly
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // embeddings.js returns a float array directly
    // Default model is Xenova/all-MiniLM-L6-v2 (384 dimensions)
    // Uses local transformers model, no API key required
    const embedding = await embeddings(text, {
      service: "transformers", // local embeddings
      cache: true, // cache embeddings for performance
    });
    
    // Validate the embedding
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error("Invalid embedding format: expected non-empty array");
    }
    
    return embedding;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Provide helpful error message for test environments
    if (process.env.NODE_ENV === 'test') {
      throw new Error(
        `Failed to generate embedding in test environment. ` +
        `Consider using integration tests or mocking the embedding model. ` +
        `Original error: ${errorMessage}`
      );
    }
    throw new Error(`Failed to generate embedding: ${errorMessage}. Query text: "${text}"`);
  }
}


export type SearchOptions = {
  /**
   * Maximum number of results to return
   * @default 10
   */
  limit?: number;
  /**
   * Minimum similarity score threshold (0-1)
   * @default 0.5
   */
  scoreThreshold?: number;
};

export type SearchResult = {
  group: Group;
  score: number;
};

/**
 * Search groups by tags and vector similarity
 * 
 * @param tags - Array of tags; groups matching any of these tags will be returned
 * @param text - Text query for vector similarity search
 * @param options - Search options (limit, scoreThreshold)
 * @returns Array of matching groups with similarity scores
 * @throws Error if Qdrant connection fails or collection doesn't exist
 */
export async function searchGroups(
  tags: string[],
  text: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const { limit = 10, scoreThreshold = 0.5 } = options;

  try {
    const client = getQdrantClient();

    // Ensure text is a valid string
    if (typeof text !== "string" || text.trim().length === 0) {
      throw new Error("Text query must be a non-empty string");
    }
    
    // Generate embedding using embeddings.js
    const vector = await generateEmbedding(text);
    
    // Validate the vector
    if (!Array.isArray(vector) || vector.length === 0) {
      throw new Error("Invalid embedding vector format");
    }

    // Build filter for tags - groups matching any tag will be returned
    // For array fields, we use match with value to check if array contains the value
    const filter = tags.length > 0
      ? {
          should: tags.map((tag) => ({
            key: "tags",
            match: {
              value: tag,
            },
          })),
        }
      : undefined;

    // Search in Qdrant
    const searchResults = await client.search(COLLECTION_NAME, {
      vector,
      limit,
      score_threshold: scoreThreshold,
      filter,
      with_payload: true,
    });

    // Convert Qdrant results to Group objects
    const results: SearchResult[] = searchResults
      .filter((result) => result.score >= scoreThreshold)
      .map((result) => {
        const payload = result.payload as {
          id: string;
          name: string;
          description: string;
          tags: string[];
          cadence?: string | null;
        };

        return {
          group: {
            id: payload.id,
            name: payload.name,
            description: payload.description,
            tags: payload.tags,
            cadence: payload.cadence || undefined,
          } as Group,
          score: result.score,
        };
      });

    return results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search groups: ${error.message}`);
    }
    throw new Error("Failed to search groups: Unknown error");
  }
}

/**
 * Search groups by tags only (no vector similarity)
 * 
 * @param tags - Array of tags; groups matching any of these tags will be returned
 * @param options - Search options (limit)
 * @returns Array of matching groups
 * @throws Error if Qdrant connection fails or collection doesn't exist
 */
export async function searchGroupsByTags(
  tags: string[],
  options: { limit?: number } = {}
): Promise<Group[]> {
  const { limit = 100 } = options;

  if (tags.length === 0) {
    return [];
  }

  try {
    const client = getQdrantClient();

    // Build filter for tags - groups matching any tag will be returned
    const filter = {
      should: tags.map((tag) => ({
        key: "tags",
        match: {
          value: tag,
        },
      })),
    };

    // Scroll through all points with the filter
    const scrollResults = await client.scroll(COLLECTION_NAME, {
      filter,
      limit,
      with_payload: true,
      with_vector: false,
    });

    // Convert to Group objects
    const groups: Group[] = (scrollResults.points || []).map((point) => {
      const payload = point.payload as {
        id: string;
        name: string;
        description: string;
        tags: string[];
        cadence?: string | null;
      };

      return {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        tags: payload.tags,
        cadence: payload.cadence || undefined,
      } as Group;
    });

    return groups;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search groups by tags: ${error.message}`);
    }
    throw new Error("Failed to search groups by tags: Unknown error");
  }
}

/**
 * Search groups by vector similarity only (no tag filtering)
 * 
 * @param text - Text query for vector similarity search
 * @param options - Search options (limit, scoreThreshold)
 * @returns Array of matching groups with similarity scores
 */
export async function searchGroupsByText(
  text: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  return searchGroups([], text, options);
}
