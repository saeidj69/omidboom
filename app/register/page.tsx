"use client";

import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./RegisterPage.module.css";

import { useRouter } from "next/navigation";
interface LoginFormValues {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Register() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if(response.status==200)
        router.push("/")
      // Redirect to dashboard or home page after successful login
    } catch (error) {
      message.error("Register failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Register" className={styles.card}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="firstname"
            rules={[{ required: true, message: "Please input your firstname!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="firstname" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your lastName!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="lastName" />
          </Form.Item>
          <Form.Item
            name="username"
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
