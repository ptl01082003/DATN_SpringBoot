import { PlusOutlined } from "@ant-design/icons";
import { Divider, Empty, Image, Input, Modal, Rate, Tabs, Upload } from "antd";

import React, { useEffect, useRef, useState } from "react";
import {
  ODER_STATUS,
  ODER_STATUS_STRING,
  TRANSFER_PRICE,
  URL_IMAGE,
} from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";
import { toast } from "react-toastify";

const desc = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];

const { TextArea } = Input;

const DeliveredOrders = ({ orders, setShouldRender }) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const reviewData = useRef({});

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const createNewReviewer = async () => {
    reviewData.current.gallery = fileList.map((files) =>
      files.response ? files.response?.data?.[0] : files?.name
    );

    const newReview = await AxiosClient.post("/orders/create-review", {
      ...reviewData.current,
      productId: orders?.productId,
      orderItemId: orders?.orderItemId,
      productDetailId: orders?.productDetailId,
    });
    if (newReview.code == 0) {
      setReviewModal(false);
      reviewData.current = {};
      setFileList([]);
      setShouldRender((x) => !x);
    } else {
    }
  };

  return (
    <>
      {!orders?.isReview && (
        <button
          onClick={() => {
            setReviewModal(true);
          }}
          className="flex space-x-3 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.89509 15.5629L15.1445 9.31348M7.47122 5.12563L7.07062 4.9469C5.46119 4.22887 3.81481 5.87526 4.53284 7.48468L4.71156 7.88529C5.16052 8.89161 4.67301 10.0686 3.64397 10.4627L3.23432 10.6196C1.58856 11.2499 1.58856 13.5782 3.23432 14.2085L3.64397 14.3654C4.67301 14.7595 5.16052 15.9365 4.71156 16.9428L4.53284 17.3434C3.81481 18.9529 5.46119 20.5993 7.07062 19.8812L7.47123 19.7025C8.47755 19.2535 9.65451 19.7411 10.0486 20.7701L10.2055 21.1797C10.8358 22.8255 13.1642 22.8255 13.7945 21.1797L13.9514 20.7701C14.3455 19.7411 15.5225 19.2535 16.5288 19.7025L16.9294 19.8812C18.5388 20.5993 20.1852 18.9529 19.4672 17.3434L19.2884 16.9428C18.8395 15.9365 19.327 14.7595 20.356 14.3654L20.7657 14.2085C22.4114 13.5782 22.4114 11.2499 20.7657 10.6196L20.356 10.4627C19.327 10.0686 18.8395 8.89161 19.2884 7.88529L19.4672 7.48468C20.1852 5.87525 18.5388 4.22887 16.9294 4.9469L16.5288 5.12563C15.5225 5.57459 14.3455 5.08707 13.9514 4.05803L13.7945 3.64838C13.1642 2.00262 10.8358 2.00262 10.2055 3.64838L10.0486 4.05803C9.65451 5.08707 8.47754 5.57459 7.47122 5.12563ZM10.781 9.82947C10.781 10.5845 10.1689 11.1965 9.41394 11.1965C8.65893 11.1965 8.04687 10.5845 8.04688 9.82947C8.04688 9.07446 8.65893 8.4624 9.41394 8.4624C10.1689 8.4624 10.781 9.07446 10.781 9.82947ZM15.9998 15.0487C15.9998 15.8037 15.3877 16.4158 14.6327 16.4158C13.8777 16.4158 13.2656 15.8037 13.2656 15.0487C13.2656 14.2937 13.8777 13.6816 14.6327 13.6816C15.3877 13.6816 15.9998 14.2937 15.9998 15.0487Z"
              stroke="currentColor"
              stroke-width="null"
              stroke-linecap="round"
              class="my-path"
            ></path>
          </svg>
          <span>Đánh giá</span>
        </button>
      )}
      <Modal
        destroyOnClose={true}
        title=""
        open={reviewModal}
        onCancel={() => {
          setReviewModal(false);
        }}
        footer={false}
        centered
      >
        <div className="space-y-3">
          <div>
            <h1 className="mb-2 italic font-bold">Chất lượng sản phẩm:</h1>
            <Rate
              tooltips={desc}
              onChange={(value) => (reviewData.current.stars = value)}
            />
          </div>
          <div>
            <TextArea
              onChange={(e) => {
                reviewData.current.contents = e.target.value;
              }}
              placeholder="Nếu có thể hãy cho mình một nhận xét về sản phẩm bạn nhé"
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </div>
          <div>
            <h1 className="mb-2 italic font-bold">Hình ảnh review:</h1>
            <Upload
              action="http://localhost:5500/api/v1/uploads/multiple"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
        </div>
        <button
          onClick={createNewReviewer}
          className="flex space-x-2 mt-8 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4816 7.45885C15.7931 6.35499 17.4489 5.80306 18.323 6.67709C19.197 7.55112 18.6451 9.20691 17.5412 12.5185L15.8077 17.7189C14.5993 21.3442 13.9951 23.1568 12.7092 23.2878C11.4233 23.4188 10.4659 21.7653 8.5513 18.4582L8.34896 18.1087C8.08327 17.6497 7.95042 17.4203 7.7651 17.235C7.57977 17.0496 7.35031 16.9168 6.8914 16.6511L6.54189 16.4488C3.23479 14.5341 1.58124 13.5768 1.71224 12.2909C1.84324 11.005 3.65587 10.4007 7.28113 9.19233L12.4816 7.45885Z"
              stroke="currentColor"
              stroke-width="null"
              class="my-path"
            ></path>
            <path
              d="M11.5615 13.4385L7.81384 17.1861"
              stroke="currentColor"
              stroke-width="null"
              stroke-linecap="round"
              class="my-path"
            ></path>
          </svg>
          <span>Gửi</span>
        </button>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default function OderDetails() {
  const [lstOders, setLstOders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(ODER_STATUS.CHO_XAC_NHAN);
  const [shouldRender, setShouldRender] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Đổi từ `order` thành `selectedOrder` để rõ nghĩa hơn

  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosClient.post("/orders/lst-orders", {
          status: orderStatus,
        });
        setLstOders(response?.data || []);
      } catch (error) {
        toast.error(`Lỗi: ${error.message}`);
      }
    })();
  }, [orderStatus, shouldRender]);

  const onChange = async (status) => {
    setOrderStatus(status);
  };

  const sendInvoice = async (order) => {
    if (!order) {
      toast.error("Không có đơn hàng để xuất hóa đơn.");
      return;
    }

    try {
      const res = await AxiosClient.post(`/orders/generate-invoice`, {
        orderId: order.id,
      });

      if (res.code === 0) {
        const emailRes = await AxiosClient.post(`/orders/send-invoice-email`, {
          orderId: order.id,
        });
        if (emailRes.code === 0) {
          toast.success("Hóa đơn đã được gửi qua email!");
        } else {
          toast.error("Gửi hóa đơn qua email không thành công");
        }
      } else {
        toast.error("Tạo hóa đơn không thành công");
      }
    } catch (error) {
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  const orderRefund = async (order) => {
    try {
      const item = await AxiosClient.post("/payment-orders/refund", {
        orderItemId: order?.orderItemId,
      });
      if (item.code === 0) {
        setShouldRender(true);
      } else {
        toast.error(item?.message);
      }
    } catch (error) {
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  const handleOrderStatusChange = async (status) => {
    setOrderStatus(status);

    if (status === ODER_STATUS.CHO_LAY_HANG && selectedOrder) {
      await sendInvoice(selectedOrder);
    }
  };

  const renderActionByOrderStatus = (orders) => {
    switch (orderStatus) {
      case ODER_STATUS.DA_GIAO:
        return (
          <DeliveredOrders orders={orders} setShouldRender={setShouldRender} />
        );
      case ODER_STATUS.CHO_XAC_NHAN:
      case ODER_STATUS.CHO_LAY_HANG:
        return (
          <button
            onClick={() => {
              orderRefund(orders);
            }}
            className="min-w-[136px] py-3 rounded-lg bg-red-600 text-white font-bold"
          >
            HỦY
          </button>
        );
      default:
        return <></>;
    }
  };

  const items = ODER_STATUS_STRING.map((status) => ({
    key: status.value,
    label: status.label,
    icon: status.icon,
    children: (
      <div className="flex-1 mt-6 space-y-8">
        {Array.isArray(lstOders) && lstOders.length > 0 ? (
          lstOders.map((item) => (
            <div key={item.id}>
              <div className="flex items-start gap-5">
                <div className="w-[120px] aspect-square flex-shrink-0">
                  <img
                    src={URL_IMAGE(item?.path)}
                    className="object-cover w-full h-full rounded-xl"
                    alt={item?.name}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <h1 className="flex-1 text-lg font-bold">{item?.name}</h1>
                    <h1 className="flex-shrink-0 text-lg font-bold">
                      {TRANSFER_PRICE(item?.amount)}
                    </h1>
                  </div>
                  {item?.priceDiscount === item?.price ? (
                    <h1 className="mb-2 text-xl">
                      <span>{item?.quantity} x </span>
                      {TRANSFER_PRICE(item?.price)}
                    </h1>
                  ) : (
                    <div className="flex items-center mb-2 space-x-4">
                      <h1 className="text-xl">
                        <span>{item?.quantity} x </span>
                        {TRANSFER_PRICE(item?.priceDiscount)}
                      </h1>
                      <h1 className="text-lg line-through">
                        {TRANSFER_PRICE(item?.price)}
                      </h1>
                    </div>
                  )}
                  <h1 className="mb-4 text-xl">
                    Size: <span>{item?.sizeName}</span>
                  </h1>
                </div>
              </div>
              <div className="flex justify-end w-full">
                {renderActionByOrderStatus(item)}
              </div>
              <Divider />
            </div>
          ))
        ) : (
          <div className="min-h-[40vh] flex justify-center items-center">
            <Empty description="Không có dữ liệu" />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <>
      <Tabs
        className="custom-order-details-tabs"
        items={items}
        onChange={onChange}
      />
    </>
  );
}

// export default function OderDetails() {
//   const [lstOders, setLstOders] = useState();
//   const [orderStatus, setOrderStatus] = useState(ODER_STATUS.CHO_XAC_NHAN);
//   const [shouldRender, setShouldRender] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const lstOders = await AxiosClient.post("/orders/lst-orders", {
//         status: orderStatus,
//       });
//       setLstOders(lstOders?.data || []);
//     })();
//   }, [orderStatus, shouldRender]);

//   const onChange = async (status) => {
//     setOrderStatus(status);
//   };

//   const orderRefund = async (order) => {
//     const item = await AxiosClient.post("/payment-orders/refund", {
//       orderItemId: order?.orderItemId,
//     });
//     if (item.code == 0) {
//       setShouldRender(true);
//     } else {
//       toast.error(item?.message);
//     }
//   };

//   const renderActionByOrderStatus = (orders) => {
//     switch (orderStatus) {
//       case ODER_STATUS.DA_GIAO:
//         return (
//           <DeliveredOrders orders={orders} setShouldRender={setShouldRender} />
//         );
//       case ODER_STATUS.CHO_XAC_NHAN:
//       case ODER_STATUS.CHO_LAY_HANG:
//         return (
//           <button
//             onClick={() => {
//               orderRefund(orders);
//             }}
//             className="min-w-[136px] py-3 rounded-lg bg-red-600 text-white font-bold"
//           >
//             HỦY
//           </button>
//         );
//       default:
//         return <></>;
//     }
//   };

//   const items = ODER_STATUS_STRING.map((oders) => ({
//     key: oders.value,
//     label: oders.label,
//     icon: oders.icon,
//     children: (
//       <div className="flex-1 mt-6 space-y-8">
//         {Array.isArray(lstOders) && lstOders?.length > 0 ? (
//           lstOders?.map((items) => (
//             <div>
//               <div className="flex items-start gap-5">
//                 <div className="w-[120px] aspect-square flex-shrink-0">
//                   <img
//                     src={URL_IMAGE(items?.path)}
//                     className="object-cover w-full h-full rounded-xl"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-start gap-4 mb-4">
//                     <h1 className="flex-1 text-lg font-bold">{items?.name}</h1>
//                     <h1 className="flex-shrink-0 text-lg font-bold">
//                       {TRANSFER_PRICE(items?.amount)}
//                     </h1>
//                   </div>
//                   {items?.priceDiscount === items?.price ? (
//                     <h1 className="mb-2 text-xl">
//                       <span>{items?.quanity} x </span>
//                       {TRANSFER_PRICE(items?.price)}
//                     </h1>
//                   ) : (
//                     <div className="flex items-center mb-2 space-x-4">
//                       <h1 className="text-xl">
//                         <span>{items?.quanity} x </span>
//                         {TRANSFER_PRICE(items?.priceDiscount)}
//                       </h1>
//                       <h1 className="text-lg line-through">
//                         {TRANSFER_PRICE(items?.price)}
//                       </h1>
//                     </div>
//                   )}
//                   <h1 className="mb-4 text-xl">
//                     Size: <span>{items?.sizeName}</span>
//                   </h1>
//                 </div>
//               </div>
//               <div className="flex justify-end w-full">
//                 {renderActionByOrderStatus(items)}
//               </div>
//               <Divider />
//             </div>
//           ))
//         ) : (
//           <div className="min-h-[40vh] flex justify-center items-center">
//             <Empty description="Không có dữ liệu" />
//           </div>
//         )}
//       </div>
//     ),
//   }));

//   return (
//     <>
//       <Tabs
//         className="custom-order-details-tabs"
//         items={items}
//         onChange={onChange}
//       />
//     </>
//   );
// }
