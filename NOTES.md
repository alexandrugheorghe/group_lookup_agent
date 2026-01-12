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

1. **Add Clarification Node**
   - Insert a decision node between PreferenceExtractor and Replier
   - When preferences are ambiguous or too broad, ask clarifying questions
   - Use confidence scores from preference extraction to trigger clarification

2. **Add Feedback Loop for Result Refinement**
   - After Replier, add a "ResultEvaluator" node that checks if results are satisfactory
   - If too many/few results or low relevance, loop back to refine preferences
   - Implement conditional edges based on result quality metrics

3. **Result Ranking and Filtering**
   - Add a "ResultRanker" node that scores and ranks groups by relevance
   - Filter out low-confidence matches before presenting to user
   - Implement result deduplication and diversity scoring

### Search Improvements

1. **Hybrid Search Strategy**
   - Combine tag filtering with vector similarity search
   - Use `searchGroups()` function that supports both tags and text queries
   - Weight tag matches vs semantic similarity appropriately

2. **Query Expansion**
   - Expand user queries with synonyms and related terms
   - Use LLM to generate alternative phrasings of preferences
   - Search with multiple query variations and merge results

3. **Result Caching**
   - Cache embeddings for common queries
   - Cache search results for frequently requested tag combinations
   - Implement TTL-based cache invalidation

4. **Search Result Post-processing**
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
   - Use async BAML client for non-blocking LLM calls

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

## How to Evolve the Agent

### Phase 1: Enhanced Preference Extraction

1. **Confidence Scoring**
   - Modify `PreferenceMatcher` to return confidence scores for each preference
   - Use confidence to determine if clarification is needed
   - Filter out low-confidence preferences

2. **Preference Validation**
   - Add a validation step that checks if extracted preferences exist in the system
   - Suggest similar preferences if exact match not found
   - Handle typos and variations in preference names

### Phase 2: Add Decision Logic

1. **Clarification Node**
   ```typescript
   ClarificationNode: async (state) => {
     if (state.preferences.length === 0 || confidence < threshold) {
       return { 
         messages: [new AIMessage(askClarifyingQuestion())],
         needsClarification: true 
       };
     }
     return { needsClarification: false };
   }
   ```

2. **Conditional Edges**
   - Add conditional routing based on state (needsClarification, resultCount, etc.)
   - Route back to PreferenceExtractor if clarification provided
   - Skip to END if results are satisfactory

### Phase 3: Hybrid Search Integration

1. **Update Replier Node**
   - Use `searchGroups()` instead of `searchGroupsByTags()`
   - Pass user's original message as text query for vector search
   - Combine tag filtering with semantic similarity

2. **Result Quality Assessment**
   - Add scoring based on tag match count, vector similarity, and group popularity
   - Filter results below quality threshold
   - Limit results to top N most relevant

### Phase 4: Multi-turn Conversations

1. **State Persistence**
   - Maintain conversation history across turns
   - Accumulate preferences from multiple messages
   - Track which groups have been shown to avoid repetition

2. **Context-aware Extraction**
   - Pass conversation history to PreferenceMatcher
   - Allow users to refine: "actually, I meant..." or "also interested in..."
   - Support negation: "not interested in X"

### Phase 5: Advanced Features

1. **Result Refinement Loop**
   - After showing results, allow user to say "show me more" or "these aren't right"
   - Loop back to search with refined preferences
   - Implement iterative refinement until user is satisfied

2. **Learning & Personalization**
   - Track which groups users actually join or express interest in
   - Learn from successful matches to improve future recommendations
   - Build user preference profiles over time

3. **Multi-modal Input**
   - Support structured input (e.g., forms) in addition to natural language
   - Allow users to select preferences from a list
   - Combine structured and unstructured inputs

### Implementation Priority

**High Priority:**
- Hybrid search (tags + vector similarity)
- Confidence scoring in preference extraction
- Better error handling and fallbacks
- Result ranking and filtering

**Medium Priority:**
- Clarification node for ambiguous queries
- Conversation context management
- Response streaming
- Result caching

**Low Priority (Nice to Have):**
- Learning from user feedback
- Multi-modal input support
- Advanced personalization
- Result refinement loops