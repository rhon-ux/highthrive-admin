export const ZAPIER_EVENTS = [
  { id: "member.created", label: "Member created", desc: "Fires when a new member is added" },
  { id: "member.updated", label: "Member updated", desc: "Fires when a member's profile changes" },
  { id: "member.deleted", label: "Member deleted", desc: "Fires when a member is removed" },
  { id: "member.status_changed", label: "Status changed", desc: "Fires when active/inactive/review status changes" },
];

export const ROLE_COLORS = {
  Admin: "#7c3aed", CTO: "#1d4ed8", CSM: "#0f766e", Funding: "#b45309",
  Dev: "#1e40af", Reports: "#6d28d9", Social: "#be185d",
};

export const STAT_CARDS = [
  { label: "Total members", key: "total", color: "#1d9e75", bg: "#0d2e22" },
  { label: "Active", key: "active", color: "#22c55e", bg: "#0d2218" },
  { label: "Under review", key: "review", color: "#f59e0b", bg: "#2a1f0d" },
  { label: "Inactive", key: "inactive", color: "#94a3b8", bg: "#1a2332" },
];

export { MEMBER_PAYLOAD_PREVIEW as PAYLOAD_PREVIEW } from "./membersData";
