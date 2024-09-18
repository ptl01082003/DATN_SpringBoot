// // import React, { useEffect, useState } from "react";
// // import AxiosClient from "../../networks/AxiosClient";
// // import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
// // import { useNavigate } from "react-router-dom";
// // import { Divider } from "antd";

// // export default function Shop() {
// //   const navigation = useNavigate();
// //   const [lstProducts, setLstProducts] = useState();
// //   const [lstFilterRaw, setFilterRaw] = useState({});
// //   const [filterParams, setFilterParams] = useState({});
// //   const [isFetchLstProducts, setFetchLstProducts] = useState(false);

// //   const goToProductDetails = (products) => {
// //     navigation(`/product/${products?.code}`);
// //   };

// //   useEffect(() => {
// //     (async () => {
// //       setFetchLstProducts(true);
// //       const products = await AxiosClient.post(
// //         "/products/lst-products",
// //         filterParams
// //       );
// //       setTimeout(() => {
// //         setFetchLstProducts(false);
// //         setLstProducts(products?.data || []);
// //       }, 200);
// //     })();
// //   }, [filterParams]);

// //   useEffect(() => {
// //     (async () => {
// //       const brands = AxiosClient.post("/brands");
// //       const styles = AxiosClient.post("/styles");
// //       const sizes = AxiosClient.post("/sizes");

// //       Promise.all([brands, styles, sizes]).then((data) => {
// //         setFilterRaw({
// //           brands: data[0]?.data || [],
// //           styles: data[1]?.data || [],
// //           sizes: data[2]?.data || [],
// //         });
// //       });
// //     })();
// //   }, []);

// //   return (
// //     <>
// //       <div className="container mx-auto flex gap-6 px-5 my-10">
// //         <div className="w-[350px]">
// //           <h1 className="mb-3 italic font-bold">Thương hiệu</h1>
// //           <div className="flex flex-wrap gap-3">
// //             {lstFilterRaw?.brands?.map((brands) => (
// //               <div
// //                 onClick={() => {
// //                   setFilterParams((previous) => ({
// //                     ...previous,
// //                     brandId: brands?.brandId,
// //                   }));
// //                 }}
// //                 className="px-3 py-2 text-sm rounded-xl border cursor-pointer"
// //               >
// //                 {brands?.name}
// //               </div>
// //             ))}
// //           </div>

// //           <Divider />
// //         </div>
// //         <div className="min-h-[70vh] w-full">
// //           {isFetchLstProducts ? (
// //             <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
// //               {Array.from(new Array(8)).map((_) => (
// //                 <ProductBoxSkeleton />
// //               ))}
// //             </div>
// //           ) : Array.isArray(lstProducts) && lstProducts?.length != 0 ? (
// //             <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
// //               {lstProducts?.map((product) => (
// //                 <div
// //                   key={product?.code}
// //                   onClick={() => {
// //                     goToProductDetails(product);
// //                   }}
// //                   className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer"
// //                 >
// //                   <div className="w-full aspect-square bg-[#F7F5F7]">
// //                     <img
// //                       className="w-full h-full object-contain"
// //                       src={URL_IMAGE(product?.gallery?.[0]?.path)}
// //                     />
// //                   </div>
// //                   <div className="p-4">
// //                     <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem]">
// //                       {product?.name}
// //                     </h1>
// //                     {product?.priceDiscount === product?.price ? (
// //                       <h1 className="text-[#344054] font-bold mb-4">
// //                         {TRANSFER_PRICE(product?.price)}
// //                       </h1>
// //                     ) : (
// //                       <div className="flex items-center mb-4 space-x-3">
// //                         <h1 className="text-[#344054] text-lg font-bold">
// //                           {TRANSFER_PRICE(product?.priceDiscount)}
// //                         </h1>
// //                         <h1 className="text-[#344054] text-sm line-through">
// //                           {TRANSFER_PRICE(product?.price)}
// //                         </h1>
// //                       </div>
// //                     )}
// //                     <h1 className="text-[#344054] mb-1">
// //                       <span className=""> {product?.brand?.name}</span>
// //                     </h1>
// //                     <h1 className="text-[#344054]">
// //                       Mã sản phẩm:
// //                       <span className=""> {product?.code}</span>
// //                     </h1>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="w-full flex flex-col items-center">
// //               <iframe
// //                 width={400}
// //                 height={400}
// //                 src="https://lottie.host/embed/623b28ef-ba6d-470d-b396-9cdbc970bfcf/D3Torrrrb4.json"
// //               />
// //               <h1 className="mt-4 text-xl italic font-bold">
// //                 Không tìm thấy sản phẩm
// //               </h1>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // const ProductBoxSkeleton = () => (
// //   <div className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer">
// //     <div className="w-full aspect-square bg-[#F7F5F7] box-skeleton"></div>
// //     <div className="p-4">
// //       <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem] box-skeleton rounded-lg"></h1>
// //       <h1 className="text-[#344054] font-bold mb-4 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
// //       <h1 className="text-[#344054] mb-1 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
// //       <h1 className="text-[#344054] min-h-[1.5rem] box-skeleton rounded-lg"></h1>
// //     </div>
// //   </div>
// // );


// import '../../index.css'; // Đảm bảo bạn đã import file CSS
// import React, { useEffect, useState } from "react";
// import AxiosClient from "../../networks/AxiosClient";
// import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
// import { useNavigate } from "react-router-dom";
// import { Divider, Slider } from "antd";

// const Shop = () => {
//   const navigate = useNavigate();
//   const [lstProducts, setLstProducts] = useState([]);
//   const [lstFilterRaw, setFilterRaw] = useState({});
//   const [filterParams, setFilterParams] = useState({});
//   const [isFetching, setIsFetching] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 5000]);

//   const goToProductDetails = (product) => {
//     navigate(`/product/${product?.code}`);
//   };
//   // Phân trang
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5); // Số lượng sản phẩm mỗi trang

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsFetching(true);
//       try {
//         const response = await AxiosClient.post(
//             "/products/lst-products",
//             {
//               ...filterParams,
//               minPrice: priceRange[0],
//               maxPrice: priceRange[1],
//               page: currentPage,
//               size: pageSize
//             }
//         );
//         setLstProducts(response?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchProducts();
//   }, [filterParams, priceRange,currentPage,pageSize]);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [brands, styles, sizes, origins, materials] = await Promise.all([
//           AxiosClient.post("/brands"),
//           AxiosClient.post("/styles"),
//           AxiosClient.post("/sizes"),
//           AxiosClient.post("/origins"),
//           AxiosClient.post("/materials"),
//         ]);
//         setFilterRaw({
//           brands: brands?.data || [],
//           styles: styles?.data || [],
//           sizes: sizes?.data || [],
//           origins: origins?.data || [],
//           materials: materials?.data || [],
//         });
//       } catch (error) {
//         console.error("Failed to fetch filter data", error);
//       }
//     };
//     fetchFilters();
//   }, []);

//   const handleFilter = (type, id) => {
//     setFilterParams(prev => {
//       if (prev[type] === id) {
//         const { [type]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [type]: id };
//     });
//   };

//   const handlePriceChange = (value) => {
//     setPriceRange(value);
//     // Có thể không cần cập nhật filterParams khi chỉ thay đổi giá
//   };
//   const formatter = (value) => {
//     // Kiểm tra xem giá trị có phải là số không trước khi gọi toLocaleString
//     return value ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 đ';
//   };


//   return (
//       <div className="container mx-auto flex gap-6 px-5 my-10">
//         <div className="w-[350px]">
//           {/* Phần lọc giá */}
//           <h1 className="mb-3 italic font-bold">Lọc theo giá</h1>
//           <Slider
//               range
//               min={0}
//               max={5000}
//               value={priceRange}
//               onChange={handlePriceChange}
//               tooltip={{ formatter }}
//           />
//           <div className="flex justify-between mt-2">
//             <span>{formatter(priceRange[0])}</span>
//             <span>{formatter(priceRange[1])}</span>
//           </div>

//           <Divider />

//           {/* Lọc theo thương hiệu */}
//           <h1 className="mb-3 italic font-bold">Thương hiệu</h1>
//           <div className="flex flex-wrap gap-3">
//             {lstFilterRaw?.brands?.map(brand => (
//                 <div
//                     key={brand.brandId}
//                     onClick={() => handleFilter("brandId", brand.brandId)}
//                     className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.brandId === brand.brandId ? 'bg-blue-200' : ''}`}
//                 >
//                   {brand.name}
//                 </div>
//             ))}
//           </div>

//           <Divider />

//           {/* Lọc theo xuất xứ */}
//           <h1 className="mb-3 italic font-bold">Xuất xứ</h1>
//           <div className="flex flex-wrap gap-3">
//             {lstFilterRaw?.origins?.map(origin => (
//                 <div
//                     key={origin.originId}
//                     onClick={() => handleFilter("originId", origin.originId)}
//                     className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.originId === origin.originId ? 'bg-blue-200' : ''}`}
//                 >
//                   {origin.name}
//                 </div>
//             ))}
//           </div>

//           <Divider />

//           {/* Lọc theo chất liệu */}
//           <h1 className="mb-3 italic font-bold">Chất liệu</h1>
//           <div className="flex flex-wrap gap-3">
//             {lstFilterRaw?.materials?.map(material => (
//                 <div
//                     key={material.materialId}
//                     onClick={() => handleFilter("materialId", material.materialId)}
//                     className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.materialId === material.materialId ? 'bg-blue-200' : ''}`}
//                 >
//                   {material.name}
//                 </div>
//             ))}
//           </div>

//           <Divider />

//           {/* Lọc theo kiểu dáng */}
//           <h1 className="mb-3 italic font-bold">Kiểu dáng</h1>
//           <div className="flex flex-wrap gap-3">
//             {lstFilterRaw?.styles?.map(style => (
//                 <div
//                     key={style.styleId}
//                     onClick={() => handleFilter("styleId", style.styleId)}
//                     className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.styleId === style.styleId ? 'bg-blue-200' : ''}`}
//                 >
//                   {style.name}
//                 </div>
//             ))}
//           </div>

//           <Divider />

//           <button
//               onClick={() => {
//                 setFilterParams({});
//                 setPriceRange([0, 1000000]);
//               }}
//               className="px-4 py-2 text-white bg-blue-500 rounded"
//           >
//             Làm mới
//           </button>
//         </div>

//         <div className="min-h-[70vh] w-full">
//           {isFetching ? (
//               <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
//                 {Array.from(new Array(8)).map((_, index) => (
//                     <ProductBoxSkeleton key={index} />
//                 ))}
//               </div>
//           ) : lstProducts.length ? (
//               <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
//                 {lstProducts.map(product => (
//                     <div
//                         key={product?.code}
//                         onClick={() => goToProductDetails(product)}
//                         className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer"
//                     >
//                       <div className="w-full aspect-square bg-[#F7F5F7]">
//                         <img
//                             className="w-full h-full object-contain"
//                             src={URL_IMAGE(product?.gallery?.[0]?.path)}
//                             alt={product?.name}
//                         />
//                       </div>
//                       <div className="p-4">
//                         <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem]">
//                           {product?.name}
//                         </h1>
//                         {product?.priceDiscount === product?.price ? (
//                             <h1 className="text-[#344054] font-bold mb-4">
//                               {TRANSFER_PRICE(product?.price)}
//                             </h1>
//                         ) : (
//                             <div className="flex items-center mb-4 space-x-3">
//                               <h1 className="text-[#344054] text-lg font-bold">
//                                 {TRANSFER_PRICE(product?.priceDiscount)}
//                               </h1>
//                               <h1 className="text-[#344054] text-sm line-through">
//                                 {TRANSFER_PRICE(product?.price)}
//                               </h1>
//                             </div>
//                         )}
//                         <h1 className="text-[#344054] mb-1">
//                           <span>{product?.brand?.name}</span>
//                         </h1>
//                         <h1 className="text-[#344054]">
//                           Mã sản phẩm:
//                           <span> {product?.code}</span>
//                         </h1>
//                       </div>
//                     </div>
//                 ))}
//                 {/*<div className="flex justify-center mt-4">*/}
//                 {/*    <button*/}
//                 {/*        // onClick={() => handlePageChange(currentPage - 1)}*/}
//                 {/*        // disabled={currentPage === 1}*/}
//                 {/*        className="px-4 py-2 mx-2 text-white bg-gray-300 rounded"*/}
//                 {/*    >*/}
//                 {/*        Previous*/}
//                 {/*    </button>*/}
//                 {/*    <span className="px-4 py-2 mx-2">*/}
//                 {/*    /!*Page {currentPage} of {totalPages}*!/*/}
//                 {/*</span>*/}
//                 {/*    <button*/}
//                 {/*        // onClick={() => handlePageChange(currentPage + 1)}*/}
//                 {/*        // disabled={currentPage === totalPages}*/}
//                 {/*        className="px-4 py-2 mx-2 text-white bg-gray-300 rounded"*/}
//                 {/*    >*/}
//                 {/*        Next*/}
//                 {/*    </button>*/}
//                 {/*</div>*/}

//               </div>

//           ) : (
//               <div className="w-full flex flex-col items-center">
//                 <iframe
//                     width={400}
//                     height={400}
//                     src="https://lottie.host/embed/623b28ef-ba6d-470d-b396-9cdbc970bfcf/D3Torrrrb4.json"
//                     title="No Products"
//                 />
//                 <h1 className="mt-4 text-xl italic font-bold">
//                   Không tìm thấy sản phẩm
//                 </h1>
//               </div>
//           )}
//         </div>
//       </div>
//   );
// };

// const ProductBoxSkeleton = () => (
//     <div className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer">
//       <div className="w-full aspect-square bg-[#F7F5F7] box-skeleton"></div>
//       <div className="p-4">
//         <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem] box-skeleton rounded-lg"></h1>
//         <h1 className="text-[#344054] font-bold mb-4 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
//         <h1 className="text-[#344054] mb-1 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
//         <h1 className="text-[#344054] min-h-[1.5rem] box-skeleton rounded-lg"></h1>
//       </div>
//     </div>
// );

// export default Shop;
// import React, { useEffect, useState } from "react";
// import AxiosClient from "../../networks/AxiosClient";
// import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
// import { useNavigate } from "react-router-dom";
// import { Divider } from "antd";

// export default function Shop() {
//   const navigation = useNavigate();
//   const [lstProducts, setLstProducts] = useState();
//   const [lstFilterRaw, setFilterRaw] = useState({});
//   const [filterParams, setFilterParams] = useState({});
//   const [isFetchLstProducts, setFetchLstProducts] = useState(false);

//   const goToProductDetails = (products) => {
//     navigation(`/product/${products?.code}`);
//   };

//   useEffect(() => {
//     (async () => {
//       setFetchLstProducts(true);
//       const products = await AxiosClient.post(
//         "/products/lst-products",
//         filterParams
//       );
//       setTimeout(() => {
//         setFetchLstProducts(false);
//         setLstProducts(products?.data || []);
//       }, 200);
//     })();
//   }, [filterParams]);

//   useEffect(() => {
//     (async () => {
//       const brands = AxiosClient.post("/brands");
//       const styles = AxiosClient.post("/styles");
//       const sizes = AxiosClient.post("/sizes");

//       Promise.all([brands, styles, sizes]).then((data) => {
//         setFilterRaw({
//           brands: data[0]?.data || [],
//           styles: data[1]?.data || [],
//           sizes: data[2]?.data || [],
//         });
//       });
//     })();
//   }, []);

//   return (
//     <>
//       <div className="container mx-auto flex gap-6 px-5 my-10">
//         <div className="w-[350px]">
//           <h1 className="mb-3 italic font-bold">Thương hiệu</h1>
//           <div className="flex flex-wrap gap-3">
//             {lstFilterRaw?.brands?.map((brands) => (
//               <div
//                 onClick={() => {
//                   setFilterParams((previous) => ({
//                     ...previous,
//                     brandId: brands?.brandId,
//                   }));
//                 }}
//                 className="px-3 py-2 text-sm rounded-xl border cursor-pointer"
//               >
//                 {brands?.name}
//               </div>
//             ))}
//           </div>

//           <Divider />
//         </div>
//         <div className="min-h-[70vh] w-full">
//           {isFetchLstProducts ? (
//             <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
//               {Array.from(new Array(8)).map((_) => (
//                 <ProductBoxSkeleton />
//               ))}
//             </div>
//           ) : Array.isArray(lstProducts) && lstProducts?.length != 0 ? (
//             <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
//               {lstProducts?.map((product) => (
//                 <div
//                   key={product?.code}
//                   onClick={() => {
//                     goToProductDetails(product);
//                   }}
//                   className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer"
//                 >
//                   <div className="w-full aspect-square bg-[#F7F5F7]">
//                     <img
//                       className="w-full h-full object-contain"
//                       src={URL_IMAGE(product?.gallery?.[0]?.path)}
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem]">
//                       {product?.name}
//                     </h1>
//                     {product?.priceDiscount === product?.price ? (
//                       <h1 className="text-[#344054] font-bold mb-4">
//                         {TRANSFER_PRICE(product?.price)}
//                       </h1>
//                     ) : (
//                       <div className="flex items-center mb-4 space-x-3">
//                         <h1 className="text-[#344054] text-lg font-bold">
//                           {TRANSFER_PRICE(product?.priceDiscount)}
//                         </h1>
//                         <h1 className="text-[#344054] text-sm line-through">
//                           {TRANSFER_PRICE(product?.price)}
//                         </h1>
//                       </div>
//                     )}
//                     <h1 className="text-[#344054] mb-1">
//                       <span className=""> {product?.brand?.name}</span>
//                     </h1>
//                     <h1 className="text-[#344054]">
//                       Mã sản phẩm:
//                       <span className=""> {product?.code}</span>
//                     </h1>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="w-full flex flex-col items-center">
//               <iframe
//                 width={400}
//                 height={400}
//                 src="https://lottie.host/embed/623b28ef-ba6d-470d-b396-9cdbc970bfcf/D3Torrrrb4.json"
//               />
//               <h1 className="mt-4 text-xl italic font-bold">
//                 Không tìm thấy sản phẩm
//               </h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// const ProductBoxSkeleton = () => (
//   <div className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer">
//     <div className="w-full aspect-square bg-[#F7F5F7] box-skeleton"></div>
//     <div className="p-4">
//       <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem] box-skeleton rounded-lg"></h1>
//       <h1 className="text-[#344054] font-bold mb-4 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
//       <h1 className="text-[#344054] mb-1 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
//       <h1 className="text-[#344054] min-h-[1.5rem] box-skeleton rounded-lg"></h1>
//     </div>
//   </div>
// );


import '../../index.css'; // Đảm bảo bạn đã import file CSS
import React, { useEffect, useState } from "react";
import AxiosClient from "../../networks/AxiosClient";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Divider, Slider } from "antd";

const Shop = () => {
    const navigate = useNavigate();
    const [lstProducts, setLstProducts] = useState([]);
    const [lstFilterRaw, setFilterRaw] = useState({});
    const [filterParams, setFilterParams] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 5000]);

    const goToProductDetails = (product) => {
        navigate(`/product/${product?.code}`);
    };
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Số lượng sản phẩm mỗi trang

    useEffect(() => {
        const fetchProducts = async () => {
            setIsFetching(true);
            try {
                const response = await AxiosClient.post(
                    "/products/lst-products",
                    {
                        ...filterParams,
                        minPrice: priceRange[0],
                        maxPrice: priceRange[1],
                        page: currentPage,
                        size: pageSize
                    }
                );
                setLstProducts(response?.data || []);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProducts();
    }, [filterParams, priceRange,currentPage,pageSize]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [brands, styles, sizes, origins, materials] = await Promise.all([
                    AxiosClient.post("/brands"),
                    AxiosClient.post("/styles"),
                    AxiosClient.post("/sizes"),
                    AxiosClient.post("/origins"),
                    AxiosClient.post("/materials"),
                ]);
                setFilterRaw({
                    brands: brands?.data || [],
                    styles: styles?.data || [],
                    sizes: sizes?.data || [],
                    origins: origins?.data || [],
                    materials: materials?.data || [],
                });
            } catch (error) {
                console.error("Failed to fetch filter data", error);
            }
        };
        fetchFilters();
    }, []);

    const handleFilter = (type, id) => {
        setFilterParams(prev => {
            if (prev[type] === id) {
                const { [type]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [type]: id };
        });
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        // Có thể không cần cập nhật filterParams khi chỉ thay đổi giá
    };
    const formatter = (value) => {
        // Kiểm tra xem giá trị có phải là số không trước khi gọi toLocaleString
        return value ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 đ';
    };


    return (
        <div className="container mx-auto flex gap-6 px-5 my-10">
            <div className="w-[350px]">
                {/* Phần lọc giá */}
                <h1 className="mb-3 italic font-bold">Lọc theo giá</h1>
                <Slider
                    range
                    min={0}
                    max={5000}
                    value={priceRange}
                    onChange={handlePriceChange}
                    tooltip={{ formatter }}
                />
                <div className="flex justify-between mt-2">
                    <span>{formatter(priceRange[0])}</span>
                    <span>{formatter(priceRange[1])}</span>
                </div>

                <Divider />

                {/* Lọc theo thương hiệu */}
                <h1 className="mb-3 italic font-bold">Thương hiệu</h1>
                <div className="flex flex-wrap gap-3">
                    {lstFilterRaw?.brands?.map(brand => (
                        <div
                            key={brand.brandId}
                            onClick={() => handleFilter("brandId", brand.brandId)}
                            className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.brandId === brand.brandId ? 'bg-blue-200' : ''}`}
                        >
                            {brand.name}
                        </div>
                    ))}
                </div>

                <Divider />

                {/* Lọc theo xuất xứ */}
                <h1 className="mb-3 italic font-bold">Xuất xứ</h1>
                <div className="flex flex-wrap gap-3">
                    {lstFilterRaw?.origins?.map(origin => (
                        <div
                            key={origin.originId}
                            onClick={() => handleFilter("originId", origin.originId)}
                            className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.originId === origin.originId ? 'bg-blue-200' : ''}`}
                        >
                            {origin.name}
                        </div>
                    ))}
                </div>

                <Divider />

                {/* Lọc theo chất liệu */}
                <h1 className="mb-3 italic font-bold">Chất liệu</h1>
                <div className="flex flex-wrap gap-3">
                    {lstFilterRaw?.materials?.map(material => (
                        <div
                            key={material.materialId}
                            onClick={() => handleFilter("materialId", material.materialId)}
                            className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.materialId === material.materialId ? 'bg-blue-200' : ''}`}
                        >
                            {material.name}
                        </div>
                    ))}
                </div>

                <Divider />

                {/* Lọc theo kiểu dáng */}
                <h1 className="mb-3 italic font-bold">Kiểu dáng</h1>
                <div className="flex flex-wrap gap-3">
                    {lstFilterRaw?.styles?.map(style => (
                        <div
                            key={style.styleId}
                            onClick={() => handleFilter("styleId", style.styleId)}
                            className={`px-3 py-2 text-sm rounded-xl border cursor-pointer ${filterParams.styleId === style.styleId ? 'bg-blue-200' : ''}`}
                        >
                            {style.name}
                        </div>
                    ))}
                </div>

                <Divider />

                <button
                    onClick={() => {
                        setFilterParams({});
                        setPriceRange([0, 5000]);
                    }}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                    Reset bộ lọc
                </button>
            </div>

            <div className="min-h-[70vh] w-full">
                {isFetching ? (
                    <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
                        {Array.from(new Array(8)).map((_, index) => (
                            <ProductBoxSkeleton key={index} />
                        ))}
                    </div>
                ) : lstProducts.length ? (
                    <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
                        {lstProducts.map(product => (
                            <div
                                key={product?.code}
                                onClick={() => goToProductDetails(product)}
                                className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer"
                            >
                                <div className="w-full aspect-square bg-[#F7F5F7]">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={URL_IMAGE(product?.gallery?.[0]?.path)}
                                        alt={product?.name}
                                    />
                                </div>
                                <div className="p-4">
                                    <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem]">
                                        {product?.name}
                                    </h1>
                                    {product?.priceDiscount === product?.price ? (
                                        <h1 className="text-[#344054] font-bold mb-4">
                                            {TRANSFER_PRICE(product?.price)}
                                        </h1>
                                    ) : (
                                        <div className="flex items-center mb-4 space-x-3">
                                            <h1 className="text-[#344054] text-lg font-bold">
                                                {TRANSFER_PRICE(product?.priceDiscount)}
                                            </h1>
                                            <h1 className="text-[#344054] text-sm line-through">
                                                {TRANSFER_PRICE(product?.price)}
                                            </h1>
                                        </div>
                                    )}
                                    <h1 className="text-[#344054] mb-1">
                                        <span>{product?.brand?.name}</span>
                                    </h1>
                                    <h1 className="text-[#344054]">
                                        Mã sản phẩm:
                                        <span> {product?.code}</span>
                                    </h1>
                                </div>
                            </div>
                        ))}
                        {/*<div className="flex justify-center mt-4">*/}
                        {/*    <button*/}
                        {/*        // onClick={() => handlePageChange(currentPage - 1)}*/}
                        {/*        // disabled={currentPage === 1}*/}
                        {/*        className="px-4 py-2 mx-2 text-white bg-gray-300 rounded"*/}
                        {/*    >*/}
                        {/*        Previous*/}
                        {/*    </button>*/}
                        {/*    <span className="px-4 py-2 mx-2">*/}
                        {/*    /!*Page {currentPage} of {totalPages}*!/*/}
                        {/*</span>*/}
                        {/*    <button*/}
                        {/*        // onClick={() => handlePageChange(currentPage + 1)}*/}
                        {/*        // disabled={currentPage === totalPages}*/}
                        {/*        className="px-4 py-2 mx-2 text-white bg-gray-300 rounded"*/}
                        {/*    >*/}
                        {/*        Next*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                    </div>

                ) : (
                    <div className="w-full flex flex-col items-center">
                        <iframe
                            width={400}
                            height={400}
                            src="https://lottie.host/embed/623b28ef-ba6d-470d-b396-9cdbc970bfcf/D3Torrrrb4.json"
                            title="No Products"
                        />
                        <h1 className="mt-4 text-xl italic font-bold">
                            Không tìm thấy sản phẩm
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductBoxSkeleton = () => (
    <div className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer">
        <div className="w-full aspect-square bg-[#F7F5F7] box-skeleton"></div>
        <div className="p-4">
            <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem] box-skeleton rounded-lg"></h1>
            <h1 className="text-[#344054] font-bold mb-4 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
            <h1 className="text-[#344054] mb-1 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
            <h1 className="text-[#344054] min-h-[1.5rem] box-skeleton rounded-lg"></h1>
        </div>
    </div>
);

export default Shop;

