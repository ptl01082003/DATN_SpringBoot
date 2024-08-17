import { Outlet, useNavigate } from "react-router-dom";
import { KEY_STORAGE } from "../../constants/constants";
import { useEffect } from "react";
import Main from "../layout/Main";

export default function PrivateRouter() {
  const navigation = useNavigate();
  const token = localStorage.getItem(KEY_STORAGE.TOKEN);
  useEffect(() => {
    if (!token) {
      navigation("/sign-in", { replace: true });
    }
  }, []);

  if (!token) return <></>;
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
