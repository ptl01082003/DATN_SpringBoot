import {
  IMPRIMANTE_PANTUM_BM5100FDW,
  IMPRIMANTE_PANTUM_BP5100DN,
  IMPRIMANTE_PANTUM_CP2200DW,
  IMPRIMANTE_PANTUM_M6559N,
  IMPRIMANTE_PANTUM_M6609N,
  IMPRIMANTE_PANTUM_P2509,
  IMPRIMANTE_PANTUM_P2509W,
  IMPRIMANTE_PANTUM_P3300DN,
  IMPRIMANTE_PANTUM_P3300DW,
  bac1,
  bac2,
  bac3,
  bac4,
  encre1,
  encre2,
  encre3,
  encre4,
  espson1,
  espson2,
  hp1,
  hp2,
  hp3,
  imprimante1,
  imprimante2,
  imprimante4,
  imprimante5,
  imprimante6,
  imprimante7,
  imprimante8,
  imprimante9,
  pdf1,
  ricoh1,
  ricoh2,
  ricoh3,
  ricoh4,
  ricoh5,
  ruban1,
  ruban2,
  ruban3,
  ruban4,
} from "../assets/images/index";

import "./style.css";

export const URL_IMAGE = (path) => {
  return `http://localhost:5500/${path}`;
};

export const PAYMENT_STATUS = {
  CASH: "Ship COD",
  IDLE: "Chờ thanh toán",
  SUCCESS: "Thành công",
  ERRORS: "Giao dịch lỗi",
};

export const PAYMENT_STATUS_COLOR = {
  IDLE: "#faad14",
  SUCCESS: "#018601",
  CASH: "#018601",
  ERRORS: "#f5222d",
};

export const ODER_STATUS = {
  DA_GIAO: "DA_GIAO",
  DA_HUY: "DA_HUY",
  TRA_HANG: "TRA_HANG",
  CHO_LAY_HANG: "CHO_LAY_HANG",
  CHO_XAC_NHAN: "CHO_XAC_NHAN",
  CHO_GIAO_HANG: "CHO_GIAO_HANG",
  CHO_THANH_TOAN: "CHO_THANH_TOAN",
  KHONG_DU_SO_LUONG: "KHONG_DU_SO_LUONG",
};

export const ODER_STATUS_STRING = [
  {
    label: "Chờ xác nhận",
    value: "CHO_XAC_NHAN",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 6.94949C13.6353 7.59777 14.5207 8 15.5 8C16.4793 8 17.3647 7.59777 18 6.94949M13 6.94949C12.3814 6.31822 12 5.45365 12 4.5C12 2.567 13.567 1 15.5 1C17.433 1 19 2.567 19 4.5C19 5.45365 18.6186 6.31822 18 6.94949M13 6.94949V10.3238C13 10.6792 13 10.857 13.0299 10.9764C13.1687 11.5314 13.7438 11.857 14.2911 11.6905C14.4089 11.6547 14.5613 11.5632 14.8661 11.3804C14.9816 11.311 15.0394 11.2764 15.0968 11.2511C15.3537 11.1379 15.6463 11.1379 15.9032 11.2511C15.9606 11.2764 16.0184 11.311 16.1339 11.3804C16.4387 11.5632 16.5911 11.6547 16.7089 11.6905C17.2562 11.857 17.8313 11.5314 17.9701 10.9764C18 10.857 18 10.6792 18 10.3238V6.94949M9.57143 1H7C4.17157 1 2.75736 1 1.87868 1.87868C1 2.75736 1 4.17157 1 7V14C1 15.8692 1 16.8038 1.40192 17.5C1.66523 17.9561 2.04394 18.3348 2.5 18.5981C3.19615 19 4.13077 19 6 19M6 19H17C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15H11.7082C9.90398 15 9.00186 15 8.27691 15.448C7.55195 15.8961 7.14852 16.703 6.34164 18.3167L6 19ZM9 7H4M9 11H4"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Chờ thanh toán",
    value: "CHO_THANH_TOAN",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 9.71429C15 8.76751 14.2325 8 13.2857 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.7143C9.76751 16 9 15.2325 9 14.2857M12 6.5V17.5M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Chờ lấy hàng",
    value: "CHO_LAY_HANG",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 9V17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17V9"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M4.38556 5.15106C4.57662 4.48237 4.67214 4.14802 4.8473 3.88664C5.09766 3.51302 5.46665 3.2347 5.89467 3.09661C6.19411 3 6.54183 3 7.23728 3H9.00015V6.63958C9.00015 6.99391 9.00015 7.17108 8.9753 7.32724C8.86539 8.01793 8.40268 8.60103 7.75504 8.86501C7.60861 8.92469 7.43607 8.96495 7.09101 9.04547C6.4121 9.20388 6.07264 9.28309 5.82697 9.27934C4.70798 9.26229 3.82074 8.33041 3.85859 7.21193C3.8669 6.96637 3.96266 6.63121 4.15418 5.96088L4.38556 5.15106Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M19.6146 5.15106C19.4235 4.48237 19.328 4.14802 19.1529 3.88664C18.9025 3.51302 18.5335 3.2347 18.1055 3.09661C17.806 3 17.4583 3 16.7629 3H15V6.63958C15 6.99391 15 7.17108 15.0249 7.32724C15.1348 8.01793 15.5975 8.60103 16.2451 8.86501C16.3915 8.92469 16.5641 8.96495 16.9091 9.04547C17.5881 9.20388 17.9275 9.28309 18.1732 9.27934C19.2922 9.26229 20.1794 8.33041 20.1416 7.21193C20.1332 6.96637 20.0375 6.63121 19.846 5.96088L19.6146 5.15106Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M9 3H15V6C15 6.93188 15 7.39782 14.8478 7.76537C14.6448 8.25542 14.2554 8.64477 13.7654 8.84776C13.3978 9 12.9319 9 12 9C11.0681 9 10.6022 9 10.2346 8.84776C9.74458 8.64477 9.35523 8.25542 9.15224 7.76537C9 7.39782 9 6.93188 9 6V3Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M10 17C10 16.0572 10 15.5858 10.2929 15.2929C10.5858 15 11.0572 15 12 15C12.9428 15 13.4142 15 13.7071 15.2929C14 15.5858 14 16.0572 14 17V21H10V17Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Chờ giao hàng",
    value: "CHO_GIAO_HANG",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8C3 6.11438 3 5.17157 3.58579 4.58579C4.17157 4 5.11438 4 7 4H10C11.8856 4 12.8284 4 13.4142 4.58579C14 5.17157 14 6.11438 14 8V15H7C5.11438 15 4.17157 15 3.58579 14.4142C3 13.8284 3 12.8856 3 11V8Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M9 17.5C9 18.8807 7.88071 20 6.5 20C5.11929 20 4 18.8807 4 17.5C4 16.1193 5.11929 15 6.5 15C7.88071 15 9 16.1193 9 17.5Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M18 17.5C18 18.8807 16.8807 20 15.5 20C14.1193 20 13 18.8807 13 17.5C13 16.1193 14.1193 15 15.5 15C16.8807 15 18 16.1193 18 17.5Z"
          stroke="black"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M14 15H17C18.8856 15 19.8284 15 20.4142 14.4142C21 13.8284 21 12.8856 21 11V9.9005C21 9.56057 21 9.39061 20.9459 9.23286C20.8917 9.0751 20.7874 8.94094 20.5787 8.67262L19.0429 6.69795C18.8051 6.39223 18.6862 6.23936 18.527 6.14346C18.4771 6.11337 18.4246 6.08771 18.3702 6.06677C18.1968 6 18.0031 6 17.6158 6C16.1008 6 15.3433 6 14.8144 6.38929C14.6521 6.50877 14.5088 6.6521 14.3893 6.81442C14 7.3433 14 8.1008 14 9.61579L14 15Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M17.5 12L17.5 10"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Đã giao",
    value: "DA_GIAO",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 14H19C20.1046 14 21 13.1046 21 12V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V12C3 13.1046 3.89543 14 5 14H10"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M20 17V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V17"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M10 13C10 12.4477 10.4477 12 11 12H13C13.5523 12 14 12.4477 14 13V15C14 15.5523 13.5523 16 13 16H11C10.4477 16 10 15.5523 10 15V13Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M15 5.23828V3.9998C15 3.44752 14.5523 3 14 3H10C9.44772 3 9 3.44752 9 3.9998V5.23828"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Đã hủy",
    value: "DA_HUY",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.7305 7.76904L17.5 5.99951M17.5 5.99951L19.266 4.23351M17.5 5.99951L19.2695 7.76904M17.5 5.99951L15.734 4.23351M6.5 10.0015C5.09554 10.0015 4.39331 10.0015 3.88886 9.6644C3.67048 9.51849 3.48298 9.33099 3.33706 9.11261C3 8.60816 3 7.90593 3 6.50146C3 5.097 3 4.39477 3.33706 3.89032C3.48298 3.67194 3.67048 3.48444 3.88886 3.33853C4.39331 3.00146 5.09554 3.00146 6.5 3.00146C7.90446 3.00146 8.60669 3.00146 9.11114 3.33853C9.32952 3.48444 9.51702 3.67194 9.66294 3.89032C10 4.39477 10 5.097 10 6.50146C10 7.90593 10 8.60816 9.66294 9.11261C9.51702 9.33099 9.32952 9.51849 9.11114 9.6644C8.60669 10.0015 7.90446 10.0015 6.5 10.0015ZM6.5 21.0015C5.09554 21.0015 4.39331 21.0015 3.88886 20.6644C3.67048 20.5185 3.48298 20.331 3.33706 20.1126C3 19.6082 3 18.9059 3 17.5015C3 16.097 3 15.3948 3.33706 14.8903C3.48298 14.6719 3.67048 14.4844 3.88886 14.3385C4.39331 14.0015 5.09554 14.0015 6.5 14.0015C7.90446 14.0015 8.60669 14.0015 9.11114 14.3385C9.32952 14.4844 9.51702 14.6719 9.66294 14.8903C10 15.3948 10 16.097 10 17.5015C10 18.9059 10 19.6082 9.66294 20.1126C9.51702 20.331 9.32952 20.5185 9.11114 20.6644C8.60669 21.0015 7.90446 21.0015 6.5 21.0015ZM17.5 21.0015C16.0955 21.0015 15.3933 21.0015 14.8889 20.6644C14.6705 20.5185 14.483 20.331 14.3371 20.1126C14 19.6082 14 18.9059 14 17.5015C14 16.097 14 15.3948 14.3371 14.8903C14.483 14.6719 14.6705 14.4844 14.8889 14.3385C15.3933 14.0015 16.0955 14.0015 17.5 14.0015C18.9045 14.0015 19.6067 14.0015 20.1111 14.3385C20.3295 14.4844 20.517 14.6719 20.6629 14.8903C21 15.3948 21 16.097 21 17.5015C21 18.9059 21 19.6082 20.6629 20.1126C20.517 20.331 20.3295 20.5185 20.1111 20.6644C19.6067 21.0015 18.9045 21.0015 17.5 21.0015Z"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Trả hàng",
    value: "TRA_HANG",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.81207 6.05324C9.53921 2.87158 14.4614 2.87158 17.1885 6.05324C19.382 8.61225 19.382 12.3884 17.1885 14.9474L13.0785 19.7424C12.7864 20.0831 12.6404 20.2535 12.4797 20.3413C12.1809 20.5045 11.8197 20.5045 11.5209 20.3413C11.3602 20.2535 11.2142 20.0831 10.9221 19.7424L6.81207 14.9474C4.61863 12.3884 4.61863 8.61225 6.81207 6.05324Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
        <path
          d="M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z"
          stroke="currentColor"
          stroke-width="null"
          class="my-path"
        ></path>
      </svg>
    ),
  },
  {
    label: "Không đủ số lượng",
    value: "KHONG_DU_SO_LUONG",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 7L12 13"
          stroke="black"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path"
        ></path>
        <path
          d="M11.9992 15.9414L11.9492 15.9414"
          stroke="currentColor"
          stroke-width="null"
          stroke-linecap="round"
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
];

export const TRANSFER_PRICE = (price) => {
  return (
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(parseFloat(price))
      .replace("₫", "VNĐ") || ""
  );
};

export const removeStorage = () => {
  localStorage.removeItem(KEY_STORAGE.TOKEN);
  localStorage.removeItem(KEY_STORAGE.RF_TOKEN);
};

export const KEY_STORAGE = {
  TOKEN: "token",
  RF_TOKEN: "refreshToken",
};

export const isLogin = (() =>
  localStorage.getItem(KEY_STORAGE.TOKEN) != undefined)();

export const RESPONSE_CODE = {
  SUCCESS: 0,
  ERRORS: 1,
  NOT_AUTHOR: 83,
  NOT_AUTHEN: 85,
  INCORRECT: 86,
};

export const PATH_ROUTER = {
  SIGN_IN: "/dang-nhap",
  SIGN_UP: "/dang-ky",
};

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
  },
  {
    _id: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "About",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Contact",
    link: "contact",
  },
];
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: imprimante1,
    productName: "imprimante",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "202",
    img: imprimante2,
    productName: "imprimante",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "203",
    img: imprimante4,
    productName: "imprimante",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "204",
    img: imprimante5,
    productName: "imprimante",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "205",
    img: imprimante6,
    productName: "imprimante",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "206",
    img: imprimante7,
    productName: "imprimante",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "207",
    img: imprimante8,
    productName: "imprimante",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "208",
    img: imprimante9,
    productName: "imprimante",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "imprimante",
  },
  {
    _id: "209",
    img: encre1,
    productName: "encre",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "ancre",
  },
  {
    _id: "210",
    img: encre2,
    productName: "encre",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "ancre",
  },
  {
    _id: "211",
    img: encre3,
    productName: "encre",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "ancre",
  },
  {
    _id: "212",
    img: encre4,
    productName: "encre",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "ancre",
  },
  {
    _id: "213",
    img: ruban1,
    productName: "Ruban",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "214",
    img: ruban2,
    productName: "Ruban",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "215",
    img: ruban3,
    productName: "Ruban",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "216",
    img: ruban4,
    productName: "Ruban",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "217",
    img: bac1,
    productName: "Bac de dechet",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
  {
    _id: "219",
    img: bac2,
    productName: "Bac de dechet",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
  {
    _id: "220",
    img: bac3,
    productName: "Bac de dechet",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
  {
    _id: "221",
    img: bac4,
    productName: "Bac de dechet",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
];
// =================== Special Offer data End here ==============

// =================== PaginationItems Start here ===============

export const paginationItems = [
  {
    _id: "201",
    img: IMPRIMANTE_PANTUM_CP2200DW,
    productName: "Imprimante PANTUM CP2200DW",
    price: "35.00",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser PANTUM Couleur - Fonctions: Impression  - Technologie d'impression: Laser - Format Papier: A4 - Vitesse d’impression(Couleur/N&B): 24 ppm (A4) / 26 ppm (Lettre) - Résolution d'impression: 600 x 600 dpi - Sortie papier: 100 page - Mémoire: Double cœur, 1 GHz - Impression recto verso: Automatique - Heure de la première impression: Moins de 11s  - Connecteurs: USB 2.0 haut débit Ethernet 10/100/1000 BaseTX (RJ-45) 802.11b/g/n Sans fil - Dimensions: 411.2 x 394.1 x 243.7mm - Poids: 16,1 kg - Couleur: Blanc",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "Technology ", value: "Electrophotographic monochrome laser " },
      { label: "Print speed ", value: "22 ppm (A4)/23 ppm (Letter)" },

      { label: "First print out time ", value: "Less than 7.8s       " },
      { label: "Maximum Monthly Duty Cycle", value: "15,000 pages " },
      {
        label: "Recommended monthly volume Resolution(dpi) ",
        value: "700 pages ",
      },
      { label: "Printer language Duplex Mode ", value: "Max. 1,200×1,200 " },
      { label: "Printer  ", value: "Max. 1,2   " },
      { label: "galass  ", value: "Max. 1,2   " },
    ],
  },
  {
    _id: "202",
    img: IMPRIMANTE_PANTUM_BM5100FDW,
    productName: "IMPRIMANTE PANTUM BM5100FDW",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Pantum BM5100fdw Imprimante laser mono : Pantum BM5100fdw -Imprimante :laser -monochrome multifonction,:format A4-,4-en-1 avec fonctions impression, copie, numérisation et fax, vitesse d'impression de 40ppm, connexion Réseau :LAN RJ45-, Wifichrome multifonction, format A4, 4-en-1 avec fonctions impression, copie, numérisation et fax, vitesse d'impression de 40ppm, connexion Réseau LAN RJ45, Wifi",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "Vitesse d'impression ", value: "40ppm(A4)/42ppm(lettre) " },
      { label: "Temps de sortie de la première page ", value: "≤6.9 s" },

      {
        label: "Nombre de pages mensuel recommandé",
        value: "750 à 4,000 Pages",
      },
      { label: "Résolution d'impression", value: "Max.1,200x1,200 dpi" },
      {
        label: "Langage d'impression ",
        value: "PCL5e, PCL6, PS        ",
      },
      { label: "Vitesse du processeur", value: "1.2 GHz" },
      { label: "Mémoire", value: "512 MB" },
      {
        label: "Panneau de commande ",
        value: "LCD 2 lignes ||  Écran tactile 3,5 pouces      ",
      },
      { label: "Impression recto-verso automatique      ", value: "Oui" },
      {
        label: "Autres fonctions d'impression      ",
        value:
          "Impression brochure, impression sécurisée, impression disque USB Compatible AirPrint, Mopria, APP mobile (APP iOS/App Android)",
      },
      { label: "Vitese de copie ", value: "40ppm(A4)/42ppm(lettre)" },
      {
        label: "Temps de sortie de la première page",
        value: "Plateau : moins de 10 s ADF : moins de 11 s",
      },
    ],
  },

  {
    _id: "203",
    img: IMPRIMANTE_PANTUM_BP5100DN,
    productName: "IMPRIMANTE PANTUM BP5100DN",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Monochrome Laser PANTUM BP5100DN : Fonctions Impression - :Capacité Bac à papier 250 pages - :Formats papier -: A4 - Technologie d’impression Laser Monochrome - :Vitesse d’impression Noir & Blanc Jusqu’à 40 pages par minute en A4 -: Résolution 1200 dpi -: Mémoire 512 Mo - Connectivité Ethernet, USB 2.0 -:Auto-Duplex-, Network-Ready : Impression silencieuse - faible encombrement et respectueux de l'environnement -: cartouches à haut rendement en option - processeur haute vitesse 1,2 GHz - Dimensions: 364 x 344 x 257 mm - Poids: 9.3 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "Vitesse d'impression ", value: "40ppm(A4)/42ppm(lettre) " },
      { label: "Temps de sortie de la première page ", value: "≤6.9 s" },

      {
        label: "Nombre de pages mensuel recommandé",
        value: "750 à 4,000 Pages",
      },
      { label: "Résolution d'impression", value: "Max.1,200x1,200 dpi" },
      {
        label: "Langage d'impression ",
        value: "PCL5e, PCL6, PS        ",
      },
      { label: "Vitesse du processeur", value: "1.2 GHz" },
      { label: "Mémoire", value: "512 MB" },
      {
        label: "Panneau de commande ",
        value: "LCD 2 lignes ||  Écran tactile 3,5 pouces      ",
      },
      { label: "Impression recto-verso automatique      ", value: "Oui" },
      {
        label: "Autres fonctions d'impression      ",
        value:
          "Impression brochure, impression sécurisée, impression disque USB Compatible AirPrint, Mopria, APP mobile (APP iOS/App Android)",
      },
      { label: "Vitese de copie ", value: "40ppm(A4)/42ppm(lettre)" },
      {
        label: "Temps de sortie de la première page",
        value: "Plateau : moins de 10 s ADF : moins de 11 s",
      },
    ],
  },
  {
    _id: "2005",
    img: IMPRIMANTE_PANTUM_M6609N,
    productName: "IMPRIMANTE PANTUM M6559N",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser 3en1 à toner rechargeable PANTUM M6559N - Capacité d'impression Jusqu'à 1600 pages - Vitesse d’impression : 22 ppm (A4) / 23 ppm (Lettre) - Résolution (impression, copie et numérisation) : 1200×1200dpi - Heure de la première impression : Moins de 7.8s - Connectivité : USB 2.0 haute vitesse - Vitesse de copie : 22cpm (A4) / 23cpm (Lettre) - Capacité du chargeur automatique de documents : 35 pages - Entrée papier : 150 pages - Sortie papier : 100 pages - Dimensions : 417 x 305 x 301 mm - Poids : 8.5 kg - Garantie 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "gtin	", value: "M6559N      " },
      { label: "Marque	", value: "PANTUM      " },
      { label: "fonctions	", value: "Monofonction      " },
      { label: "Technologie d impression		", value: "Laser      " },
      { label: "Impression	", value: "Noir & Blanc      " },
      { label: "Vitesse du Processeur		", value: "600MHz      " },
      {
        label: "Capacité papier		",
        value: "Capacité standard: 1 600 pages      ",
      },
      { label: "Gestion d entrée Papier Standard		", value: "150 pages      " },
      { label: "Premiére Page Imprimée		", value: "Moins de 7.8s      " },
      { label: "Cycle d utilisation Mensuel		", value: "15 000 pages      " },
      {
        label: "Résolution d impression		",
        value: "Max. 1 200 × 1 200 ppp      ",
      },
      {
        label: "Résolution d'impression Noir		",
        value: "Max. 1 200 × 1 200 ppp      ",
      },
      { label: "formats		", value: "A4      " },
      { label: "Sortie papier		", value: "100 pages      " },
      {
        label: "Vitesse de Copie Noir Blanc		",
        value: "22 ppm (A4) / 23 ppm (Lettre)      ",
      },
      { label: "Poids		", value: "4,75 kg      " },
    ],
  },

  {
    _id: "20005",
    img: IMPRIMANTE_PANTUM_M6559N,
    productName: "IMPRIMANTE PANTUM M6559N",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser 3en1 à toner rechargeable PANTUM M6559N - Capacité d'impression Jusqu'à 1600 pages - Vitesse d’impression : 22 ppm (A4) / 23 ppm (Lettre) - Résolution (impression, copie et numérisation) : 1200×1200dpi - Heure de la première impression : Moins de 7.8s - Connectivité : USB 2.0 haute vitesse - Vitesse de copie : 22cpm (A4) / 23cpm (Lettre) - Capacité du chargeur automatique de documents : 35 pages - Entrée papier : 150 pages - Sortie papier : 100 pages - Dimensions : 417 x 305 x 301 mm - Poids : 8.5 kg - Garantie 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "gtin	", value: "M6559N      " },
      { label: "Marque	", value: "PANTUM      " },
      { label: "fonctions	", value: "Monofonction      " },
      { label: "Technologie d impression		", value: "Laser      " },
      { label: "Impression	", value: "Noir & Blanc      " },
      { label: "Vitesse du Processeur		", value: "600MHz      " },
      {
        label: "Capacité papier		",
        value: "Capacité standard: 1 600 pages      ",
      },
      { label: "Gestion d entrée Papier Standard		", value: "150 pages      " },
      { label: "Premiére Page Imprimée		", value: "Moins de 7.8s      " },
      { label: "Cycle d utilisation Mensuel		", value: "15 000 pages      " },
      {
        label: "Résolution d impression		",
        value: "Max. 1 200 × 1 200 ppp      ",
      },
      {
        label: "Résolution d'impression Noir		",
        value: "Max. 1 200 × 1 200 ppp      ",
      },
      { label: "formats		", value: "A4      " },
      { label: "Sortie papier		", value: "100 pages      " },
      {
        label: "Vitesse de Copie Noir Blanc		",
        value: "22 ppm (A4) / 23 ppm (Lettre)      ",
      },
      { label: "Poids		", value: "4,75 kg      " },
    ],
  },

  {
    _id: "206",
    img: IMPRIMANTE_PANTUM_P3300DN,
    productName: "IMPRIMANTE PANTUM P3300DN",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser PANTUM P3300DN - Fonctions: Impression - Technologie d'impression: Laser - Format Papier: A4-A5 - Vitesse d’impression: 33 ppm (A4) / 35 ppm (Lettre) - Résolution d'impression: Jusqu'à 1200 x 1200 ppp - Papier Bac d'alimentation: 250 pages - Sortie papier: 150 page - Mémoire: 256 Mo - Impression recto verso: Automatique - Heure de la première impression: Moins de 8.2s  - Taille du support: A4, A5, JIS B5, IS0 B5, A6, Lettre, Légal, Exécutif, Folio, Oficio, Déclaration, Carte postale japonaise, ZL, Big 16K, Big 32K, 16K, 32K, B6， Yougata4, Carte postale, Younaga3, Nagagata3, Yougata2 - Connecteurs: USB2.0 haut débit / Ethernet：IEEE 802.3 10/100Base-Tx - Dimensions: 354 x 334 x 232mm - Poids: 6,8 kg - Couleur: Blanc",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "gtin	", value: "P3300DN      " },
      { label: "fonctions	", value: "Monofonction      " },
      { label: "Mémoire	", value: "256MO      " },
      { label: "Technologie d impression		", value: "laser      " },
      { label: "Impression		", value: "Noir & Blanc      " },
      { label: "Connectivite		", value: "Réseau      " },
      { label: "Vitesse du Processeur		", value: "350 MHz      " },
      { label: "Type ecran		", value: "LCD 2 lignes      " },
      {
        label: "Consommation d énergie		",
        value:
          "Impression : 525 W en moyenne Veille : 50 W en veille : moins de 2 W      ",
      },
      {
        label: "Gestion d entrée Papier Standard		",
        value: "Papier Bac d'alimentation: 250pages      ",
      },
      { label: "Premiére Page Imprimée		", value: "Moins de 8,2 secondes      " },
      {
        label: "Vitesse d impression Noir		",
        value: "33 ppm (A4) / 35 ppm (Lettre)      ",
      },
      { label: "Cycle d utilisation Mensuel		", value: "60000pages      " },
      {
        label: "Résolution d impression		",
        value: "1 200 x 1 200 dpi (maximum)      ",
      },
      { label: "formats	", value: "A4      " },
      {
        label: "Connecteurs		",
        value: "USB2.0 haut débit / Ethernet：IEEE 802.3 10/100Base-Tx      ",
      },
      { label: "Fonctionnalités		", value: "Impression      " },
      {
        label: "Volume de Pages Mensuel Recommandé		",
        value: "750 à 3 500 pages      ",
      },
      { label: "Dimensions		", value: "354 x 334 x 232mm      " },
      { label: "Garantie	", value: "1ANS      " },
    ],
  },

  {
    _id: "207",
    img: IMPRIMANTE_PANTUM_P3300DW,
    productName: "IMPRIMANTE PANTUM P3300DW",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser PANTUM P3300DW - Fonctions: Impression - Technologie d'impression: Laser - Format Papier: A4-A5 - Vitesse d’impression: 33 ppm (A4) / 35 ppm (Lettre) - Résolution d'impression: Jusqu'à 1200 x 1200 ppp - Papier Bac d'alimentation: 250 pages - Sortie papier: 150 page - Mémoire: 256 Mo - Impression recto verso: Automatique - Heure de la première impression: Moins de 8.2s - Interface: Ethernet USB 2.0 haut débit : Wi-Fi IEEE 802.3 10/100Base-Tx : IEEE 802.11b/g/n - Connecteurs: USB ; WIFI - Dimensions: 354 x 334 x 232mm - Poids: 6,8 kg - Couleur: Blanc",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "gtin		", value: "P3300DW      " },
      { label: "fonctions	", value: "Monofonction      " },
      { label: "Mémoire	", value: "256 Mo      " },
      { label: "Technologie d impression		", value: "Laser      " },
      { label: "Connectivite	", value: "WIFI      " },
      { label: "Vitesse du Processeur		", value: "350 MHz      " },
      { label: "Type ecran		", value: "LCD 2 lignes      " },
      {
        label: "Consommation d énergie		",
        value:
          "Impression : 525 W en moyenne Veille : 50 W en veille : moins de 2 W      ",
      },
      {
        label: "Gestion d entrée Papier Standard		",
        value: "Papier Bac d'alimentation: 250pages      ",
      },
      { label: "Premiére Page Imprimée		", value: "Moins de 8,2 secondes      " },
      {
        label: "Vitesse d impression Noir		",
        value: "33 ppm (A4) / 35 ppm (Lettre)      ",
      },
      { label: "Cycle d utilisation Mensuel		", value: "60000pages      " },
      { label: "Résolution d impression		", value: "Max.1200x1200 dpi      " },
      {
        label: "Volume de Pages Mensuel Recommandé		",
        value: "750 à 3 500 pages      ",
      },
      {
        label: "Interface Réseau	",
        value:
          "Ethernet USB 2.0 haut débit : Wi-Fi IEEE 802.3 10/100Base-Tx : IEEE 802.11b/g/n      ",
      },
      {
        label: "Contenu de L'emballage		",
        value:
          "Imprimante - Cordon d’alimentation - Câble d’interface USB - Plateau de sortie - CD-ROM - Guide de configuration rapide      ",
      },
      { label: "Garantie	", value: "1 ANS      " },
    ],
  },

  {
    _id: "208",
    img: IMPRIMANTE_PANTUM_P2509W,
    productName: "IMPRIMANTE PANTUM P2509W",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser PANTUM P2509W - Fonctions: Impression - Technologie d'impression: Laser - Format Papier: A4 - Vitesse d’impression: 22 ppm (A4) / 23 ppm (Lettre) - Résolution d'impression: Jusqu'à 1200 x 1200 ppp - Entrée papier: de 150 feuilles - Sortie papier: 100 page - Mémoire: 128 Mo - Impression recto verso: Manuel - Heure de la première impression: Moins de 7.8s - Taille du support: A4, A5, A6, JIS B5, ISO B5, B6, Lettre, Légal, Exécutif, Déclaration, Enveloppe Monarch, Enveloppe DL, enveloppe C5, enveloppe C6, enveloppe NO.10, carte postale japonaise, Folio, Oficio, Grand 16k, 32k, 16k, Grand 32k, ZL,Yougata4, Carte postale, Younaga3, Nagagata3, Yougata2 - Toner rechargeable - Connecteurs: USB 2.0 ; Wi-Fi - Dimensions: 337 x 220 x 178 mm - Poids: 4,75 kg - Couleur: Blanc.",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "gtin	", value: "P2509W      " },
      { label: "fonctions	", value: "Monofonction      " },
      { label: "Technologie d impression		", value: "Laser      " },
      { label: "Ecran Tactile		", value: "Non      " },
      { label: "Connectivite	", value: "WiFi      " },
      { label: "Vitesse du Processeur		", value: "600MHz      " },
      {
        label: "Capacité papier		",
        value: "Capacité standard: 1 600 pages      ",
      },
      { label: "Premiére Page Imprimée		", value: "Moins de 7.8s      " },
      { label: "Cycle d utilisation Mensuel		", value: "15 000 pages      " },
      {
        label: "Résolution d impression		",
        value: "Max. 1 200 × 1 200 ppp      ",
      },
      { label: "formats	", value: "A4      " },
      { label: "Connecteurs		", value: "USB 2.0, Wi-Fi      " },
      {
        label: "Vitesse de Copie Noir Blanc		",
        value: "22 ppm (A4) / 23 ppm (Lettre)      ",
      },
      {
        label: "Contenu de L'emballage		",
        value:
          "Imprimante - Cordon d’alimentation - Câble d’interface USB - Plateau de sortie - CD-ROM - Guide de configuration rapide      ",
      },
      { label: "Dimensions		", value: "337 x 220 x 178 mm      " },
    ],
  },
  {
    _id: "233",
    img: IMPRIMANTE_PANTUM_P2509,
    productName: "IMPRIMANTE PANTUM P2509",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser PANTUM P2509 - Fonctions Impression - Capacité d'impression Jusqu'à :1600 pages - Formats papier: A4 - Technologie d’impression Laser Monochrome - Vitesse d’impression Noir & Blanc: Jusqu’à 22 pages par minute en A4 - Résolution: 1200 dpi - Mémoire: 128 Mo - Connectivité: USB 2.0 - Dimensions: 337 x 220 x 178 mm - Poids: 4.75 kg - Toner recheargeable - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [],
  },
  {
    _id: "220",
    img: bac3,
    productName: "Bac de dechet",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
  {
    _id: "221",
    img: bac4,
    productName: "Bac de dechet",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
  {
    _id: "215",
    img: ruban3,
    productName: "Ruban",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "216",
    img: ruban4,
    productName: "Ruban",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "209",
    img: encre1,
    productName: "encre",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Encre",
  },
  {
    _id: "210",
    img: encre2,
    productName: "encre",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Encre",
  },

  {
    _id: "211",
    img: encre3,
    productName: "encre",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Encre",
  },
  {
    _id: "212",
    img: encre4,
    productName: "encre",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Encre",
  },
  {
    _id: "213",
    img: ruban1,
    productName: "Ruban",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },
  {
    _id: "214",
    img: ruban2,
    productName: "Ruban",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Ruban",
  },

  {
    _id: "217",
    img: bac1,
    productName: "Bac de dechet",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },
  {
    _id: "219",
    img: bac2,
    productName: "Bac de dechet",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    cat: "Bac",
  },

  // =================== imprimante hp =================

  {
    _id: "hp1",
    img: hp1,
    productName:
      "IMPRIMANTE HP JET D'ENCRE HP SMART TANK 516 COULEUR MFP 3EN1 A4 WIFI",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Hp",
    des: "Desc : Imprimante Jet D'encre HP SMART TANK 516 3en1 Couleur 3YW70A - Fonction: Impression, Copie, Numérisation - Technologie d'impression: jet d'encre - Vitesse d'impression Noir : Jusqu'à 22 ppm - Vitesse d’impression Couleur : Jusqu'à 16 ppm - Résolution d'impression Couleur : 1200x1200dpi - Format Papier : A4 - Capacité Papier : 100 feuilles -  Cycle d'utilisation (mensuel, A4) : Jusqu'à 1000pages - Connectivité: USB 2.0 haute vitesse, Wi-Fi, Bluetooth LE -  Dimensions: 447 x 373 x 158 mm - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "3YW70A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Ecran", value: "LCD" },
      {
        label: "Taille de L écran cm",
        value: "Affichage LCD 7 segments + icône 5,08 cm (2 pouces)",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Technologie d impression", value: "Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Impression", value: "Couleur" },
      { label: "formats", value: "A4" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 22 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 16 ppm" },
      { label: "FAX", value: "Non" },
      { label: "Mémoire", value: "256 Mo" },
      {
        label: "Qualité d impression Noir",
        value: "Jusqu'à 1 200 x 1 200 ppp",
      },
      {
        label: "Qualité d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 ppp",
      },
      { label: "Résolution d impression Couleur", value: "1200x1200dpi" },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Connectivite", value: "USB 2.0, WiFi" },
      { label: "Capacité papier", value: "100 feuilles" },
      { label: "Cycle d utilisation Mensuel", value: "Jusqu'à 1000 pages" },
      {
        label: "Consommation électrique",
        value:
          "0,12 Watts (Arrêt manuel), 3,12 Watts (Prêt), 0,75 Watt (Veille) 5",
      },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "Imprimante HP Smart Tank 516, Bouteilles d'encre: 3 x HP GT53XL (noir), 3 x HP GT52 (cyan, magenta et jaune), Notice de précaution pour l'encre; Fiche pour le ré-emballage et réglementaire RoH-EAC; Cordon d'alimentation, Guide d'installation; Notice PT",
      },
      { label: "Poids", value: "5,14 kg" },
      { label: "Dimensions", value: "447 x 373 x 158 mm" },
      { label: "Couleur", value: "Noir et Bleu" },
      { label: "Garantie", value: "1 an" },
    ],
  },

  {
    _id: "hp2",
    img: hp2,
    productName: "IMPRIMANTE HP INK TANK WIRELESS 415 ALL-IN-ONE",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Hp",
    des: "Desc : Imprimante Multifonction Jet d'encre 3 en 1 à réservoir intégré - Impression, numérisation, copie, sans fil - Résolution d'impression: Jusqu'à 4800 x 1200 dpi - Vitesse d'impression Couleur Jusqu'à 15 ppm -Vitesse d'impression N et B Jusqu'à 18 ppm - Résolution du scanner: 1200 x 1200 dpi - Format A4 - Interface USB - Bac d'alimentation de 60 feuilles - Dimensions: 525 x 310 x 158 mm - Garantie 1 an (+ Extension de Garantie 2 Ans ) + 5 Bouteilles",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [],
  },

  {
    _id: "hp3",
    img: hp3,
    productName: "IMPRIMANTE HP INK TANK WIRELESS 415 ALL-IN-ONE",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Hp",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },
  // =================== imprimante ricoh =================
  {
    _id: "ricoh1",
    img: ricoh1,
    productName: "IMPRIMANTE RICOH P501",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },

  {
    _id: "ricoh2",
    img: ricoh2,
    productName: "IMPRIMANTE RICOH SP3710DN",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },
  {
    _id: "ricoh3",
    img: ricoh3,
    productName: "IMPRIMANTE RICOH SP4520DN",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },
  {
    _id: "ricoh4",
    img: ricoh4,
    productName: "IMPRIMANTE RICOH COULEUR LASER SPC840",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },
  {
    _id: "ricoh5",
    img: ricoh5,
    productName: "IMPRIMANTE RICOH SP4510DN (407313)",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },

  // =================== imprimante ricoh =================

  {
    _id: "espson1",
    img: espson1,
    productName: "IMPRIMANTE EPSON L3251 3EN1 A4 WIFI",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Epson",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },

  {
    _id: "espson2",
    img: espson2,
    productName: "IMPRIMANTE EPSON JET D'ENCRE L3156 COULEUR A4  WIFI",
    price: "450",
    color: "Blanc",
    badge: true,
    brand: "Epson",
    des: "Imprimante à Réservoir intégré HP Ink Tank 315 - Fonctions: Impression, copier, Numérisation - Format Papier: A4 - Technologie d'impression: jet d'encre thermique HP - Vitesse d'impression: Jusqu'à 19 ppm (Noir), Jusqu'à 15 ppm (couleur) - Résolution d'impression: 1200 x 1200 dpi(couleur), 4800 x 1200 dpi(noir) - Vitesse de copie(A4, ISO): 6,5 cpm Noir; 2 cpm Couleur - Vitesse de numérisation A4: Jusqu'à 21 secondes - Impression recto verso Manuelle - Formats de fichiers pour la numérisation: JPEG, TIFF, PDF, BMP, PNG - Vitesse du processeur: 360 MHz - Connectivité: USB  - Dimensions: 525 x 310 x 158 mm - Poids: 4,67 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: pdf1,
    ficheTech: [
      { label: "DISPONIBILITÉ", value: "En stock" },
      { label: "gtin", value: "Z4B04A" },
      { label: "Marque", value: "HP" },
      { label: "Destockage", value: "Non" },
      { label: "Technologie d impression", value: "Multifonction Jet d'encre" },
      { label: "fonctions", value: "Multifonction" },
      { label: "Impression", value: "Couleur" },
      { label: "Mémoire", value: "Non" },
      { label: "FAX", value: "Non" },
      { label: "Fonctionnalités", value: "Impression, Copie, Numérisation" },
      { label: "Chargement de Documents", value: "Oui" },
      { label: "Connecteurs", value: "1 port USB 2.0 haut débit" },
      { label: "Vitesse du Processeur", value: "360 MHz" },
      {
        label: "Impression sans bordure",
        value: "Oui, jusqu’à 210 x 297 mm (A4)",
      },
      { label: "Vitesse d impression Noir", value: "Jusqu'à 19 ppm" },
      { label: "Vitesse d impression Couleur", value: "Jusqu'à 15 ppm" },
      {
        label: "Résolution d'impression Noir",
        value: "Jusqu'à 1 200 x 1 200 DPI",
      },
      {
        label: "Résolution d impression Couleur",
        value: "Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      {
        label: "Résolution d impression",
        value:
          "Jusqu'à 1 200 x 1 200 DPI (noir), Jusqu'à 4 800 x 1 200 DPI (couleur)",
      },
      { label: "Type de Scanner", value: "Scanner à Plat" },
      { label: "Vitesse de numérisation", value: "Jusqu'à 21 secondes" },
      { label: "Résolution de Numérisation", value: "Jusqu'à 1200 x 1200 ppp" },
      {
        label: "Résolution de numérisation optimisée",
        value: "Jusqu’à 1200 ppp",
      },
      { label: "Recto/Verso", value: "Manuel" },
      { label: "Connectivite", value: "USB" },
      { label: "formats", value: "A4" },
      {
        label: "Premiére Page Imprimée",
        value:
          "Noir: (A4, prêt) Vitesse : 14 s - Couleur (A4, prêt) Vitesse : 18 s",
      },
      {
        label: "Alimentation-courant",
        value:
          "Tension d'entrée : 220 à 240 V CA (+/- 10 %), 50/60 Hz (+/- 3 Hz)",
      },
      {
        label: "Type de Papier pris en charge",
        value:
          "Papier ordinaire, papiers photo HP, papier mat pour brochure HP ou papier professionnel HP, papier mat pour présentation HP, papier brillant pour brochure HP ou papier professionnel HP, papiers photo jet d'encre, papiers mats jet d'encre, papiers brillant",
      },
      {
        label: "Consommation électrique",
        value:
          "10 W maximum, 0,07 W (Arrêt), 2,1 W (Veille), 0,88 W (Veille prolongée)",
      },
      {
        label: "Cycle d utilisation Mensuel",
        value: "A4: Jusqu'à 1 000 pages - Lettre: Jusqu'à 1 000 pages",
      },
      {
        label: "Alimentation papier standard",
        value:
          "Bac d'alimentation de 60 feuilles - Bac de sortie de 25 feuilles",
      },
      { label: "Ecran Tactile", value: "Non" },
      { label: "Type ecran", value: "7 segments et icône LCD" },
      {
        label: "Volume de Pages Mensuel Recommandé",
        value: "400 à 800 (Jusqu'à 1000 pages)",
      },
      { label: "Interfaces standard", value: "1x port USB 2.0 haut débit" },
      { label: "Résolution optique", value: "Jusqu'à 1200 x 1200 ppp" },
      { label: "Grammage", value: "75 g/m²" },
      {
        label: "Contenu de L'emballage",
        value:
          "HP Ink Tank 315 , cartouche d'encre noire HP GT51 (90CC), cartouche d'encre cyan HP GT52 (70CC), cartouche d'encre magenta HP GT52 (70CC), cartouche d'encre jaune HP GT52 (70CC)",
      },
      { label: "Poids", value: "4,67 kg" },
      { label: "Couleur", value: "Noir" },
      { label: "Dimensions", value: "525 x 310 x 158 mm" },
      { label: "Garantie", value: "1 an" },
    ],
  },
];
