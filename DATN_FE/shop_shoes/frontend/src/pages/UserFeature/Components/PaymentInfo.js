import { Collapse, Divider, Empty } from "antd";
import React, { useEffect, useState } from "react";
import {
  PAYMENT_STATUS,
  PAYMENT_STATUS_COLOR,
  TRANSFER_PRICE,
  URL_IMAGE,
} from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";

export default function PaymentInfo() {
  const [lstPayments, setLstPayments] = useState();

  useEffect(() => {
    (async () => {
      const oders = await AxiosClient.post("/payment-orders/lst-payments");
      setLstPayments(oders?.data || []);
    })();
  }, []);

  const repayment = async (orderCode) => {
    const response = await AxiosClient.post("/payment-orders/repayment", {
      orderCode,
    });
    if (response.code === 0) {
      window.location.replace(response.data);
    } else {
    }
  };

  return (
    <div className="space-y-6">
      {Array.isArray(lstPayments) && lstPayments?.length > 0 ? (
        lstPayments?.map((oders) => (
          <>
            <div
              style={{ borderColor: PAYMENT_STATUS_COLOR[oders?.status] }}
              className="px-5 py-4 rounded-xl border"
            >
              <div className="flex justify-between mb-3">
                <h1 className="text-xl">
                  Đơn hàng:{" "}
                  <span className="font-bold">{oders?.orderCode}</span>
                </h1>
                <div>
                  <h1
                    style={{ color: PAYMENT_STATUS_COLOR[oders?.status] }}
                    className="text-lg font-bold"
                  >
                    {PAYMENT_STATUS[oders?.status]}
                  </h1>
                </div>
              </div>
              <h1>
                Hình thức thanh toán: <span>{oders?.provider}</span>
              </h1>
              {oders?.status === "IDLE" && (
                <button
                  onClick={() => {
                    repayment(oders?.orderCode);
                  }}
                  className="border border-[#f4a200] text-[#f4a200] font-bold rounded-lg px-4 py-2 mt-4 text-sm"
                >
                  THANH TOÁN
                </button>
              )}
              <div className="mt-5 mb-2">
                <Collapse
                  items={[
                    {
                      label: "Thông tin người nhận",
                      children: (
                        <div className="space-y-4">
                          <h1 className="flex items-center gap-4">
                            <svg
                              width="25px"
                              height="25px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                stroke="black"
                                stroke-width="null"
                                class="my-path"
                              ></path>
                              <path
                                d="M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z"
                                stroke="black"
                                stroke-width="null"
                                class="my-path"
                              ></path>
                            </svg>
                            <h1>{oders?.name}</h1>
                          </h1>
                          <h1 className="flex items-center gap-4">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 8H4H5M3 12H5M5 12V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V7C19 5.11438 19 4.17157 18.4142 3.58579C17.8284 3 16.8856 3 15 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V12ZM3 16H5M15 16V15.4799C15 14.5331 14.2325 13.7656 13.2857 13.7656H10.7143C9.76751 13.7656 9 14.5331 9 15.4799V16M21 8V10M21 14V16M13.5 9.5C13.5 10.3284 12.8284 11 12 11C11.1716 11 10.5 10.3284 10.5 9.5C10.5 8.67157 11.1716 8 12 8C12.8284 8 13.5 8.67157 13.5 9.5Z"
                                stroke="black"
                                stroke-width="null"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="my-path"
                              ></path>
                            </svg>
                            <h1>{oders?.phone}</h1>
                          </h1>
                          <h1 className="flex items-center gap-4">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 8C3 6.11438 3 5.17157 3.58579 4.58579C4.17157 4 5.11438 4 7 4H10C11.8856 4 12.8284 4 13.4142 4.58579C14 5.17157 14 6.11438 14 8V15H7C5.11438 15 4.17157 15 3.58579 14.4142C3 13.8284 3 12.8856 3 11V8Z"
                                stroke="black"
                                stroke-width="null"
                                class="my-path"
                              ></path>
                              <path
                                d="M9 17.5C9 18.8807 7.88071 20 6.5 20C5.11929 20 4 18.8807 4 17.5C4 16.1193 5.11929 15 6.5 15C7.88071 15 9 16.1193 9 17.5Z"
                                stroke="black"
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
                                stroke="black"
                                stroke-width="null"
                                class="my-path"
                              ></path>
                              <path
                                d="M17.5 12L17.5 10"
                                stroke="black"
                                stroke-width="null"
                                stroke-linecap="round"
                                class="my-path"
                              ></path>
                            </svg>
                            <h1>{oders?.address}</h1>
                          </h1>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              <div className="mt-5 mb-2">
                <Collapse
                  items={[
                    {
                      key: "products",
                      label: "Sản phẩm",
                      children: (
                        <div className="flex-1 space-y-8">
                          {oders.orderItems.map((items) => (
                            <>
                              <div className="flex items-start gap-5">
                                <div className="w-[120px] aspect-square flex-shrink-0">
                                  <img
                                    src={URL_IMAGE(items?.path)}
                                    className="object-cover w-full h-full rounded-xl"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start gap-4 mb-4">
                                    <h1 className="flex-1 text-lg font-bold">
                                      {items?.name}
                                    </h1>
                                    <h1 className="flex-shrink-0 text-lg font-bold">
                                      {TRANSFER_PRICE(items?.amount)}
                                    </h1>
                                  </div>
                                  {items?.priceDiscount === items?.price ? (
                                    <h1 className="mb-2 text-xl">
                                      <span>{items?.quanity} x </span>
                                      {TRANSFER_PRICE(items?.price)}
                                    </h1>
                                  ) : (
                                    <div className="flex mb-2 space-x-4 items-center">
                                      <h1 className="text-xl">
                                        <span>{items?.quanity} x </span>
                                        {TRANSFER_PRICE(items?.priceDiscount)}
                                      </h1>
                                      <h1 className="text-lg line-through">
                                        {TRANSFER_PRICE(items?.price)}
                                      </h1>
                                    </div>
                                  )}
                                  <h1 className="mb-4 text-xl">
                                    Size: <span>{items?.sizeName}</span>
                                  </h1>
                                </div>
                              </div>
                              <Divider />
                            </>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              <Divider />
              <h1 className="mb-2 text-left">
                Số lượng: <span className="font-bold">{oders?.totals}</span>
              </h1>
              <h1 className="text-left">
                Tổng:
                <span className="font-bold">
                  {TRANSFER_PRICE(oders?.amount)}
                </span>
              </h1>
            </div>
            <Divider />
          </>
        ))
      ) : (
        <div className="min-h-[40vh] flex justify-center items-center">
          <Empty description="Không có dữ liệu" />
        </div>
      )}
    </div>
  );
}
