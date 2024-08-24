"use client";

import { useState, useEffect } from "react";
import { Button, Spin, Typography, Card } from "antd";

import { useRouter ,useParams } from "next/navigation";
const { Title, Paragraph } = Typography;

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostDetailsPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchPostById(id as string);
    }
  }, [id]);

  // Fetch post by ID
  const fetchPostById = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/posts?id=${id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;

  if (!post) return <div>Post not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={() => router.back()}>Back to Posts</Button>

      <Card style={{ marginTop: "20px" }}>
        <Title level={2}>{post.title}</Title>
        <Paragraph>{post.body}</Paragraph>
        <Paragraph type="secondary">Posted by User {post.userId}</Paragraph>
      </Card>
    </div>
  );
}
