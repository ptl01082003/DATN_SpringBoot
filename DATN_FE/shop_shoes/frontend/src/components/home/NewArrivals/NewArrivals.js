import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import AxiosClient from "../../../networks/AxiosClient"; // Đảm bảo đã cài đặt AxiosClient đúng cách
import { newArrOne } from "../../../assets/images";
import { TRANSFER_PRICE, URL_IMAGE } from "../../../constants";

const NewArrivals = () => {
  const [data, setData] = useState({
    products: [],
    brands: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosClient.post("/products"); // Thay đổi endpoint tùy theo API của bạn
        if (response && response.code === 0) {
          setData((prevState) => ({ ...prevState, products: response.data }));
        } else {
          console.error("Error fetching new arrivals:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await AxiosClient.get("/brands"); // Thay đổi endpoint tùy theo API của bạn
        if (response && response.code === 0) {
          setData((prevState) => ({ ...prevState, brands: response.data }));
        } else {
          console.error("Error fetching brands:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchProducts();
    fetchBrands();
  }, []);

  const getBrandName = (brandId) => {
    const brand = data.brands.find((b) => b.brandId === brandId);
    return brand ? brand.name : "Unknown Brand";
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {data.products.map((product) => (
          <div key={product.productId} className="px-2">
            <Product
              _id={product.productId}
              img={URL_IMAGE(product?.gallery?.[0]?.path)} // Thay đổi tùy thuộc vào cách bạn lưu trữ URL hình ảnh
              productName={product.name}
              price={TRANSFER_PRICE(product.price)}
              color={getBrandName(product.brandId)}
              // badge={product.badge}
              // des={product.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
