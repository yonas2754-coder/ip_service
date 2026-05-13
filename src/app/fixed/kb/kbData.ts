export interface KBArticle {
  id: string;
  title: string;
  category: "Troubleshooting" | "Provisioning" | "General";
  excelMapping: string; // Must match SPECIFIC_REQUESTS from Excel
  steps: string[];
  slaTarget: number;
  tags: string[];
  historyCount: number; // Number of times this fixed a ticket
}

export const SAMPLE_KB_DATA: KBArticle[] = [
  {
    id: "KB-001",
    title: "vISP Bandwidth Adjustment Procedure",
    category: "Provisioning",
    excelMapping: "vISP (provisioning, Toubleshooting, BW Adjustment)",
    steps: [
      "Verify customer Service Number in the Billing System.",
      "Login to the IPRAN Edge Node.",
      "Locate the sub-interface associated with the circuit.",
      "Apply the 'qos-profile' with the requested bandwidth.",
      "Confirm throughput using a speed test."
    ],
    slaTarget: 30,
    tags: ["IPRAN", "Bandwidth", "Provisioning"],
    historyCount: 142
  },
  {
    id: "KB-002",
    title: "BGP Peering Down - SAAZ/EAAZ Region",
    category: "Troubleshooting",
    excelMapping: "BGP Related (AS# Assignemnet, Configuration, Troubleshooting)",
    steps: [
      "Check BGP neighbor state: 'show ip bgp summary'.",
      "Verify physical link and Ping Peer IP.",
      "Check for AS Number mismatch in the config.",
      "Clear BGP session: 'clear ip bgp * soft' to avoid downtime.",
      "Inspect Prefix-lists for filtering issues."
    ],
    slaTarget: 45,
    tags: ["BGP", "Routing", "Core"],
    historyCount: 89
  }
];