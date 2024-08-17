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
    // {
    //   key: "sub1",
    //   label: "Navigation One",
    //   icon: <MailOutlined />,
    //   children: [
    //     {
    //       key: "g1",
    //       label: "Item 1",
    //       type: "group",
    //       children: [
    //         { key: "1", label: "Option 1" },
    //         { key: "2", label: "Option 2" },
    //       ],
    //     },
    //     {
    //       key: "g2",
    //       label: "Item 2",
    //       type: "group",
    //       children: [
    //         { key: "3", label: "Option 3" },
    //         { key: "4", label: "Option 4" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   key: "sub2",
    //   label: "Navigation Two",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     { key: "5", label: "Option 5" },
    //     { key: "6", label: "Option 6" },
    //     {
    //       key: "sub3",
    //       label: "Submenu",
    //       children: [
    //         { key: "7", label: "Option 7" },
    //         { key: "8", label: "Option 8" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   key: "sub4",
    //   label: "Navigation Three",
    //   icon: <SettingOutlined />,
    //   children: [
    //     { key: "9", label: "Option 9" },
    //     { key: "10", label: "Option 10" },
    //     { key: "11", label: "Option 11" },
    //     { key: "12", label: "Option 12" },
    //   ],
    // },
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
