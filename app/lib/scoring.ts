export type OpportunityPriority = "High" | "Medium" | "Low";

export type AutomationMaturity = "Production" | "Pilot" | "Other";

export type OpportunityInput = {
  confidence: number;
  maturity: AutomationMaturity;
  systems: number;
  dependencies: number;
};

export type OpportunityScore = {
  score: number;
  priority: OpportunityPriority;
};

/**
 * Canonical opportunity scoring engine.
 *
 * The score represents the potential for further automation,
 * optimization, simplification, or operational improvement.
 *
 * IMPORTANT:
 * - This function is the single source of truth for opportunity scoring.
 * - Dashboard pages must NOT implement their own opportunity formulas.
 * - Maturity remains a human-readable value ("Production", "Pilot", etc.).
 */
export function calculateOpportunityScore({
  confidence,
  maturity,
  systems,
  dependencies,
}: OpportunityInput): OpportunityScore {
  const normalizedConfidence = clamp(confidence, 0, 100);
  const normalizedSystems = Math.max(0, systems);
  const normalizedDependencies = Math.max(0, dependencies);

  /*
   * Opportunity is influenced by four dimensions:
   *
   * 1. Confidence gap
   *    Lower confidence means more room for improvement.
   *
   * 2. Maturity
   *    Pilot processes retain more improvement potential than
   *    production processes.
   *
   * 3. System complexity
   *    Processes touching several systems have greater optimization
   *    and orchestration potential.
   *
   * 4. Dependency complexity
   *    Processes with more dependencies have more opportunities
   *    for simplification and optimization.
   */

  const confidenceGap = 100 - normalizedConfidence;

  const maturityOpportunity =
    maturity === "Pilot"
      ? 20
      : maturity === "Production"
        ? 0
        : 10;

  const systemComplexity = Math.min(normalizedSystems * 10, 30);

  const dependencyComplexity = Math.min(
    normalizedDependencies * 5,
    20
  );

  /*
   * Baseline opportunity.
   *
   * This prevents highly mature/high-confidence processes from
   * automatically falling to near-zero simply because they are
   * already automated.
   */
  const baseline = 35;

  const confidenceContribution = confidenceGap * 0.5;

  const rawScore =
    baseline +
    confidenceContribution +
    maturityOpportunity +
    systemComplexity +
    dependencyComplexity;

  const score = Math.round(clamp(rawScore, 0, 100));

  return {
    score,
    priority: getOpportunityPriority(score),
  };
}

/**
 * Canonical priority thresholds.
 */
export function getOpportunityPriority(
  score: number
): OpportunityPriority {
  if (score >= 60) {
    return "High";
  }

  if (score >= 35) {
    return "Medium";
  }

  return "Low";
}

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(Math.max(value, minimum), maximum);
}