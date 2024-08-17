import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoLight } from "../../../assets/images";
import {
  isLogin,
  navBarList,
  PATH_ROUTER,
  removeStorage,
} from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";
import { selectCarts } from "../../../redux/slices/cartsSlice";
import { selectUserInfo } from "../../../redux/slices/usersSlice";
import Flex from "../../designLayouts/Flex";

const Header = () => {
  const navigation = useNavigate();
  const selUserInfo = useSelector(selectUserInfo);
  const selCarts = useSelector(selectCarts);

  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  const onLogout = async () => {
    const response = await AxiosClient.post("/auth/logout");
    if (response.code == 0) {
      removeStorage();
      window.location.replace(PATH_ROUTER.SIGN_IN);
    } else {
    }
  };

  const items = [
    {
      label: (
        <>
          <h3 className="mb-1 font-bold text-center">
            {selUserInfo?.fullName}
          </h3>
          <div className="flex justify-center items-center space-x-1 text-xs italic">
            <h3>ID:</h3>
            <h3>{selUserInfo?.userId}</h3>
          </div>
        </>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="w-full py-2 font-bold text-center text-white bg-slate-500 rounded-md"
          onClick={onLogout}
        >
          Đăng xuất
        </button>
      ),
      key: "3",
    },
  ];

  return (
    <div className="w-full h-20 bg-[#111111] sticky  top-0 z-[60] border-b-[1px] border-b-gray-200">
      <nav className="max-w-container mx-auto h-full relative px-4">
        <Flex className="h-full flex justify-between items-center">
          <Link to="/">
            <div>
              {/* <Image className="w-32 object-cover" imgSrc={logo} /> */}
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-auto z-50 flex items-center p-0"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className="flex font-normal hover:font-bold justify-center items-center px-6 h-4 text-base text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fffafa] md:border-r-[2px] border-r-gray-300 last:border-r-0"
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li style={{ color: "white" }}>{title}</li>
                  </NavLink>
                ))}

                {isLogin ? (
                  <div className="flex items-center pl-5 space-x-1 cursor-pointer">
                    <Badge
                      count={selCarts?.cartItems?.length || 0}
                      onClick={() => {
                        navigation("/cart");
                      }}
                    >
                      <ShoppingCartOutlined className="text-2xl text-white" />
                    </Badge>
                    <Link to={"/users"}>
                      <p className="flex font-normal hover:font-bold px-5 text-base text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fffafa] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                        Thông tin
                      </p>
                    </Link>
                  </div>
                ) : (
                  <NavLink
                    className="flex font-normal hover:font-bold justify-center items-center px-6 h-4 text-base text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fffafa] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                    to={PATH_ROUTER.SIGN_IN}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>Đăng nhập</li>
                  </NavLink>
                )}
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="w-8 h-6 absolute right-4 top-6 inline-block cursor-pointer md:hidden"
            />
            {sidenav && (
              <div className="bg-opacity-80 w-full h-screen fixed top-0 left-0 z-50 text-white bg-black">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="bg-primeColor w-full h-full p-6">
                    <img
                      className="w-28 mb-6"
                      src={logoLight}
                      alt="logoLight"
                    />
                    <ul className="flex flex-col gap-2 text-white">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <h1
                        onClick={() => setCategory(!category)}
                        className="font-titleFont flex justify-between items-center mb-2 text-base cursor-pointer"
                      >
                        Shop by Category{" "}
                        <span className="text-lg">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-1 text-sm"
                        >
                          <li className="headerSedenavLi">New Arrivals</li>
                          <li className="headerSedenavLi">Gudgets</li>
                          <li className="headerSedenavLi">Accessories</li>
                          <li className="headerSedenavLi">Electronics</li>
                          <li className="headerSedenavLi">Others</li>
                        </motion.ul>
                      )}
                    </div>
                    <div className="mt-4">
                      <h1
                        onClick={() => setBrand(!brand)}
                        className="font-titleFont flex justify-between items-center mb-2 text-base cursor-pointer"
                      >
                        Shop by Brand
                        <span className="text-lg">{brand ? "-" : "+"}</span>
                      </h1>
                      {brand && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-1 text-sm"
                        >
                          <li className="headerSedenavLi">New Arrivals</li>
                          <li className="headerSedenavLi">Gudgets</li>
                          <li className="headerSedenavLi">Accessories</li>
                          <li className="headerSedenavLi">Electronics</li>
                          <li className="headerSedenavLi">Others</li>
                        </motion.ul>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
