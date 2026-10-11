export type RetrievedDocument = {
  id: string;
  title: string;
  content: string;
  source: string;
  score?: number;
};

export type RetrievalResult = {
  query: string;
  documents: RetrievedDocument[];
};

/*
 * ---------------------------------------------------------
 * DOCUMENT RETRIEVAL
 * ---------------------------------------------------------
 *
 * This is the retrieval interface for the future RAG layer.
 *
 * Current state:
 * - No vector database
 * - No embeddings
 * - No LLM calls
 * - No external document search
 *
 * The function currently returns an empty result.
 *
 * Future architecture:
 *
 * User Question
 *      ↓
 * Retrieval Layer
 *      ↓
 * Vector / Keyword Search
 *      ↓
 * Relevant Document Chunks
 *      ↓
 * AI Context
 * ---------------------------------------------------------
 */

export async function retrieveDocuments(
  query: string
): Promise<RetrievalResult> {
  return {
    query,
    documents: [],
  };
}