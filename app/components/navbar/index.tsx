"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
const token = localStorage.getItem('token');
const items: MenuItem[] = [
  {
    label: "home",
    key: "/",
    icon: <MailOutlined />,
  },
  {
    label: "posts",
    key: "posts",
    icon: <AppstoreOutlined />,
  },
  ...(token ? [{
    label: "dashboard",
    key: "dashboard",
    icon: <AppstoreOutlined />,
  }] : [])


];

const App: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const token = localStorage.getItem("token");
  const user: any = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(user);
  const  router=useRouter()
  const onClick: MenuProps["onClick"] = (e) => {
    
    router.push(e.key);
  };

  const goToLogin=()=>{
    router.push('/login');

  }
  const Logout=()=>{
    localStorage.clear();
    router.push('/');

  }

  return (
    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
    <div  style={{width:"50%"}}>
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
     
    />
    </div>
    {token ? (
      <>
        <p>
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <Button onClick={Logout}>Logout</Button>
      </>

      ) : (
        <Button onClick={goToLogin}>Login</Button>
      )}
    </div>
  );
};

export default App;
