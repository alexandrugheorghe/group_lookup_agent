# Neya technical test (setup)

This repo is a small Next.js app with a chat UI and a minimal API route.

For the take-home brief, see **`INSTRUCTIONS.md`**.

## Note on group search

This starter intentionally does **not** include a `lib/tools.ts` “search stub”. If you implement group matching, create it wherever you prefer (e.g. in `lib/agent.ts` or a new module under `lib/`), using `lib/mockGroups.ts` as the source of truth.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local`:

```bash
cp .env.example .env.local
```

3. Add an LLM API key to `.env.local`:

```bash
GEMINI_API_KEY=...

# or (if you prefer OpenAI):
# OPENAI_API_KEY=...
```

If you set both keys, the app will **prefer Gemini**.

4. (Optional) Set up Qdrant for vector search:

Start Qdrant with Docker Compose:

```bash
docker-compose up -d
```

Seed the Qdrant database with vectorized groups:

```bash
npm run seed:qdrant
```

This will:
- Connect to Qdrant (default: `http://localhost:6333`, set `QDRANT_URL` to override)
- Generate embeddings for all groups using **embeddings.js** (open-source, no API key required)
- Store vectors and original group data in Qdrant for both vector and text search

**Note:** The seeding script uses [embeddings.js](https://github.com/themaximalist/embeddings.js) for embeddings, which is completely free and runs locally using the `Xenova/all-MiniLM-L6-v2` model. No API keys are needed for the embedding generation.

5. Run the app:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Testing

Run tests with Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Note:** Tests require Qdrant to be running. Make sure to start Qdrant with `docker-compose up -d` and seed the database with `npm run seed:qdrant` before running tests.
