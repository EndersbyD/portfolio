import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postsFile = join(process.cwd(), "src/data/posts.json");
    
    if (!existsSync(postsFile)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const data = await readFile(postsFile, "utf-8");
    const posts = JSON.parse(data);
    const post = posts.find((p: any) => p.id === id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error reading post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated as admin
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin-auth")?.value === "true";

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const postsFile = join(process.cwd(), "src/data/posts.json");
    
    if (!existsSync(postsFile)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const data = await readFile(postsFile, "utf-8");
    const posts = JSON.parse(data);
    const postIndex = posts.findIndex((p: any) => p.id === id);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Remove the post
    posts.splice(postIndex, 1);
    await writeFile(postsFile, JSON.stringify(posts, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

