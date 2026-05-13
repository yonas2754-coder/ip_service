export const REQ_TYPES = ["Provisioning", "Support"];
export const REQ_METHODS = ["TT", "Email", "WhatsApp", "Phone Call", "SMS"];
export const STATUS_OPTIONS = ["Pending", "Solved/Completed", "Transferred other Section", "Partially Completed& Transferred"];
export const REGIONS = [
  "EAAZ", "CAAZ", "SAAZ", "NAAZ", "SWAAZ", "WAAZ", "NR- Mekele", "NWR - Bahirdar", 
  "ER - Dire Dawa", "CER - Harar", "CNR - D. Birhan", "WR - Nekempt", "SER - Adama", 
  "SR - Hawassa", "SWR-Jimma"
];
export const SPECIFIC_REQUESTS = [
  "VRRP & Related Issues", "vISP (provisioning, Toubleshooting, BW Adjustment)", 
  "Service from IPRAN (provisioning or Toubleshooting)", "LAN IP Assignment for USSD/short code",
  "BGP Related (AS# Assignemnet, Configuration, Troubleshooting)", "VRF Related (RD Assignment, Configuration, Troubleshooting)",
  "3G/4G APN Related (Configuration& Troubleshooting)", "IP/VPN Routing & Related Issues",
  "Public IP & Related Issues", "Migration ", "Access NE & Behind (NE Down/Line down/Card Problem/Offline/Packet loss)",
  "LAN or Public or WAN IP Conflict", "Speed Problem (Download and/or Upload)",
  "Browsing Issue (IGW Problem/DNS)", "Configuration Loss (ethio telecom (NE) side)", "Modem (CPE) Issue"
];

export const KPI_LIMITS = { Support: 45, Provisioning: 30 };