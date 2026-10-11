import driver from "@/app/lib/neo4j";

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

export async function retrieveDocuments(
  query: string
): Promise<RetrievalResult> {
  const normalizedQuery = query
    .toLowerCase()
    .trim();

  if (!normalizedQuery) {
    return {
      query,
      documents: [],
    };
  }

  const stopWords = new Set([
    "what",
    "which",
    "where",
    "when",
    "why",
    "how",
    "are",
    "is",
    "the",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "for",
    "in",
    "on",
    "with",
    "from",
    "can",
    "could",
    "would",
    "should",
    "do",
    "does",
    "about",
    "available",
    "rules",
  ]);

  const searchTerms = [
    ...new Set(
      normalizedQuery
        .replace(/[^\p{L}\p{N}\s-]/gu, " ")
        .split(/\s+/)
        .filter(
          (term) =>
            term.length >= 3 &&
            !stopWords.has(term)
        )
    ),
  ];

  if (searchTerms.length === 0) {
    return {
      query,
      documents: [],
    };
  }

  const result = await driver.executeQuery(`
    MATCH (d:Document)
    RETURN
      d.id AS id,
      d.name AS title,
      coalesce(d.content, "") AS content
    ORDER BY d.name
  `);

  const documents = result.records
    .map((record) => {
      const id = record.get("id");
      const title = record.get("title");
      const content = record.get("content");

      const safeId =
        typeof id === "string"
          ? id
          : String(id ?? "");

      const safeTitle =
        typeof title === "string"
          ? title
          : String(title ?? "");

      const safeContent =
        typeof content === "string"
          ? content
          : String(content ?? "");

      const searchableTitle =
        safeTitle.toLowerCase();

      const searchableContent =
        safeContent.toLowerCase();

      let score = 0;

      for (const term of searchTerms) {
        if (searchableTitle.includes(term)) {
          score += 3;
        }

        if (searchableContent.includes(term)) {
          score += 1;
        }
      }

      return {
        id: safeId,
        title: safeTitle,
        content: safeContent,
        source: "Neo4j Aura",
        score,
      };
    })
    .filter(
      (document) =>
        (document.score ?? 0) >= 2
    )
    .sort(
      (a, b) =>
        (b.score ?? 0) - (a.score ?? 0)
    )
    .slice(0, 3);

  return {
    query,
    documents,
  };
}