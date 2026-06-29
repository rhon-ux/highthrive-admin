import { useEffect, useRef } from "react";
import { ZAPIER_EVENTS, PAYLOAD_PREVIEW } from "./constants";

export default function ZapierPage({
  zapWebhook,
  onWebhookChange,
  zapEvents,
  onEventsChange,
  zapLog,
  onClearLog,
  zapSaved,
  onSaveWebhook,
  zapTesting,
  onTestWebhook,
}) {
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [zapLog]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Zapier Integration</h1>
        <p className="page-subtitle">Connect HighThrive to 5,000+ apps via Zapier webhooks</p>
      </div>

      <div className="zapier-grid">
        <div className="panel">
          <h3 className="panel-title panel-title--sm">Webhook URL</h3>
          <p className="panel-desc">Get this from your Zapier trigger step (Catch Hook)</p>
          <input
            type="url"
            className="form-input form-input--sm"
            value={zapWebhook}
            onChange={e => onWebhookChange(e.target.value)}
            placeholder="https://hooks.zapier.com/hooks/catch/..."
          />
          <div className="zapier-actions">
            <button type="button" className="btn btn-primary btn-primary--xs" onClick={onSaveWebhook}>
              {zapSaved ? "✓ Saved" : "Save webhook"}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-secondary--xs"
              onClick={onTestWebhook}
              disabled={!zapWebhook || zapTesting}
            >
              {zapTesting ? "Sending..." : "Test webhook"}
            </button>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title panel-title--sm">Events to trigger</h3>
          <div className="event-list">
            {ZAPIER_EVENTS.map(ev => (
              <label key={ev.id} className="event-item">
                <input
                  type="checkbox"
                  checked={zapEvents.includes(ev.id)}
                  onChange={e => onEventsChange(ev.id, e.target.checked)}
                />
                <div>
                  <p className="event-label">{ev.label}</p>
                  <p className="event-desc">{ev.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="panel panel--mb-sm">
        <h3 className="panel-title panel-title--sm">Payload structure</h3>
        <pre className="code-block">{PAYLOAD_PREVIEW}</pre>
      </div>

      <div className="panel">
        <div className="log-header">
          <h3 className="panel-title panel-title--inline">Webhook log</h3>
          <button type="button" className="btn-text" onClick={onClearLog}>Clear</button>
        </div>
        <div className="log-container">
          {zapLog.length === 0 && (
            <p className="log-empty">No webhook events yet. Try adding or updating a member.</p>
          )}
          {zapLog.map((entry, i) => (
            <div key={i} className="log-entry">
              <span className="log-time">{entry.time}</span>
              <span className={`log-status log-status--${entry.status === "sent" ? "sent" : entry.status === "error" ? "error" : "pending"}`}>
                {entry.status === "sent" ? "SENT" : entry.status === "error" ? "ERR" : "..."}
              </span>
              <span className="log-event">{entry.event}</span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

      <div className="guide-panel">
        <h3 className="guide-title">How to connect Zapier</h3>
        <ol className="guide-list">
          <li>In Zapier, create a new Zap and choose <strong>Webhooks by Zapier</strong> as the trigger</li>
          <li>Select <strong>Catch Hook</strong> as the trigger event</li>
          <li>Copy the generated webhook URL and paste it above</li>
          <li>Click <strong>Save webhook</strong> then <strong>Test webhook</strong></li>
          <li>Select the events you want to fire, then add your action app in Zapier</li>
        </ol>
      </div>
    </div>
  );
}
