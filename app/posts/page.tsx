import { Spin, Typography } from "antd";

import PostsList from "./list";

const getData = async () => {
  const response = await fetch("http://localhost:3006/posts");

  return await response.json();
};
export default async function PostsPage() {
  //const posts = await getData();
  const res = await fetch("http://localhost:3006/posts", {
    cache: "no-store", // Ensures fresh data on every request
  });
  if (!res.ok) {
    return <Spin size="large" />;
  }
  const posts = await getData();
  //const posts = await res.json();
  if (posts.length == 0) return <Spin size="large" />;

  return (
    <div style={{ padding: "20px" }}>
      <PostsList posts={posts} />
    </div>
  );
}
