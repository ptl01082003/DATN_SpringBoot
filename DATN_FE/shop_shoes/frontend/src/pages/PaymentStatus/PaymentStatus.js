import React from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();

  const renderUIByStatus = (status) => {
    switch (status) {
      case "cash":
        return (
          <>
            <iframe
              width={400}
              height={400}
              src="https://lottie.host/embed/0829a8c1-0487-4649-b21c-84c4a23521c0/cDhKAXcD0O.json"
            />
            <h1 className="text-xl mt-10 font-bold">
              Bạn đã đặt đơn hàng thành công
            </h1>
          </>
        );
      case "success":
        return (
          <>
            <iframe
              width={400}
              height={400}
              src="https://lottie.host/embed/a6124f74-f58b-4d5d-8523-3033b17fc014/3ZIkuvXxGw.json"
            />
            <h1 className="text-xl font-bold">
              Bạn đã thanh toán đơn hàng thành công
            </h1>
          </>
        );
    }
  };

  return (
    <div className="my-10 flex flex-col items-center">
      {renderUIByStatus(searchParams.get("type"))}
    </div>
  );
}
