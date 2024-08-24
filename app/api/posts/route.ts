import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "http://localhost:3006/posts";

// Handle GET, POST, PUT, DELETE operations in one route
export async function GET(request: NextRequest) {
  debugger;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Fetch single post by ID
      const response = await axios.get(`${API_URL}/${id}`);
      return NextResponse.json(response.data);
    } else {
      // Fetch all posts
      const response = await axios.get(API_URL);
      return NextResponse.json(response.data);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  debugger;
  const body = await request.json();
  console.log("body", body);

  const post = {
    userId: body.userId,
    id: Math.floor(Math.random() * 100) + 11,
    title: body.title,
    body: body.body,
  };

  try {
    const response = await axios.post(API_URL, post);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  try {
    const response = await axios.put(`${API_URL}/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      await axios.delete(`${API_URL}/${id}`);
      return NextResponse.json({ message: `Post with ID ${id} deleted` });
    } else {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
