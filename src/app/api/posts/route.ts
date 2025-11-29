import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET() {
  try {
    const postsFile = join(process.cwd(), "src/data/posts.json");
    
    if (!existsSync(postsFile)) {
      return NextResponse.json([]);
    }

    const data = await readFile(postsFile, "utf-8");
    const posts = JSON.parse(data);
    
    // Sort posts by date (newest first)
    posts.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    return NextResponse.json([], { status: 500 });
  }
}

