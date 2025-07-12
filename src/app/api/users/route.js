import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  if (!users) {
    return Response.json({ error: true }, { status: 204 });
  }
  return Response.json({ error: false, users }, { status: 200 });
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
    const user = await User.create(body);
    return Response.json({ error: false, user }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: true, errorMessage: "Invalid details" },
      { status: 400 }
    );
  }
}
