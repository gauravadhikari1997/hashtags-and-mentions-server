import { dbConnect } from "@/lib/mongoose";
import Tag from "@/models/Tag";

export async function GET() {
  await dbConnect();
  const tags = await Tag.find({});
  if (!tags) {
    return Response.json({ error: true }, { status: 204 });
  }
  return Response.json({ error: false, tags }, { status: 200 });
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
    const tag = await Tag.create(body);
    return Response.json({ error: false, tag }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: true, errorMessage: "Invalid details" },
      { status: 400 }
    );
  }
}
