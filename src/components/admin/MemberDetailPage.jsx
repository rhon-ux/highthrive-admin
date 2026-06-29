import { useState } from "react";
import { COMMUNITY_OPTIONS } from "./membersData";
import { communityType, roleColor } from "./utils";

const ROLE_LABELS = {
  Admin: "Administrator",
  CTO: "Chief Technology Officer",
  CSM: "Customer Service Rep",
  Funding: "Funding Specialist",
  Dev: "Developer",
  Reports: "Reports Analyst",
  Social: "Social Media Manager",
};

const MEMBERSHIP_QUESTIONS = [
  { q: "What is your primary funding goal?", a: "Scale existing business operations" },
  { q: "How did you hear about us?", a: "Community referral" },
  { q: "Preferred contact method?", a: "Email" },
];

function communityLabel(community) {
  return COMMUNITY_OPTIONS.find(c => communityType(c.community) === communityType(community))?.label
    ?? (community.subtitle ? `${community.title} ${community.subtitle}` : community.title);
}

function memberHandle(member) {
  const slug = member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `@${slug}-${String(member.id).padStart(4, "0")}`;
}

function formatJoinedLabel(joined) {
  const date = new Date(joined);
  const days = Math.max(0, Math.floor((Date.now() - date) / 86400000));
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${formatted} (${days} Day${days === 1 ? "" : "s"})`;
}

function levelNumber(level) {
  return level?.replace(/\D/g, "") || "1";
}

export default function MemberDetailPage({ member, onBack }) {
  const [activeCommunity, setActiveCommunity] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  if (!member) {
    return (
      <div>
        <button type="button" className="page-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Members
        </button>
        <p className="page-subtitle">Member not found.</p>
      </div>
    );
  }

  const dmReady = member.status === "Active";

  return (
    <div className="member-detail-page">
      <button type="button" className="page-back" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Members
      </button>

      <div className="member-detail">
        <div className="member-detail-header panel">
          <div className="member-detail-profile">
            <div className="member-avatar member-detail-avatar" style={{ "--role-color": roleColor(member.role) }}>
              {member.avatar}
            </div>
            <div>
              <h1 className="member-detail-name">{member.name}</h1>
              <a href="#" className="member-detail-handle" onClick={e => e.preventDefault()}>
                {memberHandle(member)}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="member-detail-role">{ROLE_LABELS[member.role] ?? member.role}</p>
            </div>
          </div>
          <div className="member-detail-actions">
            <span className={`member-detail-dm${dmReady ? " member-detail-dm--ready" : ""}`}>
              {dmReady ? "✓" : "○"} DM: {dmReady ? "Ready" : "Unavailable"}
            </span>
            <button type="button" className="member-detail-chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              CHAT
            </button>
          </div>
        </div>

        <div className="member-detail-tabs">
          {member.communities.map((c, i) => (
            <button
              key={i}
              type="button"
              className={`member-detail-tab member-detail-tab--${communityType(c)}${activeCommunity === i ? " member-detail-tab--active" : ""}`}
              onClick={() => setActiveCommunity(i)}
            >
              <span className="member-detail-tab-dot" />
              {communityLabel(c)}
            </button>
          ))}
        </div>

        <div className="member-detail-body panel">
          <div className="member-detail-body-header">
            <h2 className="member-detail-section-title">Community Membership</h2>
            <span className="status-badge" data-status={member.status}>{member.status}</span>
          </div>

          <div className="member-detail-stats">
            <div className="member-detail-stat">
              <span className="member-detail-stat-label">Level</span>
              <span className="member-detail-stat-value">{levelNumber(member.level)}</span>
            </div>
            <div className="member-detail-stat">
              <span className="member-detail-stat-label">Joined Date</span>
              <span className="member-detail-stat-value">{formatJoinedLabel(member.joined)}</span>
            </div>
            <div className="member-detail-stat">
              <span className="member-detail-stat-label">LTV</span>
              <span className="member-detail-stat-value member-detail-stat-value--ltv">{member.ltv}</span>
            </div>
          </div>

          <button
            type="button"
            className="member-detail-questions-toggle"
            onClick={() => setShowQuestions(v => !v)}
          >
            <span>Membership Questions</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showQuestions
                ? <polyline points="18 15 12 9 6 15" />
                : <polyline points="6 9 12 15 18 9" />}
            </svg>
          </button>

          {showQuestions && (
            <div className="member-detail-questions">
              {MEMBERSHIP_QUESTIONS.map((item, i) => (
                <div key={i} className="member-detail-question">
                  <p className="member-detail-question-q">{item.q}</p>
                  <p className="member-detail-question-a">{item.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
