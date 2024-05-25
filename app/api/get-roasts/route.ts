//@ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';
import e from '@/dbschema/edgeql-js';

export async function GET() {
  try {
    const roasts = await e.select(e.default.Roast, {
      text: true,
      votes: true,
      reviewer: {
        username: true,
      },
      schema: {
        text: true,
      },
    }).order_by([e.desc(e.default.Roast.votes)]).limit(10).run(client);

    return NextResponse.json({ success: true, roasts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}