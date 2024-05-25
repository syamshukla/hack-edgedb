// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';
import e from '@/dbschema/edgeql-js';

export async function POST(req: NextRequest) {
  const { text, schema_id, username } = await req.json();

  try {
    const user = await e.select(e.default.User, () => ({ filter_single: { username } })).run(client);
    const schema = await e.select(e.default.Schema, () => ({ filter_single: { id: schema_id } })).run(client);

    if (!user || !schema) {
      return NextResponse.json({ success: false, error: 'User or Schema not found' }, { status: 404 });
    }

    const roast = await e.insert(e.default.Roast, {
      text,
      schema: e.default.Schema.get(schema_id),
      reviewer: e.default.User.get(user.id),
    }).run(client);

    return NextResponse.json({ success: true, roast });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}