/**
 * Mock for @themaximalist/embeddings.js
 * Returns a simple mock embedding vector for testing
 */

// Mock embedding function that returns a 384-dimensional vector (matching all-MiniLM-L6-v2)
async function embeddings(text, options = {}) {
  // Return a deterministic mock embedding based on the text
  // This is a simple hash-based approach for testing
  const hash = text.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  // Generate a 384-dimensional vector with deterministic values
  const embedding = Array.from({ length: 384 }, (_, i) => {
    // Use a combination of hash and index to generate deterministic values
    const value = Math.sin((hash + i) * 0.01) * 0.1;
    return parseFloat(value.toFixed(6));
  });
  
  return embedding;
}

module.exports = embeddings;
module.exports.default = embeddings;
