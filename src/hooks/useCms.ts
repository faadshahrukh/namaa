import { useState, useCallback } from "react";
import {
  CmsBroker, CmsNewsArticle, CmsScamAlert, CmsCalendarEvent,
  defaultBrokers, defaultNews, defaultScamAlerts, defaultCalendarEvents,
} from "@/data/cms-defaults";

const KEY = {
  brokers: "nm-cms-brokers",
  news: "nm-cms-news",
  scamAlerts: "nm-cms-scam-alerts",
  calendarEvents: "nm-cms-calendar",
} as const;

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ─── Brokers ──────────────────────────────────────────────────────────────────

export function useBrokers() {
  const [brokers, setBrokers] = useState<CmsBroker[]>(() => load(KEY.brokers, defaultBrokers));

  const upsert = useCallback((item: CmsBroker) => {
    setBrokers((prev) => {
      const next = prev.some((b) => b.id === item.id)
        ? prev.map((b) => (b.id === item.id ? item : b))
        : [...prev, { ...item, id: genId() }];
      save(KEY.brokers, next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setBrokers((prev) => {
      const next = prev.filter((b) => b.id !== id);
      save(KEY.brokers, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY.brokers);
    setBrokers(defaultBrokers);
  }, []);

  return { brokers, upsert, remove, reset };
}

// ─── News ─────────────────────────────────────────────────────────────────────

export function useNews() {
  const [news, setNews] = useState<CmsNewsArticle[]>(() => load(KEY.news, defaultNews));

  const upsert = useCallback((item: CmsNewsArticle) => {
    setNews((prev) => {
      const next = prev.some((n) => n.id === item.id)
        ? prev.map((n) => (n.id === item.id ? item : n))
        : [{ ...item, id: genId() }, ...prev];
      save(KEY.news, next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setNews((prev) => {
      const next = prev.filter((n) => n.id !== id);
      save(KEY.news, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY.news);
    setNews(defaultNews);
  }, []);

  return { news, upsert, remove, reset };
}

// ─── Scam Alerts ──────────────────────────────────────────────────────────────

export function useScamAlerts() {
  const [alerts, setAlerts] = useState<CmsScamAlert[]>(() => load(KEY.scamAlerts, defaultScamAlerts));

  const upsert = useCallback((item: CmsScamAlert) => {
    setAlerts((prev) => {
      const next = prev.some((a) => a.id === item.id)
        ? prev.map((a) => (a.id === item.id ? item : a))
        : [{ ...item, id: genId() }, ...prev];
      save(KEY.scamAlerts, next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setAlerts((prev) => {
      const next = prev.filter((a) => a.id !== id);
      save(KEY.scamAlerts, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY.scamAlerts);
    setAlerts(defaultScamAlerts);
  }, []);

  return { alerts, upsert, remove, reset };
}

// ─── Calendar Events ──────────────────────────────────────────────────────────

export function useCalendarEvents() {
  const [events, setEvents] = useState<CmsCalendarEvent[]>(() => load(KEY.calendarEvents, defaultCalendarEvents));

  const upsert = useCallback((item: CmsCalendarEvent) => {
    setEvents((prev) => {
      const next = prev.some((e) => e.id === item.id)
        ? prev.map((e) => (e.id === item.id ? item : e))
        : [{ ...item, id: genId() }, ...prev];
      save(KEY.calendarEvents, next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== id);
      save(KEY.calendarEvents, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY.calendarEvents);
    setEvents(defaultCalendarEvents);
  }, []);

  return { events, upsert, remove, reset };
}

// ─── Read-only helpers (for use in public pages) ───────────────────────────────

export function getCmsBrokers(): CmsBroker[] {
  return load(KEY.brokers, defaultBrokers);
}

export function getCmsNews(): CmsNewsArticle[] {
  return load(KEY.news, defaultNews);
}

export function getCmsScamAlerts(): CmsScamAlert[] {
  return load(KEY.scamAlerts, defaultScamAlerts);
}

export function getCmsCalendarEvents(): CmsCalendarEvent[] {
  return load(KEY.calendarEvents, defaultCalendarEvents);
}
