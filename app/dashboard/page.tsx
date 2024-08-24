"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Spin,
  List,
  Card,
  Typography,
  Popconfirm,
  Modal,
} from "antd";
import { useRouter } from "next/navigation";
const { Title, Paragraph } = Typography;

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    debugger
    setLoading(true);
    try {
      const response = await fetch("/api/posts", {cache:"no-store"});
      let data = await response.json();
      const user:any = localStorage.getItem("userInfo");
      const userInfo=JSON.parse(user)
      const userPosts = data.filter((data: any) => data.userId == userInfo.userId);
      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async () => {
    debugger
    const user:any=localStorage.getItem("userInfo")
    const userInfo: any =JSON.parse(user);
    setUserId(parseInt(userInfo.userId));
    const newPost = {
      title,
      body,
      userId:userInfo.userId,
    };
 
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data,...posts]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Update a post
  const updatePost = async () => {
    debugger;
    if (!selectedPostId) return;
    const user:any=localStorage.getItem("userInfo")
    const userInfo: any =JSON.parse(user);
    setUserId(parseInt(userInfo.userId));
    const updatedPost = {
      id: selectedPostId,
      title,
      body,
      userId:userInfo.userId,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      const data = await response.json();
      setPosts(posts.map((post) => (post.id === selectedPostId ? data : post)));
      setTitle("");
      setBody("");
      setSelectedPostId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Delete a post
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const editPost = (post: Post) => {
    setSelectedPostId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setisEdit(true);
  };
  const cancelEdit = () => {
    setSelectedPostId(null);
    setTitle("");
    setBody("");
    setisEdit(false);
    setIsModalOpen(false);
  };
  const showModal = (post: Post) => {
    editPost(post);
    setIsModalOpen(true);
  };

  if (loading) return <Spin size="large" />;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Posts</Title>

      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Create New Post
      </Button>

      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card title={post.title}>
              <Paragraph>{post.body}</Paragraph>
              <Paragraph type="secondary">
                Posted by User {post.userId}
              </Paragraph>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => deletePost(post.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button>Delete</Button>
              </Popconfirm>
              <Button onClick={() => showModal(post)}>Edit</Button>
              <Button
                type="primary"
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                View Post
              </Button>
            </Card>
          </List.Item>
        )}
      />
      <Modal title="Basic Modal" open={isModalOpen}  onCancel={()=>setIsModalOpen(false)} footer={[]}>
        <Title level={3} style={{ marginTop: "30px" }}>
          {selectedPostId ? "Update Post" : "Add a New Post"}
        </Title>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input.TextArea
          placeholder="Body"
          value={body}
          rows={5}
          onChange={(e) => setBody(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        {selectedPostId && isEdit ? (
          <>
            <Button type="primary" onClick={updatePost}>
              Update Post
            </Button>
            <Button
              type="default"
              onClick={() => {
                cancelEdit();
              }}
            >
              cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={createPost}>
              Add Post
            </Button>
            <Button
              type="default"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              cancel
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
}
