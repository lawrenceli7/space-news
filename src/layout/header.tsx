import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { MenuInfo } from "rc-menu/lib/interface";
import React from "react";

const { Header } = Layout;

const CustomHeader = () => {
  const menuItems: { key: string; label: string; href: string }[] = [
    { key: "0", label: "Home", href: "/" },
    { key: "1", label: "News", href: "/news" },
    { key: "2", label: "About", href: "/about" },
  ];

  const router = useRouter();

  const selectedKey = menuItems
    .findIndex((item) => item.href === router.pathname)
    .toString();

  const handleClick = (e: MenuInfo) => {
    const parsedKey = parseInt(e.key);
    if (parsedKey < 0 || parsedKey >= menuItems.length) return;
    router.push(menuItems[parsedKey].href);
  };

  return (
    <Header>
      <div>
        <div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey]}
            onClick={handleClick}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
