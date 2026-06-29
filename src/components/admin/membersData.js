/** Member table columns (Members page) */
export const MEMBER_COLUMNS = [
  "Member",
  "Communities",
  "Tier",
  "Status",
  "Current Membership",
  "LTV",
  "Joined",
  "Last Active",
  "Actions",
];

/** Community presets shown as badges in the Communities column */
export const COMMUNITY_PRESETS = {
  starter: { title: "LetsGetFunded", subtitle: "Starter (Free)" },
  pro: { title: "LetsGetFunded PRO" },
  innerCircle: { title: "LetsGetFunded", subtitle: "Inner Circle" },
};

export const COMMUNITY_OPTIONS = [
  { value: "starter", label: "LetsGetFunded Starter (Free)", community: COMMUNITY_PRESETS.starter },
  { value: "pro", label: "LetsGetFunded PRO", community: COMMUNITY_PRESETS.pro },
  { value: "inner-circle", label: "LetsGetFunded Inner Circle", community: COMMUNITY_PRESETS.innerCircle },
];

/** Filter defaults & options (Members page filters) */
export const DEFAULT_MEMBER_FILTERS = {
  community: "",
  tier: "",
  status: "",
  sort: "newest",
  level: "",
  joinedFrom: "",
  joinedTo: "",
  activeInPast: "",
};

export const COMMUNITY_FILTER_OPTIONS = [
  { value: "", label: "All communities" },
  ...COMMUNITY_OPTIONS.map(({ value, label }) => ({ value, label })),
];

export const TIER_OPTIONS = ["Platinum", "Gold", "Silver", "Bronze"];
export const STATUS_OPTIONS = ["Active", "Review", "Inactive"];
export const STATUS_QUICK_FILTERS = ["All", "Active", "Review", "Inactive"];
export const LEVEL_OPTIONS = ["Level 1", "Level 2", "Level 3", "Level 4"];
export const ROLE_OPTIONS = ["Admin", "CTO", "CSM", "Funding", "Dev", "Reports", "Social"];
export const MEMBERSHIP_OPTIONS = ["Annual Pro", "Monthly Pro", "Monthly Basic", "Expired"];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest Joined" },
  { value: "oldest", label: "Oldest Joined" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "ltv-desc", label: "Highest LTV" },
];

export const ACTIVE_PAST_OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
];

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
export const DEFAULT_PAGE_SIZE = 5;

/** Empty form state for add-member modal */
export const DEFAULT_NEW_MEMBER = {
  name: "",
  email: "",
  role: "CSM",
  status: "Active",
  tier: "Bronze",
  level: "Level 1",
  communityKey: "starter",
  currentMembership: "Monthly Basic",
};

/** Full member records — single source of truth */
export const MOCK_MEMBERS = [
  { id: 1, name: "Rhon Rico", email: "rhon@letsgetfunded.com", role: "Admin", status: "Active", level: "Level 4", communities: [COMMUNITY_PRESETS.innerCircle], tier: "Platinum", currentMembership: "Annual Pro", ltv: "$4,820", joined: "2025-12-05", lastActive: "2026-06-25", avatar: "RR" },
  { id: 2, name: "Martha Cruz", email: "martha@letsgetfunded.com", role: "CTO", status: "Active", level: "Level 3", communities: [COMMUNITY_PRESETS.pro, COMMUNITY_PRESETS.innerCircle], tier: "Gold", currentMembership: "Annual Pro", ltv: "$3,150", joined: "2025-12-10", lastActive: "2026-06-24", avatar: "MC" },
  { id: 3, name: "Jean Dela Cruz", email: "jean@letsgetfunded.com", role: "CSM", status: "Review", level: "Level 2", communities: [COMMUNITY_PRESETS.starter], tier: "Silver", currentMembership: "Monthly Basic", ltv: "$890", joined: "2026-01-15", lastActive: "2026-06-20", avatar: "JD" },
  { id: 4, name: "Kyle Knapp", email: "kyle@letsgetfunded.com", role: "Funding", status: "Active", level: "Level 3", communities: [COMMUNITY_PRESETS.pro], tier: "Gold", currentMembership: "Annual Pro", ltv: "$2,400", joined: "2026-01-20", lastActive: "2026-06-26", avatar: "KK" },
  { id: 5, name: "Alicia Reyes", email: "alicia@letsgetfunded.com", role: "CSM", status: "Active", level: "Level 2", communities: [COMMUNITY_PRESETS.innerCircle], tier: "Silver", currentMembership: "Monthly Pro", ltv: "$1,680", joined: "2026-02-01", lastActive: "2026-06-23", avatar: "AR" },
  { id: 6, name: "Arthur Santos", email: "arthur@letsgetfunded.com", role: "Reports", status: "Active", level: "Level 1", communities: [COMMUNITY_PRESETS.starter], tier: "Bronze", currentMembership: "Monthly Basic", ltv: "$540", joined: "2026-02-14", lastActive: "2026-06-22", avatar: "AS" },
  { id: 7, name: "Gimson Recilla", email: "gimson@letsgetfunded.com", role: "Dev", status: "Active", level: "Level 3", communities: [COMMUNITY_PRESETS.pro], tier: "Gold", currentMembership: "Annual Pro", ltv: "$2,950", joined: "2026-03-01", lastActive: "2026-06-25", avatar: "GR" },
  { id: 8, name: "Zofia Malik", email: "zofia@letsgetfunded.com", role: "Social", status: "Inactive", level: "Level 1", communities: [COMMUNITY_PRESETS.starter], tier: "Bronze", currentMembership: "Expired", ltv: "$320", joined: "2026-03-10", lastActive: "2026-05-18", avatar: "ZM" },
  { id: 9, name: "Jane Doe", email: "janedoe@getfunded.com", role: "Social", status: "Inactive", level: "Level 1", communities: [COMMUNITY_PRESETS.starter], tier: "Bronze", currentMembership: "Expired", ltv: "$320", joined: "2026-03-10", lastActive: "2026-05-18", avatar: "JD" },
];

export const MEMBER_PAYLOAD_PREVIEW = `{
  "event": "member.created",
  "timestamp": "2026-06-26T10:00:00.000Z",
  "data": {
    "id": 9,
    "name": "New Member",
    "email": "new@letsgetfunded.com",
    "role": "CSM",
    "status": "Active",
    "level": "Level 1",
    "communities": [
      { "title": "LetsGetFunded", "subtitle": "Starter (Free)" }
    ],
    "tier": "Bronze",
    "currentMembership": "Monthly Basic",
    "ltv": "$0",
    "joined": "2026-06-26",
    "lastActive": "2026-06-26",
    "avatar": "NM"
  }
}`;

export function makeAvatar(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export function communityFromKey(key) {
  return COMMUNITY_OPTIONS.find(c => c.value === key)?.community ?? COMMUNITY_PRESETS.starter;
}

export function memberToForm(member) {
  const communityKey = COMMUNITY_OPTIONS.find(c =>
    member.communities.some(mc =>
      mc.title === c.community.title && mc.subtitle === c.community.subtitle
    )
  )?.value ?? "starter";

  return {
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
    status: member.status,
    tier: member.tier,
    level: member.level,
    communityKey,
    currentMembership: member.currentMembership,
  };
}

export function createMemberFromForm(form, existing) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    ...existing,
    name: form.name,
    email: form.email,
    role: form.role,
    status: form.status,
    tier: form.tier,
    level: form.level,
    currentMembership: form.currentMembership,
    communities: [communityFromKey(form.communityKey)],
    id: existing?.id ?? Date.now(),
    joined: existing?.joined ?? today,
    lastActive: existing?.lastActive ?? today,
    ltv: existing?.ltv ?? "$0",
    avatar: makeAvatar(form.name),
  };
}

export function getMemberStats(members) {
  return {
    total: members.length,
    active: members.filter(m => m.status === "Active").length,
    review: members.filter(m => m.status === "Review").length,
    inactive: members.filter(m => m.status === "Inactive").length,
  };
}

export const MEMBERS_STORAGE_KEY = "highthrive-members";

export function loadStoredMembers() {
  try {
    const raw = localStorage.getItem(MEMBERS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeMembers(members) {
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
}

export function isMemberFormValid(form) {
  return Boolean(form?.name?.trim() && form?.email?.trim());
}
