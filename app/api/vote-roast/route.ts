import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';
import e from '@/dbschema/edgeql-js';

export async function POST(req: NextRequest) {
  const { roast_id, username, vote_type } = await req.json();

  try {
    const user = await e.select(e.default.User, () => ({ filter_single: { username } })).run(client);
    const roast = await e.select(e.default.Roast, () => ({ filter_single: { id: roast_id } })).run(client);

    if (!user || !roast) {
      return NextResponse.json({ success: false, error: 'User or Roast not found' }, { status: 404 });
    }

    const vote = await e.insert(e.default.Vote, {
      roast: e.default.Roast.get(roast_id),
      voter: e.default.User.get(user.id),
      vote_type,
    }).run(client);

    const updatedRoast = await e.update(e.default.Roast, {
      filter_single: { id: roast_id },
      set: { votes: vote_type === 'upvote' ? roast.votes + 1 : roast.votes - 1 },
    }).run(client);

    return NextResponse.json({ success: true, vote, updatedRoast });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}