import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mammoth from "mammoth";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
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
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string || "Untitled Post";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Check if file is a Word document
    if (
      !file.name.endsWith(".docx") &&
      !file.type.includes("wordprocessingml")
    ) {
      return NextResponse.json(
        { error: "Please upload a .docx file" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse Word document to HTML
    const result = await mammoth.convertToHtml({ buffer });
    const htmlContent = result.value;

    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "src/data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Generate unique ID for the blog post
    const postId = Date.now().toString();
    const postData = {
      id: postId,
      title: title,
      content: htmlContent,
      createdAt: new Date().toISOString(),
      fileName: file.name,
    };

    // Save blog post metadata to JSON file
    const postsFile = join(dataDir, "posts.json");
    let posts = [];
    
    if (existsSync(postsFile)) {
      const existingData = await readFile(postsFile, "utf-8");
      posts = JSON.parse(existingData);
    }

    posts.push(postData);
    await writeFile(postsFile, JSON.stringify(posts, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      post: postData,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}

