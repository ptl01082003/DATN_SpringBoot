import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../redux/slices/usersSlice";

export default function UserInfo() {
  const selUserInfo = useSelector(selectUserInfo);

  return (
    <div>
      <h1>{selUserInfo?.fullName}</h1>
      <h1>{selUserInfo?.email}</h1>
      <h1>{selUserInfo?.phone}</h1>
    </div>
  );
}
