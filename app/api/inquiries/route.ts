import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/inquiry";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request."] }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if ((body as Record<string, unknown>)?.website) {
    return NextResponse.json({ ok: true });
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["Online inquiries are not configured yet. Please call or message us."] },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("inquiries").insert({
    ...result.row,
    user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
  });

  if (error) {
    console.error("Supabase insert failed:", error.message);
    return NextResponse.json(
      { ok: false, errors: ["We couldn't save your inquiry. Please try again or contact us directly."] },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
