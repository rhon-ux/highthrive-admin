import { STAT_CARDS } from "./constants";
import { TIER_OPTIONS, COMMUNITY_OPTIONS } from "./membersData";
import { roleColor, countByCommunity, communityColor } from "./utils";
import CommunityBadge from "./CommunityBadge";

function tierClass(tier) {
  return `tier-badge tier-badge--${tier.toLowerCase()}`;
}

export default function DashboardPage({ members, statValues }) {
  const communityCounts = countByCommunity(members);
  const communityTotal = Object.values(communityCounts).reduce((s, n) => s + n, 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your Remote Talent network</p>
      </div>

      <div className="stats-grid">
        {STAT_CARDS.map(card => (
          <div
            key={card.label}
            className="stat-card"
            style={{ "--card-color": card.color, "--card-bg": card.bg }}
          >
            <p className="stat-card-label">{card.label}</p>
            <p className="stat-card-value">{statValues[card.key]}</p>
          </div>
        ))}
      </div>

      <div className="panel panel--mb">
        <h3 className="panel-title">Members by tier</h3>
        <div className="role-list">
          {TIER_OPTIONS.map(tier => {
            const count = members.filter(m => m.tier === tier).length;
            if (!count) return null;
            return (
              <div key={tier} className="role-row">
                <span className="role-name">{tier}</span>
                <div className="role-bar">
                  <div
                    className="role-bar-fill"
                    style={{ "--bar-width": `${(count / members.length) * 100}%`, "--bar-color": "#1d9e75" }}
                  />
                </div>
                <span className="role-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel panel--mb">
        <h3 className="panel-title">Communities</h3>
        <div className="role-list">
          {Object.entries(communityCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => {
              const option = COMMUNITY_OPTIONS.find(c => c.value === type);
              return (
                <div key={type} className="role-row">
                  <span className="role-name role-name--community">
                    <CommunityBadge community={option?.community ?? { title: type }} />
                  </span>
                  <div className="role-bar">
                    <div
                      className="role-bar-fill"
                      style={{ "--bar-width": `${(count / communityTotal) * 100}%`, "--bar-color": communityColor(type) }}
                    />
                  </div>
                  <span className="role-count">{count}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">Recent additions</h3>
        <div className="member-list">
          {[...members].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 4).map(m => (
            <div key={m.id} className="member-row">
              <div className="member-avatar" style={{ "--role-color": roleColor(m.role) }}>{m.avatar}</div>
              <div className="member-info">
                <p className="member-name">{m.name}</p>
                <p className="member-meta">
                  <span className={tierClass(m.tier)}>{m.tier}</span>
                  {" · "}{m.currentMembership} · Joined {m.joined}
                </p>
              </div>
              <div className="community-badges">
                {m.communities.slice(0, 1).map((c, i) => (
                  <CommunityBadge key={i} community={c} />
                ))}
              </div>
              <span className="status-badge" data-status={m.status}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
