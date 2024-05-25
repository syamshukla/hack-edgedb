import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';
import e from '@/dbschema/edgeql-js';

export async function POST(req: NextRequest) {
  const { text, username } = await req.json();

  try {
    const user = username ? await e.insert(e.default.User, { username }).run(client) : null;
    const schema = await e.insert(e.default.Schema, {
      text,
      submitter: user ? e.select(e.default.User, () => ({ filter_single: { username } })) : null,
    }).run(client);

    return NextResponse.json({ success: true, schema });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}