import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextRequest, NextResponse } from "next/server";

// POST: สร้างโพสต์ใหม่
export async function POST(req: NextRequest) {
  try {
    const { name, title, content, currentDate, catagory } = await req.json();
    console.log(name, title, content, currentDate, catagory);

    // เชื่อมต่อ MongoDB
    await connectMongoDB();

    // สร้างโพสต์ใหม่ โดยกำหนดค่า Date เป็น new Date()
    const newPost = await Post.create({
      name,
      title,
      content,
      Date: new Date(),
      catagory,
      history: [], // เริ่มต้นเป็น array สำหรับเก็บประวัติ
    });

    return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Error creating post" }, { status: 500 });
  }
}

// GET: ดึงโพสต์ทั้งหมด
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

// DELETE: ลบโพสต์
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

// PUT: อัปเดตโพสต์และเก็บประวัติการแก้ไข
export async function PUT(req: NextRequest) {
  try {
    // ดึง ID ของโพสต์จาก URL
    const id = req.nextUrl.pathname.split('/').pop(); // ใช้ pathname แทน searchParams

    // ดึงข้อมูลที่ส่งเข้ามา
    const { newTitle, newContent, newCatagory } = await req.json();

    // ตรวจสอบว่ามี ID หรือไม่
    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    // เชื่อมต่อ MongoDB
    await connectMongoDB();

    // ค้นหาข้อมูลโพสต์ตาม ID ที่ได้
    const post = await Post.findById(id); // ใช้ id แทน "_id"

    // ตรวจสอบว่าพบโพสต์หรือไม่
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // บันทึกประวัติการแก้ไขก่อนอัปเดต
    const version = post.history.length + 1; // เวอร์ชันของการแก้ไข
    post.history.push({
      version,
      name: post.name,
      title: post.title,
      content: post.content,
      category: post.catagory,
      updatedAt: new Date() // ใช้วันที่ปัจจุบัน
    });

    // อัปเดตข้อมูลโน้ต
    post.name = post.name; // ชื่อผู้สร้างไม่ต้องเปลี่ยนแปลง
    post.title = newTitle || post.title;
    post.content = newContent || post.content;
    post.catagory = newCatagory || post.catagory;
    post.updatedAt = new Date(); // อัปเดตวันที่แก้ไข

    // บันทึกการอัปเดต
    await post.save();

    return NextResponse.json({ message: "Post updated successfully", post }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}


// await = export async function

/*
import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
}

//update ข้อมูล
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    const { newName: name, newTitle: title,  newDate: Date, newContent: content,  newCatagory: catagory } = await req.json();

    await connectMongoDB();
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { name, title, Date, content, catagory },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated", post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}
*/