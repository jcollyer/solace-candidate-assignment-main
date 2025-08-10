import db from "@/db";
import { advocates } from "@/db/schema";
import { count, ilike, or } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const term = url.searchParams.get("term") ?? "";
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(
    100,
    Math.max(1, Number(url.searchParams.get("pageSize") ?? "10"))
  );
  const offset = (page - 1) * pageSize;

  // Build the where clause conditionally
  const whereClause = term
    ? or(
        ilike(advocates.firstName, `%${term}%`),
        ilike(advocates.lastName, `%${term}%`),
        ilike(advocates.city, `%${term}%`),
        ilike(advocates.degree, `%${term}%`)
      )
    : undefined;

  // Get the total count (separate query)
  let totalRes;
  if (whereClause) {
    totalRes = await db
      .select({total: count()})
      .from(advocates)
      .where(whereClause);
  } else {
    totalRes = await db
      .select({total: count()})
      .from(advocates);
  }

  const total = Number(totalRes[0]?.total ?? 0);

  // Get the current page rows
  let rows;
  if (whereClause) {
    rows = await db
      .select()
      .from(advocates)
      .where(whereClause)
      .limit(pageSize)
      .offset(offset);
  } else {
    rows = await db
      .select()
      .from(advocates)
      .limit(pageSize)
      .offset(offset);
  }

  return Response.json({
    rows,
    total,
    page,
    pageSize,
  });
}
