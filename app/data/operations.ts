// app/data/operations.ts

export type Department = {
  id: string;
  name: string;
  function: string;
};

export type System = {
  id: string;
  name: string;
  type: string;
};

export type Technology = {
  id: string;
  name: string;
};

export type Process = {
  id: string;
  name: string;
  departmentId: string;
  description: string;
  volumePerYear: number;
  manualMinutes: number;
  automationPotential: number;
  businessImpact: "High" | "Medium" | "Low";
  complexity: "Low" | "Medium" | "High";
  criticality: "Critical" | "High" | "Medium";
  frequency: "Daily" | "Weekly" | "Monthly" | "Ad hoc";
  systemIds: string[];
  inputIds: string[];
  outputIds: string[];
};

export type Automation = {
  id: string;
  name: string;
  processId: string;
  technologyId: string;
  status: "Live" | "In Development" | "Planned" | "Retired";
  owner: string;
  annualHoursSaved: number;
  estimatedValue: number;
  complexity: "Low" | "Medium" | "High";
  opportunityScore: number;
};

export type Input = {
  id: string;
  name: string;
  type: string;
};

export type Output = {
  id: string;
  name: string;
  type: string;
};

export type Location = {
  id: string;
  name: string;
  region: string;
};

export const departments: Department[] = [
  {
    id: "DEPT-001",
    name: "Finance Operations",
    function: "Finance",
  },
  {
    id: "DEPT-002",
    name: "Strategic Procurement",
    function: "Procurement",
  },
  {
    id: "DEPT-003",
    name: "Supply Operations",
    function: "Supply Chain",
  },
  {
    id: "DEPT-004",
    name: "Customer Operations",
    function: "Customer Service",
  },
  {
    id: "DEPT-005",
    name: "Service Management",
    function: "Service Management",
  },
  {
    id: "DEPT-006",
    name: "Corporate Operations",
    function: "Corporate Operations",
  },
];

export const systems: System[] = [
  {
    id: "SYS-001",
    name: "CoreLedger ERP",
    type: "ERP",
  },
  {
    id: "SYS-002",
    name: "Nimbus CRM",
    type: "CRM",
  },
  {
    id: "SYS-003",
    name: "FlowDesk",
    type: "Workflow Platform",
  },
  {
    id: "SYS-004",
    name: "DocVault",
    type: "Document Management",
  },
  {
    id: "SYS-005",
    name: "MailHub",
    type: "Email Platform",
  },
  {
    id: "SYS-006",
    name: "SupplySphere",
    type: "HR Platform",
  },
  {
    id: "SYS-007",
    name: "CaseFlow",
    type: "Data Platform",
  },
];

export const technologies: Technology[] = [
  {
    id: "TECH-001",
    name: "Neo4j",
  },
  {
    id: "TECH-004",
    name: "RPA",
  },
  {
    id: "TECH-005",
    name: "AI Agent",
  },
  {
    id: "TECH-003",
    name: "API Automation",
  },
  {
    id: "TECH-002",
    name: "Hybrid Automation",
  },
];

export const inputs: Input[] = [
  {
    id: "input-invoice",
    name: "Supplier Invoice",
    type: "Document",
  },
  {
    id: "input-purchase-order",
    name: "Purchase Order",
    type: "Transaction",
  },
  {
    id: "input-email",
    name: "Business Email",
    type: "Message",
  },
  {
    id: "input-customer-request",
    name: "Customer Request",
    type: "Message",
  },
  {
    id: "input-employee-record",
    name: "Employee Record",
    type: "Structured Data",
  },
  {
    id: "input-stock-file",
    name: "Stock Availability File",
    type: "Data File",
  },
];

export const outputs: Output[] = [
  {
    id: "output-payment",
    name: "Payment Instruction",
    type: "Transaction",
  },
  {
    id: "output-reconciliation",
    name: "Reconciliation Report",
    type: "Report",
  },
  {
    id: "output-supplier-response",
    name: "Supplier Response",
    type: "Email",
  },
  {
    id: "output-customer-response",
    name: "Customer Response",
    type: "Email",
  },
  {
    id: "output-dashboard",
    name: "Operational Dashboard",
    type: "Analytics",
  },
  {
    id: "output-employee-update",
    name: "Employee Record Update",
    type: "System Update",
  },
];

export const locations: Location[] = [
  {
    id: "location-west",
    name: "Western Europe",
    region: "Europe",
  },
  {
    id: "location-central",
    name: "Central Europe",
    region: "Europe",
  },
  {
    id: "location-north",
    name: "Northern Europe",
    region: "Europe",
  },
];

export const processes: Process[] = [
  {
    id: "PROC-001",
    name: "Supplier Invoice Reconciliation",
    departmentId: "DEPT-001",
    description:
      "Validate supplier invoices against purchase and payment records.",
    volumePerYear: 8420,
    manualMinutes: 16,
    automationPotential: 91,
    businessImpact: "High",
    complexity: "Medium",
    criticality: "Critical",
    frequency: "Daily",
    systemIds: ["SYS-001", "SYS-004", "SYS-005"],
    inputIds: ["input-invoice", "input-purchase-order"],
    outputIds: ["output-payment", "output-reconciliation"],
  },

  {
    id: "PROC-002",
    name: "Payment Status Management",
    departmentId: "DEPT-001",
    description:
      "Process incoming payment-status requests and provide validated responses.",
    volumePerYear: 6740,
    manualMinutes: 11,
    automationPotential: 86,
    businessImpact: "High",
    complexity: "Low",
    criticality: "High",
    frequency: "Daily",
    systemIds: ["SYS-001", "SYS-005"],
    inputIds: ["input-email"],
    outputIds: ["output-supplier-response"],
  },

  {
    id: "PROC-003",
    name: "Purchase Order Validation",
    departmentId: "DEPT-002",
    description:
      "Review purchase requests and validate required procurement information.",
    volumePerYear: 5180,
    manualMinutes: 19,
    automationPotential: 82,
    businessImpact: "High",
    complexity: "Medium",
    criticality: "High",
    frequency: "Daily",
    systemIds: ["SYS-001", "SYS-003"],
    inputIds: ["input-purchase-order"],
    outputIds: ["output-reconciliation"],
  },

  {
    id: "PROC-004",
    name: "Supplier Data Onboarding",
    departmentId: "DEPT-002",
    description:
      "Collect, validate and register new supplier information.",
    volumePerYear: 2140,
    manualMinutes: 27,
    automationPotential: 78,
    businessImpact: "High",
    complexity: "High",
    criticality: "High",
    frequency: "Weekly",
    systemIds: ["SYS-001", "SYS-004", "SYS-003"],
    inputIds: ["input-email", "input-invoice"],
    outputIds: ["output-reconciliation"],
  },

  {
    id: "PROC-005",
    name: "Stock Availability Monitoring",
    departmentId: "DEPT-003",
    description:
      "Monitor stock information and identify supply exceptions.",
    volumePerYear: 3650,
    manualMinutes: 14,
    automationPotential: 84,
    businessImpact: "High",
    complexity: "Medium",
    criticality: "Critical",
    frequency: "Daily",
    systemIds: ["SYS-007", "SYS-001"],
    inputIds: ["input-stock-file"],
    outputIds: ["output-dashboard"],
  },

  {
    id: "PROC-006",
    name: "Customer Request Routing",
    departmentId: "DEPT-004",
    description:
      "Classify incoming customer requests and route them to the appropriate team.",
    volumePerYear: 12600,
    manualMinutes: 7,
    automationPotential: 89,
    businessImpact: "High",
    complexity: "Low",
    criticality: "High",
    frequency: "Daily",
    systemIds: ["SYS-002", "SYS-005"],
    inputIds: ["input-customer-request"],
    outputIds: ["output-customer-response"],
  },

  {
    id: "PROC-007",
    name: "Contract Data Review",
    departmentId: "DEPT-005",
    description:
      "Review contract data and validate required information across operational records.",
    volumePerYear: 3920,
    manualMinutes: 18,
    automationPotential: 79,
    businessImpact: "Medium",
    complexity: "Medium",
    criticality: "High",
    frequency: "Weekly",
    systemIds: ["SYS-004", "SYS-001"],
    inputIds: ["input-invoice", "input-email"],
    outputIds: ["output-reconciliation"],
  },

  {
    id: "PROC-008",
    name: "Service Case Classification",
    departmentId: "DEPT-006",
    description:
      "Classify service cases and route them to the appropriate operational team.",
    volumePerYear: 5280,
    manualMinutes: 10,
    automationPotential: 84,
    businessImpact: "Medium",
    complexity: "Medium",
    criticality: "High",
    frequency: "Daily",
    systemIds: ["SYS-003", "SYS-006"],
    inputIds: ["input-email"],
    outputIds: ["output-employee-update"],
  },
];

export const automations: Automation[] = [
  {
    id: "AUTO-001",
    name: "Orion Invoice Matcher",
    processId: "PROC-001",
    technologyId: "TECH-002",
    status: "Live",
    owner: "Finance Automation Team",
    annualHoursSaved: 2245,
    estimatedValue: 168400,
    complexity: "Medium",
    opportunityScore: 94,
  },

  {
    id: "AUTO-002",
    name: "Lumen Payment Assistant",
    processId: "PROC-002",
    technologyId: "TECH-005",
    status: "Live",
    owner: "Finance Operations Team",
    annualHoursSaved: 1235,
    estimatedValue: 92600,
    complexity: "Low",
    opportunityScore: 89,
  },

  {
    id: "AUTO-003",
    name: "Atlas Purchase Validator",
    processId: "PROC-003",
    technologyId: "TECH-004",
    status: "In Development",
    owner: "Procurement Automation Team",
    annualHoursSaved: 1640,
    estimatedValue: 121500,
    complexity: "Medium",
    opportunityScore: 87,
  },

  {
    id: "AUTO-004",
    name: "Nova Supplier Gateway",
    processId: "PROC-004",
    technologyId: "TECH-002",
    status: "Planned",
    owner: "Supplier Operations Team",
    annualHoursSaved: 980,
    estimatedValue: 73500,
    complexity: "High",
    opportunityScore: 81,
  },

  {
    id: "AUTO-005",
    name: "Pulse Stock Monitor",
    processId: "PROC-005",
    technologyId: "TECH-003",
    status: "Live",
    owner: "Supply Intelligence Team",
    annualHoursSaved: 850,
    estimatedValue: 64200,
    complexity: "Medium",
    opportunityScore: 85,
  },

  {
    id: "AUTO-006",
    name: "Vector Request Router",
    processId: "PROC-006",
    technologyId: "TECH-005",
    status: "Live",
    owner: "Customer Automation Team",
    annualHoursSaved: 1460,
    estimatedValue: 109500,
    complexity: "Low",
    opportunityScore: 92,
  },

  {
    id: "AUTO-007",
    name: "Orbit Contract Analyzer",
    processId: "PROC-007",
    technologyId: "TECH-003",
    status: "In Development",
    owner: "Service Automation Team",
    annualHoursSaved: 420,
    estimatedValue: 31500,
    complexity: "Medium",
    opportunityScore: 75,
  },

  {
    id: "AUTO-008",
    name: "Echo Case Classifier",
    processId: "PROC-008",
    technologyId: "TECH-004",
    status: "Planned",
    owner: "Corporate Automation Team",
    annualHoursSaved: 610,
    estimatedValue: 45800,
    complexity: "Medium",
    opportunityScore: 79,
  },
];

/*
 * Process dependencies
 *
 * These relationships will later become Neo4j edges:
 *
 * Supplier Invoice Reconciliation
 *       ↓
 * Payment Status Management
 *
 * Supplier Data Onboarding
 *       ↓
 * Purchase Order Validation
 *
 * Stock Availability Monitoring
 *       ↓
 * Purchase Order Validation
 *
 * Customer Request Routing
 *       ↓
 * Payment Status Management
 */

export const processDependencies = [
  {
    from: "PROC-004",
    to: "PROC-003",
    type: "DEPENDS_ON",
  },
  {
    from: "PROC-001",
    to: "PROC-002",
    type: "INFLUENCES",
  },
  {
    from: "PROC-005",
    to: "PROC-003",
    type: "INFORMS",
  },
  {
    from: "PROC-006",
    to: "PROC-002",
    type: "ROUTES_TO",
  },
];