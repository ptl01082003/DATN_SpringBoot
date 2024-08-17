import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { PATH_ROUTER } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";

const SignUp = () => {
  const onRegister = async (params) => {
    console.log(params);
    const response = await AxiosClient.post("/auth/register", params);
    if (response.code === 0) {
      toast.success(response.message);
      navigation(PATH_ROUTER.SIGN_IN, { replace: true });
    } else {
      toast.error(response.message);
    }
  };

  const schema = yup
    .object({
      userName: yup.string().required("Tài khoản không được để trống"),
      fullName: yup.string().required("Họ tên không được để trống"),
      password: yup.string().required("Mật khẩu không được để trống"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Mật khẩu không được để trống"),
      phone: yup
        .string()
        .matches(/^0\d{9}$/, "Số điện thoại gồm 10 chữ số, bắt đầu bằng số 0")
        .required("Số điện thoại không được để trống"),
      email: yup
        .string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ , VD: dev@dev.vn"
        )
        .required("Email không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigate();

  return (
    <div className="font-[sans-serif]">
      <div className="flex items-center justify-center min-h-screen px-4 py-6 fle-col">
        <div className="grid items-center w-full max-w-6xl gap-4 md:grid-cols-2">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit(onRegister)} autoComplete="false">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-center text-gray-800">
                  ĐĂNG KÝ
                </h3>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Tài khoản
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("userName")}
                    type="text"
                    placeholder="Nhập tại đây"
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                <p className="mt-2 text-sm italic text-red-600">
                  {errors.userName?.message}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">Họ tên</label>
                <div className="relative flex items-center">
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Nhập tại đây"
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] absolute right-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm italic text-red-600">
                  {errors.fullName?.message}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Số điện thoại
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="Nhập tại đây"
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] absolute right-4"
                  >
                    <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                    <path
                      fill-rule="evenodd"
                      d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm italic text-red-600">
                  {errors.phone?.message}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">Email</label>
                <div className="relative flex items-center">
                  <input
                    {...register("email")}
                    type="text"
                    placeholder="Nhập tại đây"
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] absolute right-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm italic text-red-600">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">Mật khẩu</label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                    placeholder="Nhập tại đây"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                <p className="mt-2 text-sm italic text-red-600">
                  {errors.password?.message}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Nhập lại mật khẩu
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                    placeholder="Nhập tại đây"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                <p className="mt-2 text-sm italic text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-sm tracking-wide text-white bg-blue-600 rounded-lg shadow-xl hover:bg-blue-700 focus:outline-none"
                >
                  Đăng ký
                </button>
              </div>
              <Link to={PATH_ROUTER.SIGN_IN}>
                <p className="text-sm !mt-8 text-center text-gray-800">
                  Bạn đã có tài khoản?{" "}
                  <span className="ml-1 font-semibold text-blue-600 hover:underline whitespace-nowrap">
                    Đăng nhập ngay
                  </span>
                </p>
              </Link>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="block object-cover w-full h-full mx-auto max-md:w-4/5"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
