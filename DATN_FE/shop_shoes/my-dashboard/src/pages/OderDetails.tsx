
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Empty, Image, Input, Modal, Rate, Tabs, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AxiosRequest from "../../src/networks/AxiosRequest";
import {
  KEY_STORAGE,
  ODER_STATUS,
  ODER_STATUS_STRING,
  TRANSFER_PRICE,
  URL_IMAGE,
} from "../../src/constants";

const desc = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];

const { TextArea } = Input;

// Define interfaces for props and review data
interface DeliveredOrdersProps {
  orders: {
    productId: string;
    orderItemId: string;
    productDetailId: string;
    isReview: boolean;
  };
  setShouldRender: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ReviewData {
  stars?: number;
  contents?: string;
  gallery?: string[];
}

const DeliveredOrders: React.FC<DeliveredOrdersProps> = ({
  orders,
  setShouldRender,
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const reviewData = useRef<ReviewData>({});

  const getBase64 = (file: any) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: any) => {
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

  const handleChange = ({ fileList: newFileList }: { fileList: any[] }) => {
    setFileList(newFileList);
  };

  const createNewReviewer = async () => {
    reviewData.current.gallery = fileList.map((file) =>
      file.response ? file.response.data[0] : file.name
    );

    try {
      const newReview = await AxiosRequest.post<any>("/orders/create-review", {
        ...reviewData.current,
        productId: orders.productId,
        orderItemId: orders.orderItemId,
        productDetailId: orders.productDetailId,
      });

      if (newReview.data.code === 0) {
        setReviewModal(false);
        reviewData.current = {};
        setFileList([]);
        setShouldRender((prev) => !prev);
      } else {
        console.error("Failed to create review");
      }
    } catch (error) {
      console.error("Error creating review", error);
    }
  };

  const updateOrderStatus = async () => {
    try {
      const response = await AxiosRequest.post<any>("/orders/update-status", {
        orderItemId: orders.orderItemId,
        newStatus: ODER_STATUS.CHO_GIAO_HANG,
      });

      if (response.status === 200) {
        setShouldRender((prev) => !prev);
        console.log("Order status updated successfully");
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <>
      {!orders.isReview && (
        <button
          onClick={() => setReviewModal(true)}
          className="flex space-x-3 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              fill="#000"
            />
          </svg>
          <span>Đánh giá</span>
        </button>
      )}

      <Modal
        destroyOnClose={true}
        title=""
        open={reviewModal}
        onCancel={() => setReviewModal(false)}
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
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              fill="#000"
            />
          </svg>
          <span>Gửi</span>
        </button>
      </Modal>
      <button
        onClick={updateOrderStatus}
        className="flex space-x-2 mt-8 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            fill="#000"
          />
        </svg>
        <span>Xác nhận</span>
      </button>
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

interface Order {
  productId: string;
  orderItemId: string;
  productDetailId: string;
  isReview: boolean;
  path: string;
  name: string;
  amount: number;
  priceDiscount: number;
  price: number;
  quanity: number;
  sizeName: string;
}

export default function OrderDetails() {
  const [lstOrders, setLstOrders] = useState<Order[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>(
    ODER_STATUS.CHO_XAC_NHAN
  );
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(KEY_STORAGE.TOKEN); // Lấy token từ localStorage
        const url = `/orders/lst-orders?status=${encodeURIComponent(
          orderStatus
        )}`;

        const response = await AxiosRequest.post(url, null, {
          headers: {
            Authorization: `Bearer ${token}`, // Gắn token vào header
          },
        });

        if (Array.isArray(response)) {
          setLstOrders(response);
        } else {
          console.error("Invalid response structure", response);
          setLstOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    })();
  }, [orderStatus, shouldRender]);

  const onChange = (status: string) => {
    setOrderStatus(status);
  };

  const updateOrderStatus = async (orderItemId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN); // Lấy token từ localStorage

      const response = await AxiosRequest.post(
        `/orders/update-status?status=${encodeURIComponent(
          newStatus
        )}&orderItemId=${encodeURIComponent(orderItemId)}`,
        {}, // Không cần gửi body cho yêu cầu này
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gắn token vào header
          },
        }
      );

      if (response.status === 200) {
        console.log("Order status updated successfully");
        setShouldRender(!shouldRender); // Trigger re-render
      } else {
        console.error("Failed to update order status:", response);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderActionByOrderStatus = (order: Order) => {
    switch (orderStatus) {
      case ODER_STATUS.CHO_XAC_NHAN:
        return (
          <button
            onClick={() =>
              updateOrderStatus(order.orderItemId, ODER_STATUS.CHO_LAY_HANG)
            }
            className="flex space-x-2 mt-8 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
          >
            <span>Xác nhận</span>
          </button>
        );
      case ODER_STATUS.CHO_LAY_HANG:
        return (
          <button
            onClick={() =>
              updateOrderStatus(order.orderItemId, ODER_STATUS.CHO_GIAO_HANG)
            }
            className="flex space-x-2 mt-8 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
          >
            <span>Xác nhận</span>
          </button>
        );
      case ODER_STATUS.CHO_GIAO_HANG:
        return (
          <div className="flex space-x-4">
            <button
              onClick={() =>
                updateOrderStatus(order.orderItemId, ODER_STATUS.DA_GIAO)
              }
              className="flex space-x-2 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
            >
              <span>Đã giao</span>
            </button>
            <button
              onClick={() =>
                updateOrderStatus(order.orderItemId, ODER_STATUS.KHONG_THANH_CONG)
              }
              className="flex space-x-2 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
            >
              <span>Giao không thành công</span>
            </button>
          </div>
        );
      // case ODER_STATUS.DA_GIAO:
      //   return (
      //     <DeliveredOrders orders={order} setShouldRender={setShouldRender} />
      //   );
      case ODER_STATUS.KHONG_THANH_CONG:
        return (
          <button
            onClick={() =>
              updateOrderStatus(order.orderItemId, ODER_STATUS.NHAP_KHO)
            }
            className="flex space-x-2 mt-8 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
          >
            <span>Nhập lại vào kho</span>
          </button>
        );
        // case ODER_STATUS.NHAP_KHO:
        //   return (
        //     <button
        //       onClick={() =>
        //         updateOrderStatus(order.orderItemId, ODER_STATUS.NHAP_KHO)
        //       }
        //       className="flex space-x-2 mt-8 items-center px-5 hover:bg-slate-100 py-2 rounded-lg border border-[#344054]"
        //     >
        //     </button>
        //   ); 
        
      default:
        return null;
    }
  };
  

  const items = ODER_STATUS_STRING.map((status) => ({
    key: status.value,
    label: status.label,
    icon: status.icon,
    children: (
      <div className="flex-1 mt-6 space-y-8">
        {lstOrders.length > 0 ? (
          lstOrders.map((order) => (
            <div key={order.productId}>
              <div className="flex items-start gap-5">
                <div className="w-[120px] aspect-square flex-shrink-0">
                  <img
                    src={URL_IMAGE(order.path)}
                    className="object-cover w-full h-full rounded-xl"
                    alt={order.name}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <h1 className="flex-1 text-lg font-bold">{order.name}</h1>
                    <h1 className="flex-shrink-0 text-lg font-bold">
                      {TRANSFER_PRICE(order.amount)}
                    </h1>
                  </div>
                  {order.priceDiscount === order.price ? (
                    <h1 className="mb-2 text-xl">
                      <span>{order.quanity} x </span>
                      {TRANSFER_PRICE(order.price)}
                    </h1>
                  ) : (
                    <div className="flex items-center mb-2 space-x-4">
                      <h1 className="text-xl">
                        <span>{order.quanity} x </span>
                        {TRANSFER_PRICE(order.priceDiscount)}
                      </h1>
                      <h1 className="text-lg line-through">
                        {TRANSFER_PRICE(order.price)}
                      </h1>
                    </div>
                  )}
                  <h1 className="mb-4 text-xl">
                    Size: <span>{order.sizeName}</span>
                  </h1>
                </div>
              </div>
              <div className="flex justify-end w-full">
                {renderActionByOrderStatus(order)}
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








