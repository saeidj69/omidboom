"use client"
import React from 'react'
import {  List, Card, Typography } from "antd";
const { Paragraph } = Typography;
const { Title } = Typography;

import Link from "next/link";

const PostsList = ({posts}:any) => {
  return (
    <>
    <Title level={2}>Posts</Title>
    <List
    grid={{ gutter: 16, column: 2 }}
    dataSource={posts}
    renderItem={(post: any) => (
      <List.Item>
        <Card title={post.title}>
          <Paragraph>{post.body}</Paragraph>
          <Paragraph type="secondary">
            Posted by User {post.userId}
          </Paragraph>

          <Link href={`/posts/${post.id}`}>View Post</Link>
        </Card>
      </List.Item>
    )}
  />
  </>
  )
}

export default PostsList