"use client";

import { useMemo, useState } from "react";
import { emptyQuantities, estimateTotal } from "@/lib/inquiry";
import { items, peso, site, type ItemKey } from "@/lib/site";

const eventTypes = ["Birthday", "Kiddie party", "Christening", "Wedding", "Fiesta", "Reunion", "Company event", "Wake", "Other"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; errors: string[] };

export default function InquiryForm() {
  const [quantities, setQuantities] = useState<Record<ItemKey, number>>(emptyQuantities);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const total = useMemo(() => estimateTotal(quantities), [quantities]);
  const today = new Date().toISOString().slice(0, 10);

  const setQty = (key: ItemKey, value: number) =>
    setQuantities((q) => ({ ...q, [key]: Math.max(0, Math.min(5000, Math.floor(value) || 0)) }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fd.get("full_name"),
          mobile: fd.get("mobile"),
          email: fd.get("email"),
          facebook_name: fd.get("facebook_name"),
          event_date: fd.get("event_date"),
          return_date: fd.get("return_date"),
          event_type: fd.get("event_type"),
          event_address: fd.get("event_address"),
          delivery_needed: fd.get("delivery_needed") === "on",
          notes: fd.get("notes"),
          agreed_to_policy: fd.get("agreed_to_policy") === "on",
          website: fd.get("website"),
          quantities,
        }),
      });
      const data = (await res.json()) as { ok: boolean; errors?: string[] };
      if (data.ok) {
        setStatus({ kind: "sent" });
        form.reset();
        setQuantities(emptyQuantities());
      } else {
        setStatus({ kind: "error", errors: data.errors ?? ["Something went wrong."] });
      }
    } catch {
      setStatus({ kind: "error", errors: ["Network error. Please try again or contact us directly."] });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="alert alert-success flex-col items-start gap-2 p-6 text-left sm:flex-row sm:items-center">
        <span className="text-2xl">✅</span>
        <div>
          <h3 className="text-lg font-bold">Inquiry received — salamat!</h3>
          <p>We&apos;ll text or call you soon to confirm availability and your final quote.</p>
        </div>
        <button className="btn btn-sm sm:ml-auto" onClick={() => setStatus({ kind: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-5" noValidate={false}>
      {/* Honeypot (hidden from people) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="space-y-6 lg:col-span-3">
        <fieldset className="fieldset rounded-box border border-base-300 bg-base-100 p-5">
          <legend className="fieldset-legend text-base">Your details</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="label">Full name *</span>
              <input name="full_name" required minLength={2} maxLength={120} className="input w-full" autoComplete="name" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="label">Mobile number *</span>
              <input name="mobile" required type="tel" inputMode="tel" pattern="[+0-9][0-9 \-]{6,19}" placeholder="09XX XXX XXXX" className="input w-full" autoComplete="tel" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="label">Email (optional)</span>
              <input name="email" type="email" maxLength={160} className="input w-full" autoComplete="email" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="label">Facebook name (optional)</span>
              <input name="facebook_name" maxLength={120} className="input w-full" />
            </label>
          </div>
        </fieldset>

        <fieldset className="fieldset rounded-box border border-base-300 bg-base-100 p-5">
          <legend className="fieldset-legend text-base">Event details</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="label">Event date *</span>
              <input name="event_date" type="date" required min={today} className="input w-full" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="label">Return date (optional)</span>
              <input name="return_date" type="date" min={today} className="input w-full" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="label">Event type</span>
              <select name="event_type" className="select w-full" defaultValue="">
                <option value="">Select…</option>
                {eventTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 self-end pb-2">
              <input name="delivery_needed" type="checkbox" className="checkbox checkbox-primary" />
              <span>I need delivery &amp; pick-up</span>
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="label">Event address *</span>
              <input name="event_address" required minLength={5} maxLength={300} placeholder="House no., street, barangay, city" className="input w-full" autoComplete="street-address" />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="label">Notes (optional)</span>
              <textarea name="notes" maxLength={1000} rows={3} className="textarea w-full" placeholder="Setup time, landmarks, special requests…" />
            </label>
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="card lg:sticky lg:top-24 border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <h3 className="card-title">What do you need?</h3>
            <ul className="divide-y divide-base-300">
              {items.map((it) => (
                <li key={it.key} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{it.name}</p>
                    <p className="text-sm opacity-70">
                      {peso(it.price)} / {it.unit}
                    </p>
                  </div>
                  <div className="join">
                    <button type="button" className="btn join-item btn-sm" aria-label={`Less ${it.name}`} onClick={() => setQty(it.key, quantities[it.key] - (it.price < 50 ? 10 : 1))}>
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      aria-label={`${it.name} quantity`}
                      value={quantities[it.key]}
                      onChange={(e) => setQty(it.key, Number(e.target.value))}
                      className="input join-item input-sm w-16 text-center"
                    />
                    <button type="button" className="btn join-item btn-sm" aria-label={`More ${it.name}`} onClick={() => setQty(it.key, quantities[it.key] + (it.price < 50 ? 10 : 1))}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline justify-between rounded-box bg-base-200 p-4">
              <span className="font-medium">Estimated total</span>
              <span className="text-2xl font-extrabold text-primary">{peso(total)}</span>
            </div>
            <p className="text-xs opacity-70">Estimate only, {site.rentalPeriod}. Delivery fee (if any) and availability are confirmed by our team.</p>

            <label className="flex items-start gap-3 text-sm">
              <input name="agreed_to_policy" type="checkbox" required className="checkbox checkbox-primary checkbox-sm mt-0.5" />
              <span>
                I have read and agree to the{" "}
                <a href="#policy" className="link link-primary">
                  damage &amp; proper usage policy
                </a>
                .
              </span>
            </label>

            {status.kind === "error" && (
              <div role="alert" className="alert alert-error text-sm">
                <ul className="list-inside list-disc">
                  {status.errors.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={status.kind === "sending" || total === 0}>
              {status.kind === "sending" ? <span className="loading loading-spinner" /> : "Send inquiry"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
