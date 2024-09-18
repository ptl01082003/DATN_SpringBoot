import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Checkbox, Divider, Modal } from "antd";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";
import { changeCarts, selectCarts } from "../../redux/slices/cartsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format, parseISO, isValid } from "date-fns";

// Validation schema
const schema = yup
  .object({
    name: yup.string().required("Họ tên không được để trống"),
    address: yup
      .string()
      .min(10, "Địa chỉ tối thiểu 10 ký tự")
      .required("Địa chỉ không được để trống"),
    phone: yup
      .string()
      .matches(/^0\d{9}$/, "Số điện thoại gồm 10 chữ số, bắt đầu bằng số 0")
      .required("Số điện thoại không được để trống"),
  })
  .required();

const Oders = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selCarts = useSelector(selectCarts);
  const [provider, setProvider] = useState("MOMO");
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(selCarts.amount);

  // Update discounted amount when voucher changes
  useEffect(() => {
    setDiscountedAmount(
      calculateDiscountedAmount(selCarts.amount, selectedVoucher)
    );
  }, [selectedVoucher, selCarts.amount]);
  const formatDate = (dateString) => {
    try {
      console.log("Received dateString:", dateString); 
      if (!dateString) {
        return 'Ngày hết hạn không hợp lệ';
      }
  
      const parsedDate = parseISO(dateString);
  
      if (!isValid(parsedDate)) {
        return 'Ngày hết hạn không hợp lệ';
      }
  
      return format(parsedDate, 'dd/MM/yyyy HH:mm');
    } catch (error) {
      console.error("Date formatting error:", error);
      return 'Ngày hết hạn không hợp lệ';
    }
  };
  // Calculate discounted amount based on the selected voucher
  const calculateDiscountedAmount = (totalAmount, voucher) => {
    if (!voucher) return totalAmount;
    let discountAmount = 0;
    let discountValue = Number(voucher.voucher.discountValue);
    let amount = Number(totalAmount);
    if (voucher.voucher.typeValue === "PERCENT") {
      discountAmount = (amount * discountValue) / 100;
    }

    return Math.max(amount - discountAmount, 0);
  };

  // Fetch vouchers from the API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await AxiosClient.post("/vouchers/by-user");
        if (response?.data) {
          console.log("Received vouchers data:", response.data);
          setVouchers(response.data);
        } else {
          toast.error("Không thể tải danh sách voucher.");
        }
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
        toast.error("Có lỗi xảy ra khi tải danh sách voucher.");
      }
    };

    fetchVouchers();
  }, []);

  // Handle voucher selection
  const handleVoucherSelect = (voucher) => {
    const orderPrice = Number(voucher?.voucher?.valueOrder || 0);
    if (orderPrice > discountedAmount) {
      toast.error("Không đủ điều kiện sử dụng voucher");
      return;
    }
    setSelectedVoucher(voucher);
    setModalVisible(false);
  };

  // Handle order submission
  const handleOrderSubmit = async (params) => {
    try {
      const response = await AxiosClient.post("/payment-orders/create-order", {
        ...params,
        provider,
        voucherCode: selectedVoucher?.voucher?.code,
      });
      if (response?.code === 0) {
        if (response?.data) {
          window.location.replace(response.data);
        } else {
          dispatch(changeCarts({}));
          navigate("/payment?type=cash", { replace: true });
        }
      } else {
        toast.error("Có lỗi xảy ra khi tạo đơn hàng.");
      }
    } catch (error) {
      console.error("Failed to submit order:", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng.");
    }
  };

  return (
    <div className="px-4 mx-auto max-w-container py-[3%]">
      <Breadcrumbs title="Cart" />
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          {selCarts.cartItems?.map((items) => (
            <React.Fragment key={items.id}>
              <div className="flex items-start gap-5">
                <div className="w-[160px] aspect-square flex-shrink-0">
                  <img
                    src={URL_IMAGE(items?.path)}
                    alt={items?.name}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <h1 className="flex-1 text-xl font-bold">{items?.name}</h1>
                    <h1 className="flex-shrink-0 text-xl">
                      {TRANSFER_PRICE(items?.amount)}
                    </h1>
                  </div>
                  <h1 className="mb-4 text-xl">
                    Size: <span>{items?.sizeName}</span>
                  </h1>
                  <div className="flex items-center space-x-4">
                    <h1 className="mb-4 text-xl">
                      {TRANSFER_PRICE(items?.priceDiscount)}
                    </h1>
                    <h1 className="mb-4 text-xl">x {items?.quanity}</h1>
                  </div>
                  <h1 className="mb-5 italic">
                    Giá: <span>{TRANSFER_PRICE(items?.amount)}</span>
                  </h1>
                </div>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleOrderSubmit)}
          autoComplete="off"
        >
          <h1 className="text-lg font-bold text-center">Thông tin nhận hàng</h1>
          <div>
            <label className="block mb-2 text-sm text-gray-800">Họ tên</label>
            <div className="relative flex items-center">
              <input
                {...register("name")}
                type="text"
                placeholder="Nhập tại đây"
                className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                aria-invalid={errors.name ? "true" : "false"}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] absolute right-4"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {errors.name && (
              <p className="mt-2 text-sm italic text-red-600">
                {errors.name.message}
              </p>
            )}
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
                aria-invalid={errors.phone ? "true" : "false"}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] absolute right-4"
              >
                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  fillRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75h-8.25a.75.75 0 0 1-.75-.75V5.25Zm.75 13.125a.75.75 0 0 0 .75.75h8.25a.75.75 0 0 0 .75-.75v-1.5H8.25v1.5ZM12 16.5h3v1.5h-3v-1.5Zm-1.5-1.5h6v1.5h-6v-1.5Zm0 0H9v-1.5h1.5v1.5Zm-3-1.5v-1.5h1.5v1.5H6Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {errors.phone && (
              <p className="mt-2 text-sm italic text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-800">Địa chỉ</label>
            <div className="relative flex items-center">
              <input
                {...register("address")}
                type="text"
                placeholder="Nhập tại đây"
                className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                aria-invalid={errors.address ? "true" : "false"}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] absolute right-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.005 2.258a8.375 8.375 0 0 1 1.212 11.605L12 22.5l-5.987-8.637a8.375 8.375 0 0 1 1.212-11.605A8.375 8.375 0 0 1 12 1.5a8.375 8.375 0 0 1 4.005.758Zm-1.638 7.357a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0ZM12 3.25a6.75 6.75 0 0 0-4.7 11.337l.9 1.34.5.741L12 19.25l3.3-4.432.5-.741.9-1.34A6.75 6.75 0 0 0 12 3.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {errors.address && (
              <p className="mt-2 text-sm italic text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>
          <Divider />
          <div>
            <h1 className="mb-4 text-lg italic">
              Lựa chọn hình thức thanh toán
            </h1>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-[38px]">
                    <img
                      className="w-full"
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                      alt="Momo"
                    />
                  </div>
                  <h1>QR Momo</h1>
                </div>
                <Checkbox
                  value="MOMO"
                  checked={provider === "MOMO"}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-[38px]">
                    <img
                      className="w-full"
                      src="https://static.vecteezy.com/system/resources/previews/013/484/039/original/secure-payment-3d-icon-png.png"
                      alt="Cash on Delivery"
                    />
                  </div>
                  <h1>Thanh toán nhận hàng</h1>
                </div>
                <Checkbox
                  value="CASH"
                  checked={provider === "CASH"}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-bold">Chọn voucher:</h2>
            <button className="px-4 py-3 font-bold rounded-lg bg-orange-400 text-white" type="button" onClick={() => setModalVisible(true)}>
              Chọn voucher
            </button>
            {selectedVoucher && (
              <div>
                <h3 className="text-md font-semibold">Voucher đã chọn:</h3>
                <p>
                  {selectedVoucher.voucher.code} -{" "}
                  {selectedVoucher.voucher.description} -
                  {selectedVoucher.voucher.endDay
                    ? format(
                        parseISO(selectedVoucher.voucher.endDay),
                        "dd/MM/yyyy HH:mm"
                      )
                    : "Chưa có ngày hết hạn"}
                </p>
              </div>
            )}
            <Modal
              title="Chọn Voucher"
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              {vouchers.length > 0 ? (
                <div>
                  {vouchers.map((voucher) => (
                    <div
                      key={voucher.voucherId}
                      className="flex items-center justify-between mb-4"
                    >
                      <div>
                        <p>
                          {voucher.voucher.code} - {voucher.voucher.description}{" "}
                          
                        </p>
                        <p className="text-sm">
                          Giảm: {voucher.voucher.discountValue}{" "}
                          {voucher.voucher.typeValue === "PERCENT"
                            ? "%"
                            : "VND"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Ngày hết hạn: {formatDate(voucher.voucher.endDay)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleVoucherSelect(voucher)}
                      >
                        Chọn
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Không có voucher nào để chọn.</p>
              )}
            </Modal>
          </div>
          <div className="flex justify-between items-center mt-10 text-lg font-bold">
            <h2>Tổng tiền:</h2>
            <h1>{TRANSFER_PRICE(discountedAmount)}</h1>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 rounded-full text-center bg-[#3A4980] font-bold text-white"
          >
            THANH TOÁN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Oders;

// // src/pages/Oders.tsx
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Checkbox, Divider, Modal, Button } from "antd";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
// import AxiosClient from "../../networks/AxiosClient";
// import { changeCarts, selectCarts } from "../../redux/slices/cartsSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const schema = yup
//   .object({
//     name: yup.string().required("Họ tên không được để trống"),
//     address: yup
//       .string()
//       .min(10, "Địa chỉ tối thiểu 10 ký tự")
//       .required("Địa chỉ không được để trống"),
//     phone: yup
//       .string()
//       .matches(/^0\d{9}$/, "Số điện thoại gồm 10 chữ số, bắt đầu bằng số 0")
//       .required("Số điện thoại không được để trống"),
//   })
//   .required();

// const Oders = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const dispatch = useDispatch();
//   const navigation = useNavigate();
//   const selCarts = useSelector(selectCarts);
//   const [provider, setProvider] = useState("MOMO");
//   const [vouchers, setVouchers] = useState([]);
//   const [selectedVoucher, setSelectedVoucher] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [discountedAmount, setDiscountedAmount] = useState(selCarts.amount);

//   useEffect(() => {
//     setDiscountedAmount(
//       calculateDiscountedAmount(selCarts.amount, selectedVoucher)
//     );
//   }, [selectedVoucher, selCarts.amount]);

//   const calculateDiscountedAmount = (totalAmount, voucher) => {
//     if (!voucher) return totalAmount;
//     let discountAmount = 0;
//     let discountValue = Number(voucher.voucher.discountValue);
//     let amount = Number(totalAmount);
//     if (voucher.voucher.typeValue === "PERCENT") {
//       discountAmount = (amount * discountValue) / 100;
//     } else if (voucher.voucher.typeValue === "MONEY") {
//       discountAmount = discountValue;
//     }

//     return Math.max(amount - discountAmount, 0);
//   };

//   useEffect(() => {
//     const fetchVouchers = async () => {
//       try {
//         const response = await AxiosClient.post("/vouchers/by-user");
//         if (response?.data) {
//           setVouchers(response.data);
//         } else {
//           toast.error("Không thể tải danh sách voucher.");
//         }
//       } catch (error) {
//         console.error("Failed to fetch vouchers:", error);
//         toast.error("Có lỗi xảy ra khi tải danh sách voucher.");
//       }
//     };

//     fetchVouchers();
//   }, []);

//   const handleVoucherSelect = (voucher) => {
//     const orderPrice = Number(voucher?.voucher?.valueOrder || 0);
//     if (orderPrice > discountedAmount) {
//       toast.error("Không đủ điều kiện sử dụng voucher");
//       return;
//     } else {
//       calculateDiscountedAmount(voucher?.voucher?.discountValue || 0, voucher);
//     }
//     setSelectedVoucher(voucher);
//     setModalVisible(false);
//   };

//   console.log(errors);
//   const handleOrderSubmit = async (params) => {
//     const response = await AxiosClient.post("/payment-orders/create-order", {
//       ...params,
//       provider,
//       voucherCode: selectedVoucher?.voucher?.code,
//     });
//     if (response?.code === 0) {
//       if (response?.data) {
//         window.location.replace(response.data);
//       } else {
//         dispatch(changeCarts({}));
//         navigation("/payment?type=cash", { replace: true });
//       }
//     } else {
//       toast.error("Có lỗi xảy ra khi tạo đơn hàng.");
//     }
//   };

//   return (
//     <div className="px-4 mx-auto max-w-container py-[3%]">
//       <Breadcrumbs title="Cart" />
//       <div className="grid grid-cols-3 gap-10">
//         <div className="col-span-2 space-y-8">
//           {selCarts.cartItems?.map((items) => (
//             <React.Fragment key={items.id}>
//               <div className="flex items-start gap-5">
//                 <div className="w-[160px] aspect-square flex-shrink-0">
//                   <img
//                     src={URL_IMAGE(items?.path)}
//                     className="object-cover w-full h-full rounded-xl"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-start gap-4 mb-4">
//                     <h1 className="flex-1 text-xl font-bold">{items?.name}</h1>
//                     <h1 className="flex-shrink-0 text-xl">
//                       {TRANSFER_PRICE(items?.amount)}
//                     </h1>
//                   </div>
//                   <h1 className="mb-4 text-xl">
//                     Size: <span>{items?.sizeName}</span>
//                   </h1>
//                   <div className="flex items-center space-x-4">
//                     <h1 className="mb-4 text-xl">
//                       {TRANSFER_PRICE(items?.priceDiscount)}
//                     </h1>
//                     <h1 className="mb-4 text-xl">x {items?.quanity}</h1>
//                   </div>
//                   <h1 className="mb-5 italic">
//                     Giá: <span> {TRANSFER_PRICE(items?.amount)}</span>
//                   </h1>
//                 </div>
//               </div>
//               <Divider />
//             </React.Fragment>
//           ))}
//         </div>
//         <form
//           className="space-y-4"
//           onSubmit={handleSubmit(handleOrderSubmit)}
//           autoComplete="false"
//         >
//           <h1 className="text-lg font-bold text-center">Thông tin nhận hàng</h1>
//           <div>
//             <label className="block mb-2 text-sm text-gray-800">Họ tên</label>
//             <div className="relative flex items-center">
//               <input
//                 {...register("name")}
//                 type="text"
//                 placeholder="Nhập tại đây"
//                 className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-[18px] h-[18px] absolute right-4"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <p className="mt-2 text-sm italic text-red-600">
//               {errors.name?.message}
//             </p>
//           </div>
//           <div>
//             <label className="block mb-2 text-sm text-gray-800">
//               Số điện thoại
//             </label>
//             <div className="relative flex items-center">
//               <input
//                 {...register("phone")}
//                 type="text"
//                 placeholder="Nhập tại đây"
//                 className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-[18px] h-[18px] absolute right-4"
//               >
//                 <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
//                 <path
//                   fillRule="evenodd"
//                   d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75h-8.25a.75.75 0 0 1-.75-.75V5.25Zm.75 13.125a.75.75 0 0 0 .75.75h8.25a.75.75 0 0 0 .75-.75v-1.5H8.25v1.5ZM12 16.5h3v1.5h-3v-1.5Zm-1.5-1.5h6v1.5h-6v-1.5Zm0 0H9v-1.5h1.5v1.5Zm-3-1.5v-1.5h1.5v1.5H6Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <p className="mt-2 text-sm italic text-red-600">
//               {errors.phone?.message}
//             </p>
//           </div>
//           <div>
//             <label className="block mb-2 text-sm text-gray-800">Địa chỉ</label>
//             <div className="relative flex items-center">
//               <input
//                 {...register("address")}
//                 type="text"
//                 placeholder="Nhập tại đây"
//                 className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-[18px] h-[18px] absolute right-4"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.005 2.258a8.375 8.375 0 0 1 1.212 11.605L12 22.5l-5.987-8.637a8.375 8.375 0 0 1 1.212-11.605A8.375 8.375 0 0 1 12 1.5a8.375 8.375 0 0 1 4.005.758Zm-1.638 7.357a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0ZM12 3.25a6.75 6.75 0 0 0-4.7 11.337l.9 1.34.5.741L12 19.25l3.3-4.432.5-.741.9-1.34A6.75 6.75 0 0 0 12 3.25Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <p className="mt-2 text-sm italic text-red-600">
//               {errors.address?.message}
//             </p>
//           </div>
//           <Divider />
//           <div>
//             <h1 className="mb-4 text-lg italic">
//               Lựa chọn hình thức thanh toán
//             </h1>
//             <div className="space-y-5">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-[38px]">
//                     <img
//                       className="w-full"
//                       src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
//                     />
//                   </div>
//                   <h1>QR Momo</h1>
//                 </div>
//                 <Checkbox
//                   value={"MOMO"}
//                   checked={provider === "MOMO"}
//                   onChange={(e) => setProvider(e.target.value)}
//                 />
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-[38px]">
//                     <img
//                       className="w-full"
//                       src="https://static.vecteezy.com/system/resources/previews/013/484/039/original/secure-payment-3d-icon-png.png"
//                     />
//                   </div>
//                   <h1>Thanh toánnhận hàng</h1>
//                 </div>
//                 <Checkbox
//                   value={"CASH"}
//                   checked={provider === "CASH"}
//                   onChange={(e) => setProvider(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col space-y-4">
//             <h2 className="text-lg font-bold">Chọn voucher:</h2>
//             <Button type="button" onClick={() => setModalVisible(true)}>
//               Chọn voucher
//             </Button>
//             {selectedVoucher && (
//               <div>
//                 <h3 className="text-md font-semibold">Voucher đã chọn:</h3>
//                 <p>
//                   {selectedVoucher.voucher.code} -{" "}
//                   {selectedVoucher.voucher.description}
//                 </p>
//               </div>
//             )}
//             <Modal
//               title="Chọn Voucher"
//               visible={modalVisible}
//               onCancel={() => setModalVisible(false)}
//               footer={null}
//             >
//               {vouchers.length > 0 ? (
//                 <div>
//                   {vouchers.map((voucher) => (
//                     <div
//                       key={voucher.voucherId}
//                       className="flex items-center justify-between mb-4"
//                     >
//                       <div>
//                         <p>
//                           {voucher.voucher.code} - {voucher.voucher.description}
//                         </p>

//                         <p className="text-sm">
//                           Giảm: {voucher.voucher.discountValue}{" "}
//                           {voucher.voucher.typeValue === "PERCENT"
//                             ? "%"
//                             : "VND"}
//                         </p>
//                       </div>
//                       <Button
//                         type="button"
//                         onClick={() => handleVoucherSelect(voucher)}
//                       >
//                         Chọn
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>Không có voucher nào để chọn.</p>
//               )}
//             </Modal>
//           </div>
//           <div className="flex justify-between items-center mt-10 text-lg font-bold">
//             <h2>Tổng tiền:</h2>
//             <h1>{TRANSFER_PRICE(discountedAmount)}</h1>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-5 py-3 rounded-full tex-center bg-[#3A4980] font-bold text-white"
//           >
//             THANH TOÁN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Oders;
