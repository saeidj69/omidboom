import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "http://localhost:3006/users";

export async function POST(request: NextRequest) {
    debugger;
    const body = await request.json();
    console.log("body", body);
  
    const user = {
      userId: Math.floor(Math.random() * 100) + 3,      
      firstName:body.firstName,
      lastName:body.lastName,
      userName:body.userName,
      password:body.password
    };
  
    try {
      const response = await axios.post(API_URL, user);
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create post" },
        { status: 500 }
      );
    }
  }
  