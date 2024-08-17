import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-50 bottom-[5%] right-[2%] w-[2.6%] h-[7%] cursor-pointer flex justify-center items-center rounded-xl bg-[#EDF0F8]"
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
      className="absolute z-50 bottom-[5%] right-[5.3%] w-[2.6%] h-[7%] cursor-pointer flex justify-center items-center rounded-xl bg-[#EDF0F8]"
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

const Home = () => {
  const navigation = useNavigate();
  const [lstProducts, setLstProducts] = useState();

  useEffect(() => {
    (async () => {
      const products = await AxiosClient.post("/products/lst-products");
      setLstProducts(products?.data || []);
    })();
  }, []);

  const goToProductDetails = (products) => {
    navigation(`/product/${products?.code}`);
  };

  return (
    <div className="bg-[#1f1f21] px-[4%]">
      <div className="mb-10">
        <Slider
          arrows={true}
          slidesToShow={1}
          autoplay={true}
          autoplaySpeed={1500}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          <div className="w-full aspect-[3]">
            <img
              className="w-full h-full object-cover"
              src="https://file.hstatic.net/200000642007/file/1920x640_f3fc87c077684b3782a0a793403bbf65.jpg"
            />
          </div>
          <div className="w-full aspect-[3]">
            <img
              className="w-full h-full object-cover"
              src="https://file.hstatic.net/200000642007/file/desktop-1920x640_690adfdae05f4db8a2b7ca47d95f236d.jpg"
            />
          </div>
          <div className="w-full aspect-[3]">
            <img
              className="w-full h-full object-cover"
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1444,c_limit/097d1ab5-aed3-4a3e-a87a-2bc7941a3e37/nike-just-do-it.jpg"
            />
          </div>
        </Slider>
      </div>

      <h1 className="mb-6 text-3xl font-bold text-white">HÀNG MỚI VỀ</h1>
      <Slider
        className="custom-slider"
        arrows={false}
        slidesToShow={5}
        autoplay={true}
        autoplaySpeed={2000}
      >
        {lstProducts?.map((product) => (
          <div className="cursor-pointer" onMouseUp={() => goToProductDetails(product)}>
            <div className="">
              <div className="w-full aspect-[97/120] mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={URL_IMAGE(product?.gallery?.[0]?.path)}
                />
              </div>
              <h3 className="text-white mb-1 text-lg min-h-[3.5rem] line-clamp-2">
                {product?.name}
              </h3>
              <h3 className="text-white">{TRANSFER_PRICE(product?.price)}</h3>
            </div>
          </div>
        ))}
      </Slider>
      <div className="w-full aspect-[807/410] relative mt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-full"
            src="https://file.hstatic.net/200000642007/file/1614x820_76ccb179b274411685d3d1fbeab117ed.jpg"
          />
        </div>
        <div className="w-[58%] absolute h-full top-0 right-0 overflow-hidden flex flex-col justify-center">
          <h1 className="mb-5 text-3xl font-bold text-black">HÀNG BÁN CHẠY</h1>
          <Slider
            className="custom-slider"
            arrows={false}
            slidesToShow={3}
            autoplay={true}
            autoplaySpeed={2000}
          >
            {lstProducts?.map((product, idx) => (
              <div className="cursor-pointer" onMouseUp={() => goToProductDetails(product)}>
                <div className="bg-[#ffffff] text-black relative">
                  <div className="w-full aspect-[97/120] mb-4">
                    <img
                      className="w-full h-full object-cover"
                      src={URL_IMAGE(product?.gallery?.[0]?.path)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className=" mb-1 text-lg min-h-[3.5rem] line-clamp-2">
                      {product?.name}
                    </h3>
                    <h3 className="">{TRANSFER_PRICE(product?.price)}</h3>
                  </div>
                  <div className="absolute w-[32px] top-0 left-0">
                    <img
                      className="w-full"
                      src="https://file.hstatic.net/200000642007/file/bg_rank_c21e90ddb3c74242970a777d424a1ae5.png"
                    />
                    <h1 className="text-center absolute top-[10%] right-1/2 text-white font-bold translate-x-1/2">
                      {idx + 1}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
