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
import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../app/slice/userSlice";
import { useMemo } from "react";
import { ROLE_TYPES } from "../../constants/constants";

function Sidenav({ color }: { color: string }) {
  const navigation = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  const userInfo = useAppSelector(selectUserInfo);
  const userRoles = useMemo(() => userInfo?.roles, [userInfo]);

  const items: Array<
    MenuItem & {
      roles: Array<string>;
    }
  > = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <PieChartOutlined />,
      roles: [ROLE_TYPES.ADMIN],
    },
    {
      key: "/products",
      label: "Sản phẩm",
      icon: <MailOutlined />,
      roles: [ROLE_TYPES.ADMIN, ROLE_TYPES.MEMBERSHIP],
    },
    {
      key: "/order",
      label: "Quản lý đơn hàng",
      icon: <MailOutlined />,
      roles: [ROLE_TYPES.ADMIN, ROLE_TYPES.MEMBERSHIP],
    },
    {
      key: "attribute",
      label: "Thuộc tính sản phẩm",
      type: "group",
      roles: [ROLE_TYPES.ADMIN],
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
      roles: [ROLE_TYPES.ADMIN],
    },
    {
      key: "/vouchers",
      label: "Voucher",
      icon: <PieChartOutlined />,
      roles: [ROLE_TYPES.ADMIN],
    },
    {
      key: "/users",
      label: "User",
      icon: <PieChartOutlined />,
      roles: [ROLE_TYPES.ADMIN],
    },
    {
      key: "/supports",
      label: "Hỗ trợ Khách Hàng",
      icon: <MessageOutlined />,
      roles: [ROLE_TYPES.MEMBERSHIP],
    },
  ];

  const renderBarByRoles: Array<
    MenuItem & {
      roles: Array<string>;
    }
  > = useMemo(() => {
    return items.filter((item) => item.roles.includes(userRoles));
  }, [userRoles]);

  const onClick: MenuProps["onClick"] = (e) => {
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
        items={renderBarByRoles}
      />
    </>
  );
}

export default Sidenav;
