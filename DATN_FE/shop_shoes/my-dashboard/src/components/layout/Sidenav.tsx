import {
  MailOutlined,
  ManOutlined,
  MessageOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { MenuProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }: { color: string }) {
  const navigation = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <PieChartOutlined />,
    },
    {
      key: "/products",
      label: "Sản phẩm",
      icon: <MailOutlined />,
    },
    {
      key: "/order",
      label: "Quản lý đơn hàng",
      icon: <MailOutlined />,
    },
    {
      key: "attribute",
      label: "Thuộc tính sản phẩm",
      type: "group",
      children: [
        {
          key: "/brands",
          label: "Thương hiệu",
          icon: <MailOutlined />,
        },
        {
          key: "/styles",
          label: "Kiểu dáng",
          icon: <MailOutlined />,
        },
        {
          key: "/materials",
          label: "Chất liệu",
          icon: <MailOutlined />,
        },
        {
          key: "/sizes",
          label: "Sizes",
          icon: <MailOutlined />,
        },
        {
          key: "/origins",
          label: "Xuất xứ",
          icon: <MailOutlined />,
        },
      ],
    },
    {
      key: "/promotions",
      label: "Khuyến mãi",
      icon: <PieChartOutlined />,
    },
    {
      key: "/vouchers",
      label: "Voucher",
      icon: <PieChartOutlined />,
    },
    {
      key: "/users",
      label: "User",
      icon: <PieChartOutlined />,
    },
    {
      key: "/supports",
      label: "Hỗ trợ Khách Hàng",
      icon: <MessageOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigation(e.key);
  };

  return (
    <>
      <div className="brand w-[160px]">
        <img className="w-full" src={logo} alt="" />
      </div>
      <Divider />
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/dashboard"]}
        mode="vertical"
        items={items}
      />
    </>
  );
}

export default Sidenav;
