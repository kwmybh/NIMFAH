"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastKind = "success" | "error" | "info";

type Toast = {
  id: number;
  kind: ToastKind;
  title: string;
  msg: string;
};

// Left-border tint + status code shown per toast kind (mirrors the canonical design).
const TINTS: Record<ToastKind, string> = {
  success: "#39B54A",
  error: "#E5484D",
  info: "#8a8a92",
};
const CODES: Record<ToastKind, string> = {
  success: "200",
  error: "422",
  info: "···",
};

const AUTO_DISMISS_MS = 4800;

type ToastContextValue = {
  toast: (kind: ToastKind, title: string, msg: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((kind: ToastKind, title: string, msg: string) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, kind, title, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, AUTO_DISMISS_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Fixed bottom-right, stacked, polite live region. */}
      <div id="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast"
            role="status"
            style={{ "--tint": TINTS[t.kind] } as React.CSSProperties}
          >
            <span className="code">{CODES[t.kind]}</span>
            <div>
              <div className="t">{t.title}</div>
              <div className="m">{t.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
