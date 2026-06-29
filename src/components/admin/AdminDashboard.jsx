import { useState } from "react";
import "./AdminDashboard.css";
import {
  MOCK_MEMBERS,
  DEFAULT_MEMBER_FILTERS,
  DEFAULT_NEW_MEMBER,
  createMemberFromForm,
  getMemberStats,
  memberToForm,
  loadStoredMembers,
  storeMembers,
  isMemberFormValid,
} from "./membersData";
import { filterMembers } from "./utils";
import LoginPage from "./LoginPage";
import Sidebar from "./Sidebar";
import Notification from "./Notification";
import DashboardPage from "./DashboardPage";
import MembersPage from "./MembersPage";
import MemberDetailPage from "./MemberDetailPage";
import DmSequencesPage from "./DmSequencesPage";
import ZapierPage from "./ZapierPage";
import MemberModal from "./MemberModal";
import EventRemindersPage from "./EventRemindersPage";
import EventReminderConfigPage from "./EventReminderConfigPage";
import BulkDmsPage from "./BulkDmsPage";
import {
  MOCK_EVENT_REMINDER_COMMUNITIES,
  loadStoredEventReminders,
  storeEventReminders,
  getCommunityById,
} from "./eventRemindersData";

export default function AdminDashboard() {
  const [page, setPage] = useState("login");
  const [members, setMembers] = useState(() => loadStoredMembers() ?? MOCK_MEMBERS);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [search, setSearch] = useState("");
  const [memberFilters, setMemberFilters] = useState(DEFAULT_MEMBER_FILTERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [zapWebhook, setZapWebhook] = useState("");
  const [zapEvents, setZapEvents] = useState(["member.created"]);
  const [zapLog, setZapLog] = useState([]);
  const [zapSaved, setZapSaved] = useState(false);
  const [zapTesting, setZapTesting] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [newMember, setNewMember] = useState(DEFAULT_NEW_MEMBER);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [eventReminderCommunities, setEventReminderCommunities] = useState(
    () => loadStoredEventReminders() ?? MOCK_EVENT_REMINDER_COMMUNITIES,
  );
  const [selectedEventReminderId, setSelectedEventReminderId] = useState(null);
  const [notification, setNotification] = useState(null);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = () => {
    if (loginForm.email === "rhon@letsgetfunded.com" && loginForm.password === "admin123") {
      setPage("dashboard");
      setLoginError("");
    } else {
      setLoginError(
        import.meta.env.PROD
          ? "Invalid credentials."
          : "Invalid credentials. Try rhon@letsgetfunded.com / admin123",
      );
    }
  };

  const triggerZapier = async (eventId, payload) => {
    if (!zapWebhook || !zapEvents.includes(eventId)) return;
    const entry = { time: new Date().toLocaleTimeString(), event: eventId, payload, status: "pending" };
    setZapLog(prev => [...prev, entry]);
    try {
      await fetch(zapWebhook, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: eventId, timestamp: new Date().toISOString(), data: payload }),
      });
      setZapLog(prev => prev.map((e, i) => i === prev.length - 1 ? { ...e, status: "sent" } : e));
    } catch {
      setZapLog(prev => prev.map((e, i) => i === prev.length - 1 ? { ...e, status: "error" } : e));
    }
  };

  const persistMembers = (nextMembers) => {
    setMembers(nextMembers);
    storeMembers(nextMembers);
  };

  const handleAddMember = () => {
    if (!isMemberFormValid(newMember)) return;
    const m = createMemberFromForm(newMember);
    const nextMembers = [...members, m];
    persistMembers(nextMembers);
    triggerZapier("member.created", m);
    setShowAddModal(false);
    setNewMember(DEFAULT_NEW_MEMBER);
    notify("Member added successfully");
  };

  const handleDeleteMember = (id) => {
    const m = members.find(x => x.id === id);
    const nextMembers = members.filter(x => x.id !== id);
    persistMembers(nextMembers);
    triggerZapier("member.deleted", m);
    notify("Member removed", "error");
  };

  const handleSaveMemberChanges = () => {
    if (!isMemberFormValid(editMember)) return;

    const existing = members.find(m => m.id === editMember.id);
    if (!existing) {
      notify("Member not found", "error");
      return;
    }

    const updated = createMemberFromForm(editMember, existing);
    const nextMembers = members.map(m => (m.id === updated.id ? updated : m));
    persistMembers(nextMembers);
    triggerZapier("member.updated", updated);
    setEditMember(null);
    notify(`"${updated.name}" saved`);
  };

  const handleStatusChange = (id, newStatus) => {
    const m = members.find(x => x.id === id);
    const updated = { ...m, status: newStatus };
    const nextMembers = members.map(x => x.id === id ? updated : x);
    persistMembers(nextMembers);
    triggerZapier("member.status_changed", { ...updated, previousStatus: m.status });
    notify(`Status updated to ${newStatus}`);
  };

  const handleTestZap = async () => {
    if (!zapWebhook) return;
    setZapTesting(true);
    const payload = { event: "test", message: "Webhook test from HighThrive Admin", timestamp: new Date().toISOString() };
    const entry = { time: new Date().toLocaleTimeString(), event: "test.ping", payload, status: "pending" };
    setZapLog(prev => [...prev, entry]);
    try {
      await fetch(zapWebhook, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setZapLog(prev => prev.map((e, i) => i === prev.length - 1 ? { ...e, status: "sent" } : e));
      notify("Test webhook fired — check Zapier");
    } catch {
      setZapLog(prev => prev.map((e, i) => i === prev.length - 1 ? { ...e, status: "error" } : e));
      notify("Webhook failed", "error");
    }
    setZapTesting(false);
  };

  const filtered = filterMembers(members, search, memberFilters);
  const statValues = getMemberStats(members);

  if (page === "login") {
    return (
      <LoginPage
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        loginError={loginError}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="admin admin-layout">
      <Notification notification={notification} />

      <Sidebar
        page={page}
        onNavigate={id => {
          setPage(id);
          if (id !== "member-detail") setSelectedMemberId(null);
          if (id !== "event-reminder-config") setSelectedEventReminderId(null);
        }}
        onSignOut={() => { setPage("login"); setLoginForm({ email: "", password: "" }); }}
      />

      <main className="main-content">
        {page === "dashboard" && (
          <DashboardPage members={members} statValues={statValues} />
        )}
        {page === "members" && (
          <MembersPage
            members={members}
            filtered={filtered}
            active={statValues.active}
            search={search}
            onSearchChange={setSearch}
            filters={memberFilters}
            onFiltersChange={setMemberFilters}
            onAddClick={() => setShowAddModal(true)}
            onViewMember={m => { setSelectedMemberId(m.id); setPage("member-detail"); }}
            onEdit={m => setEditMember(memberToForm(m))}
            onDelete={handleDeleteMember}
            onStatusChange={handleStatusChange}
          />
        )}
        {page === "member-detail" && (
          <MemberDetailPage
            member={members.find(m => m.id === selectedMemberId)}
            onBack={() => { setSelectedMemberId(null); setPage("members"); }}
          />
        )}
        {page === "dm-sequences" && <DmSequencesPage onNotify={notify} />}
        {page === "bulk-dms" && <BulkDmsPage onNotify={notify} />}
        {page === "event-reminders" && (
          <EventRemindersPage
            communities={eventReminderCommunities}
            onToggleReminder={(id, enabled) => {
              const next = eventReminderCommunities.map(c =>
                c.id === id ? { ...c, reminderEnabled: enabled } : c,
              );
              setEventReminderCommunities(next);
              storeEventReminders(next);
              const name = getCommunityById(next, id)?.name ?? "Community";
              notify(`Reminders ${enabled ? "enabled" : "disabled"} for ${name}`);
            }}
            onConfigure={id => {
              setSelectedEventReminderId(id);
              setPage("event-reminder-config");
            }}
          />
        )}
        {page === "event-reminder-config" && (
          <EventReminderConfigPage
            community={getCommunityById(eventReminderCommunities, selectedEventReminderId)}
            onBack={() => {
              setSelectedEventReminderId(null);
              setPage("event-reminders");
            }}
            onToggleEnabled={(id, enabled) => {
              const next = eventReminderCommunities.map(c =>
                c.id === id ? { ...c, reminderEnabled: enabled } : c,
              );
              setEventReminderCommunities(next);
              storeEventReminders(next);
            }}
            onNotify={notify}
          />
        )}
        {page === "zapier" && (
          <ZapierPage
            zapWebhook={zapWebhook}
            onWebhookChange={value => { setZapWebhook(value); setZapSaved(false); }}
            zapEvents={zapEvents}
            onEventsChange={(id, checked) => {
              setZapEvents(prev => checked ? [...prev, id] : prev.filter(x => x !== id));
            }}
            zapLog={zapLog}
            onClearLog={() => setZapLog([])}
            zapSaved={zapSaved}
            onSaveWebhook={() => { if (zapWebhook) { setZapSaved(true); notify("Webhook saved"); } }}
            zapTesting={zapTesting}
            onTestWebhook={handleTestZap}
          />
        )}
      </main>

      {showAddModal && (
        <MemberModal
          title="Add new member"
          member={newMember}
          onChange={setNewMember}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddMember}
          submitLabel="Add member"
          placeholders={{ name: "Juan dela Cruz", email: "juan@letsgetfunded.com" }}
        />
      )}

      {editMember && (
        <MemberModal
          title="Edit member"
          member={editMember}
          onChange={setEditMember}
          onClose={() => setEditMember(null)}
          onSubmit={handleSaveMemberChanges}
          submitLabel="Save changes"
        />
      )}
    </div>
  );
}
