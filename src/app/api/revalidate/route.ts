import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body?._type as string | undefined;

    // Revalida la landing y todas las páginas del CMS
    revalidatePath("/", "layout");

    // Si es una página del CMS, revalida su slug específico
    if (type === "page" && body?.slug?.current) {
      revalidatePath(`/es/${body.slug.current}`);
      revalidatePath(`/en/${body.slug.current}`);
    }

    // Tags para ISR granular
    revalidateTag("sanity");

    return NextResponse.json({ revalidated: true, type });
  } catch {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}
