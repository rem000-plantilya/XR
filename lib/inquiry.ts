import { items, type ItemKey } from "./site";

export type InquiryInput = {
  full_name: string;
  mobile: string;
  email?: string;
  facebook_name?: string;
  event_date: string;
  return_date?: string;
  event_type?: string;
  event_address: string;
  delivery_needed: boolean;
  quantities: Record<ItemKey, number>;
  notes?: string;
  agreed_to_policy: boolean;
  website?: string; // honeypot
};

export const emptyQuantities = (): Record<ItemKey, number> => ({
  tables: 0,
  chairs: 0,
  kids_chairs: 0,
  videoke: 0,
  tents: 0,
});

export function estimateTotal(q: Record<ItemKey, number>): number {
  return items.reduce((sum, it) => sum + it.price * (q[it.key] || 0), 0);
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const qty = (v: unknown, max: number) => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
};

/** Validates raw JSON and returns either errors or a clean DB row. */
export function validateInquiry(raw: unknown):
  | { ok: true; row: Record<string, unknown> }
  | { ok: false; errors: string[] } {
  const b = (raw ?? {}) as Record<string, unknown>;
  const errors: string[] = [];

  const full_name = str(b.full_name, 120);
  const mobile = str(b.mobile, 20);
  const email = str(b.email, 160);
  const facebook_name = str(b.facebook_name, 120);
  const event_date = str(b.event_date, 10);
  const return_date = str(b.return_date, 10);
  const event_type = str(b.event_type, 60);
  const event_address = str(b.event_address, 300);
  const notes = str(b.notes, 1000);
  const rq = (b.quantities ?? {}) as Record<string, unknown>;
  const quantities: Record<ItemKey, number> = {
    tables: qty(rq.tables, 1000),
    chairs: qty(rq.chairs, 5000),
    kids_chairs: qty(rq.kids_chairs, 5000),
    videoke: qty(rq.videoke, 50),
    tents: qty(rq.tents, 200),
  };

  if (full_name.length < 2) errors.push("Please enter your full name.");
  if (!/^[+\d][\d\s-]{6,19}$/.test(mobile)) errors.push("Please enter a valid mobile number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email or leave it blank.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event_date)) errors.push("Please choose your event date.");
  if (return_date && (!/^\d{4}-\d{2}-\d{2}$/.test(return_date) || return_date < event_date))
    errors.push("Return date must be on or after the event date.");
  if (event_address.length < 5) errors.push("Please enter the event address.");
  if (Object.values(quantities).every((n) => n === 0)) errors.push("Please add at least one item.");
  if (b.agreed_to_policy !== true) errors.push("Please agree to the damage and usage policy.");

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    row: {
      full_name,
      mobile,
      email: email || null,
      facebook_name: facebook_name || null,
      event_date,
      return_date: return_date || null,
      event_type: event_type || null,
      event_address,
      delivery_needed: b.delivery_needed === true,
      tables_qty: quantities.tables,
      chairs_qty: quantities.chairs,
      kids_chairs_qty: quantities.kids_chairs,
      videoke_qty: quantities.videoke,
      tents_qty: quantities.tents,
      estimated_total: estimateTotal(quantities),
      notes: notes || null,
      agreed_to_policy: true,
    },
  };
}
