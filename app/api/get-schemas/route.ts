import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';
import e from '@/dbschema/edgeql-js';

export async function GET() {
  try {
    const schemas = await e.select(e.default.Schema, {
      text: true,
      submitter: {
        username: true,
      },
    }).run(client);

    return NextResponse.json({ success: true, schemas });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}