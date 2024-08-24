"use client";

import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginPage.module.css";

import { useRouter } from "next/navigation";
interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: LoginFormValues) => {
    debugger
    try {

      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.status == 200) {
        localStorage.setItem("token",Math.random().toString(36).slice(2));
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        router.push("/")
      }
      // Redirect to dashboard or home page after successful login
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Login" className={styles.card}>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
