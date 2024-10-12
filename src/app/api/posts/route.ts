import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, title, content, currentDate, catagory } = await req.json(); //ชื่อ หัวเรื่อง เนื้อหา วันที่ หมวดหมู่
    console.log(name, title, content, currentDate, catagory);

    // เชื่อมต่อ MongoDB
    await connectMongoDB();

    // สร้างโพสต์ใหม่ โดยกำหนดค่า Date เป็น new Date()
    const newPost = await Post.create({
      name,
      title,
      content,
      Date: new Date(),
      catagory
    });

    return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Error creating post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted", post: deletedPost }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
  }
}


//แหล่งรวม GET POST DELETE


/*
export async function POST(req: NextRequest) {

  try {
    const { name, title, content, currentDate, catagory } = await req.json(); //ชื่อ หัวเรื่อง เนื้อหา วันที่ หมวดหมู่
    console.log(name, title, content, currentDate, catagory);

    await connectMongoDB();
    const newPost = await Post.create({ name, title, content, Date, catagory });

    return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Error creating post" }, { status: 500 });
  }
}
*/