import { dbConnect } from "@/lib/mongoose";
import Post from "@/models/Post";

export async function GET() {
  await dbConnect();
  const posts = await Post.find({});
  if (!posts) {
    return Response.json({ error: true }, { status: 204 });
  }
  return Response.json({ error: false, posts }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  if (!body) {
    return Response.json(
      { error: true, errorMessage: "You must provide details" },
      { status: 400 }
    );
  }
  try {
    const post = await Post.create(body);
    return Response.json({ error: false, post }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: true, errorMessage: "Invalid details" },
      { status: 400 }
    );
  }
}
