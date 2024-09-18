import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import PromotionService from "../services/PromotionApi";
import ProductService from "../services/ProductApi";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PROMOTIONS_STATUS } from "../constants/constants";
import dayjs from "dayjs";
import { FormProps } from "antd/lib";

const { Option } = Select;

type FieldType = {
  discountPrice?: number;
  startDay?: dayjs.Dayjs;
  endDay?: dayjs.Dayjs;
  status?: PROMOTIONS_STATUS;
  productId?: number;
};

export default function PromotionsPage() {
  const [lstPromotions, setLstPromotions] = useState<any[]>([]);
  const [lstProducts, setLstProducts] = useState<any[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "promotionId",
      key: "promotionId",
    },
    {
      title: "Giá giảm",
      dataIndex: "discountPrice",
      key: "discountPrice",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDay",
      key: "startDay",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDay",
      key: "endDay",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: PROMOTIONS_STATUS) => (
        <span>
          {status === PROMOTIONS_STATUS.PRE_START && "Chưa bắt đầu"}
          {status === PROMOTIONS_STATUS.ACTIVE && "Đang hoạt động"}
          {status === PROMOTIONS_STATUS.EXPIRED && "Hết hạn"}
        </span>
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => editPromotionItems(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deletePromotionItems(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const getPromotions = await PromotionService.getPromotions();
        setLstPromotions(getPromotions?.data || []);

        const getProducts = await ProductService.getProducts();
        setLstProducts(getProducts?.data || []);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu khuyến mãi hoặc sản phẩm.");
      }
    })();
  }, [shouldRender]);

  const deletePromotionItems = async (record: any) => {
    try {
      const res: any = await PromotionService.deletePromotion(
        record.promotionId
      );
      if (res.code === 0) {
        message.success("Xóa khuyến mãi thành công");
        setShouldRender((x) => !x);
      } else {
        message.error("Xóa khuyến mãi thất bại");
      }
    } catch (error) {
      message.error("Lỗi khi xóa khuyến mãi.");
    }
  };

  const editPromotionItems = (record: any) => {
    setOpenEditModal({
      open: true,
      data: {
        ...record,
        startDay: dayjs(record.startDay, 'YYYY-MM-DD HH:mm:ss'),
        endDay: dayjs(record.endDay, 'YYYY-MM-DD HH:mm:ss'),
      },
    });
  };

  // const onFinish: FormProps<FieldType>["onFinish"] = async (
  //   values: FieldType
  // ) => {
  //   try {
  //     const product = lstProducts.find(
  //       (prod) => prod.code === values.productId
  //     );
  //     const res = await PromotionService.createPromotion({
  //       ...values,
  //       productId: product?.productId,
  //       startDay: values.startDay?.format("YYYY-MM-DD HH:mm:ss"),
  //       endDay: values.endDay?.format("YYYY-MM-DD HH:mm:ss"),
  //     });
  //     console.log("API Response:", res); // Log phản hồi để kiểm tra cấu trúc
  //
  //     if (res.code === 0) {
  //       message.success("Tạo khuyến mãi thành công");
  //       setOpenCreateModal(false);
  //       setShouldRender((x) => !x);
  //     } else {
  //       message.error("Tạo khuyến mãi thất bại");
  //     }
  //   } catch (error) {
  //     message.error("Lỗi khi tạo khuyến mãi.");
  //   }
  // };
  const onFinish: FormProps<FieldType>["onFinish"] = async (
      values: FieldType
  ) => {
    try {
      const product = lstProducts.find(
          (prod) => prod.code === values.productId
      );
      const res = await PromotionService.createPromotion({
        ...values,
        productId: product?.productId,
        startDay: values.startDay?.format("YYYY-MM-DD HH:mm:ss"),
        endDay: values.endDay?.format("YYYY-MM-DD HH:mm:ss"),
      });

      console.log("API Response:", res);

      if (res.code === 0) {
        message.success("Tạo khuyến mãi thành công");
        setOpenCreateModal(false);

        // Fetch lại dữ liệu sau khi thêm
        const getPromotions = await PromotionService.getPromotions();
        setLstPromotions(getPromotions?.data || []);
      } else {
        message.error("Tạo khuyến mãi thất bại");
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
      message.error("Lỗi khi tạo khuyến mãi.");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    try {
      const product = lstProducts.find(
        (prod) => prod.code === values.productId
      );
      const res = await PromotionService.updatePromotion({
        ...values,
        promotionId: openEditModal.data.promotionId,
        productId: product?.productId,
        startDay: dayjs(values.startDay).format("YYYY-MM-DD HH:mm:ss"), 
      endDay: dayjs(values.endDay).format("YYYY-MM-DD HH:mm:ss"), 
      });
      if (res.code === 0) {
        message.success("Cập nhật khuyến mãi thành công");
        setOpenEditModal({ open: false, data: {} });
        setShouldRender((x) => !x);
      } else {
        message.error("Cập nhật khuyến mãi thất bại");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật khuyến mãi.");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          size="large"
          type="primary"
          onClick={() => setOpenCreateModal(true)}
        >
          THÊM MỚI
        </Button>
      </div>
      <div css={tableCustomizeStyle} className="table-responsive">
        <Table
          columns={columns}
          dataSource={lstPromotions.map((promo) => ({
            ...promo,
            code: lstProducts.find((prod) => prod.productId === promo.productId)
              ?.code,
          }))}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Tạo Khuyến Mãi"
        centered
        closable
        open={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => setOpenCreateModal(false)}
        footer={false}
        width={750}
      >
        <Form
          name="createPromotion"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Giá giảm"
            name="discountPrice"
            rules={[{ required: true, message: "Giá giảm là bắt buộc!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày bắt đầu"
            name="startDay"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày kết thúc"
            name="endDay"
            rules={[{ required: true, message: "Ngày kết thúc là bắt buộc!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
          >
            <Select>
              <Option value={PROMOTIONS_STATUS.PRE_START}>CHƯA BẮT ĐẦU</Option>
              <Option value={PROMOTIONS_STATUS.ACTIVE}>ĐANG HOẠT ĐỘNG</Option>
              <Option value={PROMOTIONS_STATUS.EXPIRED}>HẾT HẠN</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Mã sản phẩm"
            name="productId"
            rules={[{ required: true, message: "Mã sản phẩm là bắt buộc!" }]}
          >
            <Select>
              {lstProducts.map((prod) => (
                <Option key={prod.productId} value={prod.code}>
                  {prod.code}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa Khuyến Mãi"
        centered
        closable
        open={openEditModal.open}
        destroyOnClose={true}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={false}
        width={750}
      >
        <Form
          name="editPromotion"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal.data}
          onFinish={onEditFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Giá giảm"
            name="discountPrice"
            rules={[{ required: true, message: "Giá giảm là bắt buộc!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày bắt đầu"
            name="startDay"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ngày kết thúc"
            name="endDay"
            rules={[{ required: true, message: "Ngày kết thúc là bắt buộc!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: dayjs("23:59:59", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
          >
            <Select>
              <Option value={PROMOTIONS_STATUS.PRE_START}>CHƯA BẮT ĐẦU</Option>
              <Option value={PROMOTIONS_STATUS.ACTIVE}>ĐANG HOẠT ĐỘNG</Option>
              <Option value={PROMOTIONS_STATUS.EXPIRED}>HẾT HẠN</Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Mã sản phẩm"
            name="productId"
            rules={[{ required: true, message: "Mã sản phẩm là bắt buộc!" }]}
          >
            <Select>
              {lstProducts.map((prod) => (
                <Option key={prod.productId} value={prod.code}>
                  {prod.code}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
