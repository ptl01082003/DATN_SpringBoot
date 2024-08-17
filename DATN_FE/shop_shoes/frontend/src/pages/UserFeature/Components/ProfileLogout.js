import React from "react";
import AxiosClient from "../../../networks/AxiosClient";
import { PATH_ROUTER, removeStorage } from "../../../constants";

export default function ProfileLogout() {
  const logout = async () => {
    const response = await AxiosClient.post("/auth/logout");
    if (response.code == 0) {
      removeStorage();
      window.location.replace(PATH_ROUTER.SIGN_IN);
    } else {
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-5 italic text-lg">Cảm ơn bạn vì đã là một phần của chúng tôi !</h1>
      <button
        onClick={logout}
        className="border bg-[#111111] text-white font-bold rounded-lg px-6 py-3 text-sm"
      >
        ĐĂNG XUẤT
      </button>
    </div>
  );
}
