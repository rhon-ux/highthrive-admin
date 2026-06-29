import { useState, useEffect, useMemo } from "react";
import { MEMBER_COLUMNS, STATUS_OPTIONS, DEFAULT_PAGE_SIZE } from "./membersData";
import { roleColor } from "./utils";
import CommunityBadge from "./CommunityBadge";
import MemberFilters from "./MemberFilters";
import Pagination from "./Pagination";

function tierClass(tier) {
  return `tier-badge tier-badge--${tier.toLowerCase()}`;
}

export default function MembersPage({
  members,
  filtered,
  active,
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  onAddClick,
  onViewMember,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filtered.length, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  return (
    <div>
      <div className="page-header page-header--row">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle"> Browse and manage all community members - {members.length} total</p>
          <p className="page-subtitle">{members.length} total · {active} active</p>
        </div>
        <button type="button" className="btn btn-primary btn-primary--inline" onClick={onAddClick}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add member
        </button>
      </div>

      <MemberFilters
        search={search}
        onSearchChange={onSearchChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <div className="panel table-wrapper table-wrapper--scroll">
        <table className="members-table">
          <thead>
            <tr>
              {MEMBER_COLUMNS.map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(m => (
              <tr key={m.id}>
                <td>
                  <div className="member-cell">
                    <div className="member-avatar member-avatar--sm" style={{ "--role-color": roleColor(m.role) }}>{m.avatar}</div>
                    <div className="member-info member-info--table">
                      <button type="button" className="member-name member-name--link member-name--truncate" onClick={() => onViewMember(m)}>
                        {m.name}
                      </button>
                      <p className="member-meta member-meta--truncate">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="community-badges">
                    {m.communities.map((c, i) => (
                      <CommunityBadge key={i} community={c} />
                    ))}
                  </div>
                </td>
                <td>
                  <span className={tierClass(m.tier)}>{m.tier}</span>
                </td>
                <td>
                  <select
                    className="status-select"
                    data-status={m.status}
                    value={m.status}
                    onChange={e => onStatusChange(m.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="table-text">{m.currentMembership}</td>
                <td className="table-text table-text--ltv">{m.ltv}</td>
                <td className="date">{m.joined}</td>
                <td className="date">{m.lastActive}</td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="btn-icon btn-icon--edit" onClick={() => onEdit(m)}>Edit</button>
                    <button type="button" className="btn-icon btn-icon--delete" onClick={() => onDelete(m.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={MEMBER_COLUMNS.length} className="table-empty">No members found</td></tr>
            )}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <Pagination
            page={safePage}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={size => { setPageSize(size); setPage(1); }}
          />
        )}
      </div>
    </div>
  );
}
