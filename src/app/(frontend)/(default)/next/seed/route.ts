// Disabled in static builds (demo/preview).
// If you need seeding locally, keep a separate route file only for dev.

import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    { ok: false, error: 'Seeding route is disabled in this build.' },
    { status: 404 },
  )
}

export async function POST() {
  return NextResponse.json(
    { ok: false, error: 'Seeding route is disabled in this build.' },
    { status: 404 },
  )
}
