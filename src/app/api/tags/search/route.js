import { dbConnect } from "@/lib/mongoose";
import Tag from "@/models/Tag";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) {
    return Response.json(
      { error: true, errorMessage: "Missing 'name' query parameter" },
      { status: 400 }
    );
  }
  try {
    const tags = await Tag.find({ name: new RegExp(name, "i") });
    return Response.json({ error: false, tags }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: true, errorMessage: "Search failed" },
      { status: 500 }
    );
  }
}
