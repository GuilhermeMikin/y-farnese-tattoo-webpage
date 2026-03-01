import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { PRISMIC_CACHE_TAG } from "@/shared/prismic/client";

function extractBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ", 2);
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  const normalizedToken = token.trim();
  return normalizedToken.length > 0 ? normalizedToken : null;
}

export async function POST(request: Request) {
  const expectedSecret = process.env.PRISMIC_WEBHOOK_SECRET?.trim();

  if (!expectedSecret) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        type?: unknown;
        documents?: unknown;
        secret?: unknown;
      }
    | null;

  const headerSecret = extractBearerToken(request.headers.get("authorization"));
  const bodySecret =
    typeof payload?.secret === "string" ? payload.secret.trim() : null;
  const providedSecret = headerSecret ?? bodySecret;

  if (!providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag(PRISMIC_CACHE_TAG);

  console.info("[prismic] Revalidated cache tag.", {
    tag: PRISMIC_CACHE_TAG,
    type: typeof payload?.type === "string" ? payload.type : null,
    documentCount: Array.isArray(payload?.documents) ? payload.documents.length : null,
  });

  return NextResponse.json({ ok: true, revalidated: true });
}
