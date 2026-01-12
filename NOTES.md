# Notes

If you run out of time, use this file to share:

- What you'd improve next
- What trade-offs you made
- How you'd evolve the agent with more time

## Trade-offs Made

### 1. **Local Embeddings vs API-based Embeddings**
- **Choice**: Using `embeddings.js` with local `Xenova/all-MiniLM-L6-v2` model
- **Trade-off**: No API costs or keys required, but potentially lower quality embeddings compared to OpenAI/Cohere embeddings
- **Impact**: May affect vector search accuracy, especially for nuanced queries

### 2. **Simple Linear Graph vs Complex Multi-step Flow**
- **Choice**: Two-node linear graph (PreferenceExtractor → Replier)
- **Trade-off**: Simpler to understand and debug, but lacks feedback loops and refinement capabilities
- **Impact**: No ability to refine search results or ask clarifying questions when preferences are ambiguous

### 3. **No Error Recovery or Fallback Strategies**
- **Choice**: Basic error handling at API level, but no graceful degradation in the graph
- **Trade-off**: Simpler implementation, but poor user experience when things go wrong
- **Impact**: If Qdrant is down or search fails, user gets a generic error message

### 4. **Synchronous BAML Client**
- **Choice**: Using `BamlSyncClient` instead of async client
- **Trade-off**: Simpler code, but blocks execution during LLM calls
- **Impact**: No streaming responses, potentially slower perceived performance

## Improvements to Consider

### Agent Architecture

1. **Add Feedback Loop for Result Refinement**
   - After Replier, add a "ResultEvaluator" node that checks if results are satisfactory
   - If too many/few results or low relevance, loop back to refine preferences
   - Implement conditional edges based on result quality metrics

2. **Result Ranking and Filtering**
   - Add a "ResultRanker" node that scores and ranks groups by relevance
   - Filter out low-confidence matches before presenting to user
   - Implement result deduplication and diversity scoring

### Search Improvements

1. **Query Expansion**
   - Expand user queries with synonyms and related terms
   - Use LLM to generate alternative phrasings of preferences
   - Search with multiple query variations and merge results

2. **Result Caching**
   - Cache embeddings for common queries
   - Cache search results for frequently requested tag combinations
   - Implement TTL-based cache invalidation

3. **Search Result Post-processing**
   - Re-rank results using cross-encoder models for better relevance
   - Apply diversity filters to avoid showing too many similar groups
   - Group results by category or theme

### Error Handling & Resilience

1. **Graceful Degradation**
   - Fallback to in-memory search if Qdrant is unavailable
   - Use mock data or cached results when external services fail
   - Implement retry logic with exponential backoff

2. **Input Validation & Sanitization**
   - Validate and sanitize user inputs before processing
   - Handle edge cases (empty messages, very long messages, special characters)
   - Provide helpful error messages for invalid inputs

3. **Monitoring & Observability**
   - Add logging for each graph node execution
   - Track preference extraction accuracy
   - Monitor search result quality and user satisfaction

### Performance Optimizations

1. **Parallel Processing**
   - Run preference extraction and initial search in parallel when possible
   - Batch multiple searches together

2. **Embedding Optimization**
   - Cache embeddings for common queries and tags
   - Pre-compute embeddings for all groups during seeding
   - Use faster embedding models for less critical queries

3. **Response Streaming**
   - Stream LLM responses as they're generated
   - Show partial results to users while search is in progress
   - Implement progressive result loading

### User Experience Enhancements

1. **Rich Response Formatting**
   - Return structured data (group IDs, metadata) along with text response
   - Enable frontend to display groups in cards or list format
   - Include relevance scores and match reasons

2. **Interactive Refinement**
   - Allow users to provide feedback on results
   - Support "show more like this" or "exclude this type" interactions
   - Implement preference learning from user feedback

3. **Contextual Suggestions**
   - Suggest related groups based on selected preferences
   - Show "people also liked" recommendations
   - Provide alternative search paths when no results found