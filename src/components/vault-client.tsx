"use client";

import { useState, useSyncExternalStore } from "react";
import { DOCS } from "@/lib/data";
import { useToast } from "./toast-provider";

const SESSION_KEY = "nimfah-vault";
const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

type AuthTab = "signin" | "request";

// Tiny external store around the ephemeral session flag (sessionStorage). Reading through
// useSyncExternalStore keeps SSR/hydration in agreement (server snapshot = false) without a
// setState-in-effect, and any mutation re-renders every subscriber.
const sessionListeners = new Set<() => void>();
function readSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
function writeSession(next: boolean) {
  try {
    sessionStorage.setItem(SESSION_KEY, next ? "1" : "");
  } catch {
    // sessionStorage unavailable — session still applies in-memory for this render pass.
  }
  sessionListeners.forEach((l) => l());
}
function subscribeSession(cb: () => void) {
  sessionListeners.add(cb);
  return () => {
    sessionListeners.delete(cb);
  };
}

// Client Vault — an invite-only portal. The auth here is an intentional client-side mock:
// swap in real auth (NextAuth / Supabase / etc.) for production. Session persists in
// sessionStorage so a refresh keeps you in until you "Seal" it.
export function VaultClient() {
  const { toast } = useToast();
  const [tab, setTab] = useState<AuthTab>("signin");
  const authed = useSyncExternalStore(subscribeSession, readSession, () => false);

  const [siEmail, setSiEmail] = useState("");
  const [siPass, setSiPass] = useState("");
  const [rqName, setRqName] = useState("");
  const [rqEmail, setRqEmail] = useState("");
  const [rqNote, setRqNote] = useState("");

  function onSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailOk(siEmail)) {
      toast("error", "Authentication rejected", "Malformed identity string — check credential format.");
      return;
    }
    if (siPass.length < 6) {
      toast("error", "Authentication rejected", "Passphrase below minimum entropy — 6+ characters required.");
      return;
    }
    toast("success", "Session established", "Ephemeral key exchanged · AES-256-GCM · vault unsealed.");
    writeSession(true);
  }

  function onRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rqName.trim() || !emailOk(rqEmail) || !rqNote.trim()) {
      toast("error", "Request incomplete", "All fields required — name, verified email, and a brief.");
      return;
    }
    toast("success", "Request transmitted", "Encrypted · a curator will respond within 48 hours.");
    setRqName("");
    setRqEmail("");
    setRqNote("");
  }

  function seal() {
    writeSession(false);
    toast("info", "Session sealed", "Ephemeral key destroyed · vault re-locked.");
  }

  function decrypt() {
    toast("success", "Decrypting", "Fetching document · streaming over ephemeral channel.");
  }

  return (
    <div className="vault-wrap">
      <div className="vault">
        <div className="vault-title">
          <div className="t">Client Vault</div>
          <div className="s">Private creative direction · invite only</div>
        </div>
        <p className="vault-context">
          A private room for commissioned direction — pitches, edits, and prints
          shared one client at a time.
        </p>

        {authed ? (
          <div className="vault-card">
            <div className="doc-head">
              <span className="st">
                <span className="dot" />
                Session ephemeral
              </span>
              <button type="button" onClick={seal}>
                Seal ✕
              </button>
            </div>
            <div>
              {DOCS.map((d) => (
                <button
                  key={d.n}
                  type="button"
                  className="doc"
                  onClick={decrypt}
                >
                  <span className="type">{d.t}</span>
                  <div className="body">
                    <div className="name">{d.n}</div>
                    <div className="m">{d.m}</div>
                  </div>
                  <span aria-hidden="true">↓</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="vault-card">
            <div className="vtabs" role="tablist" aria-label="Vault access">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "signin"}
                onClick={() => setTab("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "request"}
                onClick={() => setTab("request")}
              >
                Request Access
              </button>
            </div>

            {tab === "signin" ? (
              <form onSubmit={onSignin} noValidate>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={siEmail}
                    onChange={(e) => setSiEmail(e.target.value)}
                    placeholder="name@studio.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  <span>Passphrase</span>
                  <input
                    type="password"
                    value={siPass}
                    onChange={(e) => setSiPass(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    minLength={6}
                  />
                </label>
                <button type="submit" className="primary">
                  Establish Session →
                </button>
              </form>
            ) : (
              <form onSubmit={onRequest} noValidate>
                <label>
                  <span>Full name</span>
                  <input
                    type="text"
                    value={rqName}
                    onChange={(e) => setRqName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  <span>Work email</span>
                  <input
                    type="email"
                    value={rqEmail}
                    onChange={(e) => setRqEmail(e.target.value)}
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  <span>Brief</span>
                  <textarea
                    rows={3}
                    value={rqNote}
                    onChange={(e) => setRqNote(e.target.value)}
                    placeholder="One line on the engagement"
                    required
                  />
                </label>
                <button type="submit" className="secondary">
                  Transmit Request →
                </button>
              </form>
            )}

            <div className="fine">
              <span className="dot" />
              TLS 1.3 · AES-256-GCM · EPHEMERAL SESSION
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
