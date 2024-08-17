import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  {
    key: Math.floor(Math.random() * 200000000) + 2000000,
    label: "Thông tin",
    path: "",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M6 20.8863C6 18.1249 8.68781 16 12.0015 16C15.3152 16 18 18.1249 18 20.8863"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    key: Math.floor(Math.random() * 200000000) + 2000000,
    label: "Hoá đơn",
    path: "payment",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 6V17C3 18.8856 3 19.8284 3.58579 20.4142C4.17157 21 5.11438 21 7 21H17C18.8856 21 19.8284 21 20.4142 20.4142C21 19.8284 21 18.8856 21 17V12C21 10.1144 21 9.17157 20.4142 8.58579C19.8284 8 18.8856 8 17 8H7.82843C6.67474 8 6.0979 8 5.56035 7.84678C5.26506 7.7626 4.98044 7.64471 4.71212 7.49543C4.22367 7.22367 3.81578 6.81578 3 6ZM3 6C3 5.06812 3 4.60218 3.15224 4.23463C3.35523 3.74458 3.74458 3.35523 4.23463 3.15224C4.60218 3 5.06812 3 6 3H14C15.1046 3 16 3.89543 16 5"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="my-path"
        ></path>
        <path
          d="M18 14.5C18 15.3284 17.3284 16 16.5 16C15.6716 16 15 15.3284 15 14.5C15 13.6716 15.6716 13 16.5 13C17.3284 13 18 13.6716 18 14.5Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    key: Math.floor(Math.random() * 200000000) + 2000000,
    label: "Đơn Hàng",
    path: "orders",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.7146 19.5C10.7146 20.3284 10.0239 21 9.17176 21C8.31967 21 7.62891 20.3284 7.62891 19.5"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M16.8865 19.5C16.8865 20.3284 16.1957 21 15.3436 21C14.4915 21 13.8008 20.3284 13.8008 19.5"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M3.51429 6L4.96114 13.7354C5.25319 15.2968 5.39921 16.0775 5.95475 16.5387C6.51029 17 7.30451 17 8.89296 17H15.6218C17.2103 17 18.0046 17 18.5601 16.5387C19.1157 16.0774 19.2617 15.2967 19.5537 13.7352L20.1146 10.7352C20.5248 8.54152 20.7299 7.44469 20.1301 6.72234C19.5303 6 18.4144 6 16.1827 6H3.51429ZM3.51429 6L3 3"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    key: Math.floor(Math.random() * 200000000) + 2000000,
    label: "Trả hàng",
    path: "return-request",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.7146 19.5C10.7146 20.3284 10.0239 21 9.17176 21C8.31967 21 7.62891 20.3284 7.62891 19.5"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M16.8865 19.5C16.8865 20.3284 16.1957 21 15.3436 21C14.4915 21 13.8008 20.3284 13.8008 19.5"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M3.51429 6L4.96114 13.7354C5.25319 15.2968 5.39921 16.0775 5.95475 16.5387C6.51029 17 7.30451 17 8.89296 17H15.6218C17.2103 17 18.0046 17 18.5601 16.5387C19.1157 16.0774 19.2617 15.2967 19.5537 13.7352L20.1146 10.7352C20.5248 8.54152 20.7299 7.44469 20.1301 6.72234C19.5303 6 18.4144 6 16.1827 6H3.51429ZM3.51429 6L3 3"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    key: Math.floor(Math.random() * 200000000) + 2000000,
    label: "Nhắn tin",
    path: "supports",
    icon: (
      <svg
        width="26px"
        height="26px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 3H10.5C7.21252 3 5.56878 3 4.46243 3.90796C4.25989 4.07418 4.07418 4.25989 3.90796 4.46243C3 5.56878 3 7.21252 3 10.5V14.6667C3 16.5076 4.49238 18 6.33333 18H6.5C7.32843 18 8 18.6716 8 19.5C8 20.118 8.70557 20.4708 9.2 20.1L11 18.75C11.4623 18.4033 11.6934 18.23 11.9584 18.1296C12.0086 18.1106 12.0595 18.0936 12.111 18.0787C12.3833 18 12.6722 18 13.25 18H13.5C16.7875 18 18.4312 18 19.5376 17.092C19.7401 16.9258 19.9258 16.7401 20.092 16.5376C21 15.4312 21 13.7875 21 10.5C21 7.21252 21 5.56878 20.092 4.46243C19.9258 4.25989 19.7401 4.07418 19.5376 3.90796C18.4312 3 16.7875 3 13.5 3Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M7 8H17"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M7 12H12"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    key: Math.floor(Math.random() * 200000000) + 2000000,
    label: "Đăng xuất",
    path: "logout",
    icon: (
      <svg
        width="26px"
        height="26px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M3 8H21"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M9.12132 12L7 14.1213L9.12132 16.2426"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="my-path"
        ></path>
        <path
          d="M15.0566 12.0029L17.1143 14.0606L15.0566 16.1183"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
];
export default function UserFeature() {
  const location = useLocation();

  return (
    <div className="container mx-auto flex gap-8 py-[2%]">
      <div className="relative">
        <div className="w-[280px] sticky top-[112px] z-20">
          <ul className="space-y-3">
            {navItems.map((items) => (
              <div>
                <Link
                  to={items.path}
                  className={clsx("flex items-center gap-3 p-3 rounded-lg", {
                    "border border-[#faad14] text-[#faad14]":
                      items.path === (location.pathname.split("/")[2] || ""),
                  })}
                >
                  {items.icon}
                  <h1>{items.label}</h1>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 min-h-[60vh]">
        <Outlet />
      </div>
    </div>
  );
}
