import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddTwoTone,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Divider,
  Drawer,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Switch,
  Table,
  Upload,
  UploadProps,
} from "antd";
import { UploadFile } from "antd/lib";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TRANSFER_PRICE, URL_IMAGE } from "../constants/constants";
import BrandService from "../services/BrandApi";
import MaterialService from "../services/MaterialApi";
import OriginService from "../services/OriginApi";
import ProductService from "../services/ProductApi";
import SizesService from "../services/SizeApi";
import StyleService from "../services/StyleApi";
import { tableCustomizeStyle } from "../styles/styles";

const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ProductPage: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [products, setProducts] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [origins, setOrigins] = useState<any[]>([]);
  const [modalInfo, setModalInfo] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: any;
  }>({ open: false, mode: "create" });
  const [form] = Form.useForm();
  const details = useRef<string>("");
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    (async () => {
      const productResponse = await ProductService.getProducts();
    console.log("Fetched product:", productResponse.data);
      setProducts(productResponse.data || []);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // Lấy danh sách sản phẩm giảm giá từ API
  //       const discountedProductsResponse =
  //         await ProductService.getDiscountedProducts();

  //       // Cập nhật trạng thái với danh sách sản phẩm giảm giá
  //       setProducts(discountedProductsResponse.data || []);
  //       console.log(discountedProductsResponse);
  //     } catch (error) {
  //       console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
  //       // Xử lý lỗi nếu cần thiết
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const sizesResponse = SizesService.getSizes();
      const brandsResponse = BrandService.getBrands();
      const stylesResponse = StyleService.getStyles();
      const originResponse = OriginService.getOrigins();
      const materialsResponse = MaterialService.getMaterials();

      const fetchData = await Promise.all([
        sizesResponse,
        brandsResponse,
        stylesResponse,
        materialsResponse,
        originResponse,
      ]);

      setSizes(fetchData[0]?.data);
      setBrands(fetchData[1]?.data);
      setStyles(fetchData[2]?.data);
      setMaterials(fetchData[3]?.data);
      setOrigins(fetchData[4]?.data);
    })();
  }, []);

  const onFinish = async (values: any) => {
    try {
      const lstImageGallery = fileList.map((files) =>
        files.response ? files.response?.data?.[0] : files?.name
      );
      const productData = {
        ...modalInfo?.data,
        ...values,
        gallery: lstImageGallery,
        description: details.current,
        sizeQuantities: values.productDetails
          ? values.productDetails.map((detail: any) => ({
              sizeId: detail.sizeId,
              quantity: detail.quantity,
            }))
          : [],
      };

      let response;
      if (modalInfo.mode === "create") {
        response = await ProductService.createProduct(productData);
        toast.success("Thêm sản phẩm thành công!");
      } else {
        response = await ProductService.updateProduct({
          ...productData,
          productId: modalInfo.data.productId,
        });
        toast.success("Cập nhật sản phẩm thành công!");
      }

      if (response) {
        setModalInfo({ open: false, mode: modalInfo.mode });
        setProducts((prev) =>
          modalInfo.mode === "create"
            ? [...prev, response.data]
            : prev.map((item) =>
                item?.productId === response.data?.productId
                  ? response.data
                  : item
              )
        );
      }
      return;
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý dữ liệu.");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const response = await ProductService.deleteProduct(productId);
    if (response?.code === 0) {
      setProducts((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
      message.success("Xóa sản phẩm thành công!");
    } else {
      message.error("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  const handleEditProduct = (product: any) => {
    details.current = product?.description || "";
    if (product?.gallery && Array.isArray(product.gallery)) {
      const transferImage = product.gallery.map((images) => ({
        uid: images?.path,
        name: images?.path,
        path: images?.path,
        status: "done",
        url: URL_IMAGE(images?.path),
      }));
      setFileList(transferImage);
    }

    const productDetails =
      product?.productDetails?.map((detail: any) => ({
        sizeId: detail.sizeId,
        quantity: detail.quantity,
      })) || [];

    setModalInfo({
      open: true,
      mode: "edit",
      data: {
        ...product,
        productDetails,
      },
    });
  };

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá nhập",
      dataIndex: "importPrice",
      key: "importPrice",
      render: (price: string) => TRANSFER_PRICE(price),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (price: string) => TRANSFER_PRICE(price),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (status ? "Kích hoạt" : "Ngừng hoạt động"),
    },
    {
      title: "Thương hiệu",
      render: (record: any) => record?.brand?.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: any) => (
          <Switch
              checked={status}
              onChange={(checked) => handleUpdateStatus(record, checked)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
          />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.productId)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUpdateStatus = async (record, checked) => {
    try {
        // Gọi API để cập nhật trạng thái sản phẩm
        const response = await ProductService.updateProductStatus(record.productId, checked);
  
        // Kiểm tra mã trạng thái trả về
        if (response && response.status === 200) {
            message.success('Cập nhật trạng thái sản phẩm thành công');
  
            // Cập nhật danh sách sản phẩm
            setProducts((prev) => {
                if (!Array.isArray(prev)) {
                    return prev;
                }
  
                const updatedProducts = prev.map((item) =>
                    item.productId === record.productId
                        ? { ...item, status: checked }
                        : item
                );
                return updatedProducts;
            });
        } else {
            message.error('Cập nhật trạng thái sản phẩm thất bại');
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái sản phẩm", error);
        message.error('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
};

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const form = new FormData();
          loader.file.then((file) => {
            form.append("image", file);
            Axios.create({
              baseURL: "http://localhost:5500/api/v1",
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              },
            })
              .post("/uploads/multiple", form)
              .then((res) => {
                const imageUrl = res.data?.data?.[0];
                resolve({
                  default: URL_IMAGE(imageUrl),
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <div className="flex justify-end mt-12 mb-8">
        <Button
          size="large"
          type="primary"
          onClick={() => setModalInfo({ open: true, mode: "create" })}
        >
          THÊM MỚI
        </Button>
      </div>
      <div css={tableCustomizeStyle} className="table-responsive">
        <Table columns={columns} dataSource={products} rowKey="productId" />
      </div>

      <Drawer
        footer={null}
        placement="right"
        width={"85%"}
        destroyOnClose={true}
        open={modalInfo.open}
        title={
          <h3 className="mb-2 text-2xl font-bold text-center text-orange-600">
            {modalInfo.mode === "create" ? "THÊM MỚI" : "CẬP NHẬT"} SẢN PHẨM
          </h3>
        }
        onClose={() => {
          setFileList([]);
          details.current = "";
          setModalInfo({ open: false, mode: modalInfo.mode });
        }}
      >
        <Form
          className="grid grid-cols-2 gap-4"
          layout="vertical"
          initialValues={modalInfo.data}
          onFinish={onFinish}
        >
          {/* Product Form */}
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[
              { required: true, message: "Tên sản phẩm không được để trống" },
            ]}
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="importPrice"
            label="Giá nhập"
            rules={[
              { required: true, message: "Giá nhập không được để trống" },
            ]}
          >
            <InputNumber
              placeholder="Nhập tại đây"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá bán"
            rules={[{ required: true, message: "Giá bán không được để trống" }]}
          >
            <InputNumber
              value={formattedPrice}
              onChange={(e) => {
                const rawValue = e?.toString().replace(/\./g, "");
                const formatPrice = formatNumber(rawValue);
                setFormattedPrice(formatPrice);
                form.setFieldsValue({ price: formatPrice });
              }}
              placeholder="Nhập tại đây"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Thương hiệu"
            rules={[
              { required: true, message: "Thương hiệu không được để trống." },
            ]}
          >
            <Select placeholder="Chọn tại đây">
              {brands?.map((brand) => (
                <Option key={brand?.brandId} value={brand?.brandId}>
                  {brand?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="styleId"
            label="Kiểu dáng"
            rules={[
              { required: true, message: "Kiểu dáng không được để trống" },
            ]}
          >
            <Select placeholder="Chọn tại đây">
              {styles?.map((style) => (
                <Option
                  key={style?.styleId + style?.name}
                  value={style?.styleId}
                >
                  {style?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="materialId"
            label="Chất liệu"
            rules={[
              {
                required: true,
                message: "Chất liệu không được để trống không được để trống",
              },
            ]}
          >
            <Select placeholder="Chọn tại đây">
              {materials?.map((material) => (
                <Option key={material?.materialId} value={material?.materialId}>
                  {material?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="originId" label="Xuất xứ">
            <Select placeholder="Chọn tại đây">
              {origins.map((origin) => (
                <Option key={origin.originId} value={origin.originId}>
                  {origin.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="col-span-2">
            <h1 className="mb-2">Ảnh mô tả sản phẩm:</h1>
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
          <div className="col-span-2">
            <Divider />
            <h1 className="mb-2">Size sản phẩm:</h1>
            <Form.List name="productDetails">
              {(fields, { add, remove }) => (
                <>
                  <div className="grid grid-cols-2 gap-5">
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align="center">
                        <Form.Item
                          {...restField}
                          name={[name, "sizeId"]}
                          label="Kích thước"
                          rules={[
                            { required: true, message: "Chọn kích thước!" },
                          ]}
                        >
                          <Select
                            style={{ width: 140 }}
                            placeholder="Chọn kích thước"
                          >
                            {sizes.map((size) => (
                              <Option key={size.sizeId} value={size.sizeId}>
                                {size.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          label="Số lượng"
                          rules={[
                            { required: true, message: "Nhập số lượng!" },
                          ]}
                        >
                          <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Button
                          type="link"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                  </div>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Thêm Size
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div className="col-span-2">
            <Divider />
            <h1 className="mb-2">Mô tả sản phẩm:</h1>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin],
                mediaEmbed: {
                  previewsInData: true,
                },
              }}
              editor={ClassicEditor}
              data={details.current}
              onChange={(event, editor) => {
                const data = editor.getData();
                details.current = data;
              }}
            />
          </div>
          <div className="flex col-span-2 justify-center">
            <Form.Item>
              <Button
                type="primary"
                shape="round"
                icon={<FileAddTwoTone />}
                htmlType="submit"
              >
                {modalInfo.mode === "create" ? "Thêm mới" : "Cập nhật"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
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

export default ProductPage;

