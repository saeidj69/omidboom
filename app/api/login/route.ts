import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "http://localhost:3006/users";

export async function POST(request: NextRequest) {
    debugger;
    const body = await request.json();
    console.log("body", body);
  
    // const user = {
    //   userName:body.userName,
    //   password:body.password
    // };

    try {
      debugger
        const res = await axios.get(API_URL);
        const users = res.data;
        const user = users.find(
            (u:any) => u.userName === body.userName && u.password === body.password
          );
          if (user) {
            // Successful login
            return NextResponse.json({
              message: 'Login successful',
              status: 200,
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                userId:user.userId
              },
            });
          } else {
            // Failed login
            return NextResponse.json(
              { error: 'Invalid username or password' },
              { status: 401 }
            );
          }
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create post" },
        { status: 500 }
      );
    }
  }
  