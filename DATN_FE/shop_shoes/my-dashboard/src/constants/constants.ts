export enum KEY_STORAGE {
  TOKEN = "token",
  RF_TOKEN = "refreshToken",
}

export const URL_IMAGE = (path) => {
  return `http://localhost:5500/${path}`;
};

export type Response<T> = {
  code: number;
  data: T;
  message: string;
};

export enum RESPONSE_CODE {
  SUCCESS = 0,
  ERRORS = 1,
  NOT_AUTHOR = 83,
  NOT_AUTHEN = 85,
  INCORRECT = 86,
}

export enum Vouchers_TYPE {
  PERCENT = "PERCENT",
}

export enum Vouchers_STATUS {
  ISACTIVE = "ISACTIVE",
  EXPIRED = "EXPIRED",
  UNUSED = "UNUSED",
}

export enum Voucher_RULE {
  MIN_ORDER_VALUE = "MIN_ORDER_VALUE",
  NEW_ACCOUNT = "NEW_ACCOUNT",
  ORDER_COUNT = "ORDER_COUNT",
}

export enum PROMOTIONS_STATUS {
  PRE_START = "PRE_START",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

export enum ROLE_TYPES {
  USER = "USER",
  ADMIN = "ADMIN",
  MEMBERSHIP = "MEMBERSHIP",
}

export const PATH_ROUTER = {};

export const TRANSFER_PRICE = (price: string) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(parseFloat(price))
    ?.replace("₫", "VNĐ") || "";

export function convertTextToShortName(fullName?: string) {
  if (!fullName) {
    return "NM";
  }

  return fullName
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join("");
}
