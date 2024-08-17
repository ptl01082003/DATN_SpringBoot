import {
  Carousel,
  Divider,
  Empty,
  InputNumber,
  Rate,
  Tabs,
  Watermark,
} from "antd";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";
import { changeCarts } from "../../redux/slices/cartsSlice";
import { selectUserInfo } from "../../redux/slices/usersSlice";
import moment from "moment";
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-50 bottom-[5%] right-[5%] w-[9%] h-[9%] cursor-pointer flex justify-center items-center rounded-xl bg-[#EDF0F8]"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.43805 5.42987C8.75047 5.11745 9.257 5.11745 9.56942 5.42987L15.5697 11.4301C15.7197 11.5801 15.804 11.7836 15.804 11.9958C15.804 12.208 15.7197 12.4115 15.5697 12.5615L9.56588 18.5653C9.25346 18.8777 8.74693 18.8777 8.43451 18.5653C8.12209 18.2529 8.12209 17.7463 8.43451 17.4339L13.8726 11.9958L8.43805 6.56124C8.12563 6.24882 8.12563 5.74229 8.43805 5.42987Z"
          fill="black"
          class="my-path"
        ></path>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-50 bottom-[5%] right-[16%] w-[9%] h-[9%] cursor-pointer flex justify-center items-center rounded-xl bg-[#EDF0F8]"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.5692 5.43012C15.8816 5.74253 15.8816 6.24907 15.5692 6.56149L10.1311 11.9996L15.5656 17.4341C15.8781 17.7466 15.8781 18.2531 15.5656 18.5655C15.2532 18.8779 14.7467 18.8779 14.4343 18.5655L8.43402 12.5653C8.28399 12.4152 8.19971 12.2118 8.19971 11.9996C8.19971 11.7874 8.28399 11.5839 8.43402 11.4339L14.4378 5.43012C14.7502 5.1177 15.2568 5.1177 15.5692 5.43012Z"
          fill="black"
          class="my-path"
        ></path>
      </svg>
    </div>
  );
}

export default function ProductDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const selUserInfo = useSelector(selectUserInfo);

  let sliderRef2 = useRef(null);
  let sliderRef1 = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const { code } = useParams();
  const [products, setProducts] = useState({});
  const [counterSize, setCounterSize] = useState(1);
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    (async () => {
      const response = await AxiosClient.post("/products/product-details", {
        code,
      });
      setCurrentSize(response?.data?.sizes?.[0] || {});
      setProducts(response?.data || {});
    })();
  }, []);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const selectSize = (size) => {
    setCurrentSize(size);
  };

  const addProductsToCart = async () => {
    const newCarts = await AxiosClient.post("/carts/create", {
      quanity: counterSize,
      productDetailId: currentSize?.productDetailId,
    });
    if (newCarts?.code === 0) {
      setCounterSize(newCarts.data?.quanity || 1);
      dispatch(changeCarts(newCarts.data?.carts));
    } else {
      toast.error(newCarts?.messsage);
    }
  };

  const averageRating = useMemo(
    () =>
      (products?.reviewers?.reduce(
        (value, review) => value + review?.stars,
        0
      ) || 0) / (products?.reviewers?.length || 1),
    [products]
  );

  return (
    <div className="container mx-auto my-10">
      <div className="flex gap-6">
        <div className="w-[550px]">
          <Slider
            arrows={true}
            asNavFor={nav2}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {products?.gallery?.map((images) => (
              <div className="px-2">
                <div className="aspect-square w-full overflow-hidden rounded-xl cursor-pointer">
                  <img
                    src={URL_IMAGE(images?.path)}
                    className="w-full h-full object-cover rounded-xl transition-all duration-200 ease-out hover:scale-150"
                  />
                </div>
              </div>
            ))}
          </Slider>
          <div className="mt-2">
            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              arrows={false}
              focusOnSelect={true}
            >
              {products?.gallery?.map((images) => (
                <div className="px-2">
                  <div className="aspect-square w-full overflow-hidden rounded-xl cursor-pointer">
                    <img
                      src={URL_IMAGE(images?.path)}
                      className="w-full h-full object-cover rounded-xl transition-all duration-200 ease-out hover:scale-150"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div class="flex-1">
          <h1 className="mb-3 text-4xl font-bold">
            <span>{products?.name}</span>
          </h1>
          <h3 className="text-lg">
            <span>{TRANSFER_PRICE(products?.price)}</span>
          </h3>
          <Divider />
          <h3 className="mb-2">Chọn sizes:</h3>
          <div className="flex flex-wrap gap-4 mb-5">
            {products?.sizes?.map((size) => (
              <div
                key={size?.sizeId}
                onClick={() => {
                  setCounterSize(1);
                  selectSize(size);
                }}
                className={clsx(
                  "px-4 py-3 cursor-pointer rounded-lg  text-center w-[85px]",
                  {
                    "bg-[#cad7fb]":
                      currentSize?.productDetailId == size?.productDetailId,
                    "bg-[#F3F3F3]":
                      currentSize?.productDetailId != size?.productDetailId,
                  }
                )}
              >
                <h3
                  className={clsx("text-lg font-bold", {
                    "text-[#3A4980]":
                      currentSize?.productDetailId == size?.productDetailId,
                    "text-[#726C6C]":
                      currentSize?.productDetailId != size?.productDetailId,
                  })}
                >
                  {size?.sizes?.name}
                </h3>
              </div>
            ))}
          </div>
          <h3 className="mb-5 italic">
            Số lượng: <span>{currentSize?.quantity}</span>
          </h3>
          <InputNumber
            min={1}
            defaultValue={1}
            value={counterSize}
            max={currentSize?.quantity}
            onChange={(counter) => setCounterSize(counter)}
          />
          <Divider />
          <button
            onClick={addProductsToCart}
            className="w-[260px] px-5 py-3 rounded-full tex-center bg-[#eef2fe] font-bold text-[#6b63e9]"
          >
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Mô tả",
            children: (
              <div
                className="view-product-details"
                dangerouslySetInnerHTML={{ __html: products?.description }}
              />
            ),
          },
          {
            key: "2",
            label: "Đánh giá",
            children: (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-x-5 bg-[#fffbeb] p-8 rounded-xl">
                  <h1 className="font-manrope font-bold text-5xl text-amber-400 mb-6">
                    {averageRating == 0 ? 0 : averageRating.toFixed(1)}
                  </h1>
                  <Rate
                    style={{ color: "#fbbf24", fontSize: 25 }}
                    allowHalf
                    value={averageRating}
                  />
                  <h1 className="mt-5 font-medium text-xl leading-8 text-gray-900 text-center">
                    {products?.reviewers?.length || 0} đánh giá
                  </h1>
                </div>
                <Divider />
                {Array.isArray(products?.reviewers) &&
                products?.reviewers?.length != 0 ? (
                  products?.reviewers?.map((review) => {
                    return (
                      <div>
                        <div className="flex justify-between items-center">
                          <Rate
                            value={review?.stars}
                            style={{ color: "#fbbf24", fontSize: 24 }}
                          />
                          <div className="flex items-center space-x-3">
                            <h1 className="font-semibold text-lg leading-8 text-black">
                              {review?.user?.fullName}
                            </h1>
                            <h1 className="font-medium text-base leading-7 text-gray-400">
                              {moment(review?.createdAt).format(
                                "HH:mm DD/MM/YYYY"
                              )}
                            </h1>
                          </div>
                        </div>
                        <h1 className="mb-5 mt-2 text-base italic">{review?.contents}</h1>
                        <div className="w-[30%]">
                          <Carousel arrows infinite={true} autoplay={true}>
                            {review?.reviewerPhoto?.map((photo) => (
                              <Watermark content={products?.name}>
                                <div className="aspect-video bg-slate-100">
                                  <img
                                    src={URL_IMAGE(photo?.path)}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              </Watermark>
                            ))}
                          </Carousel>
                        </div>
                        <Divider />
                      </div>
                    );
                  })
                ) : (
                  <div className="min-h-[40vh] flex justify-center items-center">
                    <Empty description="Chưa có review sản phẩm" />
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
