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
import VoucherService from "../services/VoucherApi";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  Vouchers_STATUS,
  Vouchers_TYPE,
  Voucher_RULE,
} from "../constants/constants";
import { FormProps } from "antd/lib";
import dayjs from "dayjs";

const { Option } = Select;

type FieldType = {
  code?: string;
  description?: string;
  valueOrder?: number;
  discountValue?: number;
  discountMax?: number;
  startDay?: moment.Moment;
  endDay?: moment.Moment;
  quantity?: number;
  status?: Vouchers_STATUS;
  typeValue?: Vouchers_TYPE;
  ruleType?: Voucher_RULE;
  minOrderValue?: number;
  minOrderCount?: number;
  maxOrderCount?: number;
};

export default function VouchersPage() {
  const [lstVouchers, setLstVouchers] = useState<any[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });
  const [form] = Form.useForm();
  const [selectedRuleType, setSelectedRuleType] = useState<
    Voucher_RULE | undefined
  >(undefined);

  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá trị giảm giá",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "valueOrder",
      key: "valueOrder",
    },
    {
      title: "Giới hạn giảm giá",
      dataIndex: "discountMax",
      key: "discountMax",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDay",
      key: "startDay",
      render: (text: any) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDay",
      key: "endDay",
      render: (text: any) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => editVoucherItems(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteVoucherItems(record)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const getVouchers = await VoucherService.getVouchers();
      setLstVouchers(getVouchers?.data || []);
    })();
  }, [shouldRender]);

  useEffect(() => {
    if (openEditModal.open) {
      const { ruleType } = openEditModal.data;
      setSelectedRuleType(ruleType);
      form.setFieldsValue({
        ...openEditModal.data,
        startDay: moment(openEditModal.data.startDay),
        endDay: moment(openEditModal.data.endDay),
      });
    }
  }, [openEditModal, form]);

  const deleteVoucherItems = async (record: any) => {
    try {
      const res: any = await VoucherService.deleteVoucher(record.voucherId);
      if (res.code === 0) {
        message.success("Voucher deleted successfully");
        setShouldRender((x) => !x);
      } else {
        message.error("Failed to delete voucher");
      }
    } catch (error) {
      message.error("An error occurred while deleting voucher");
    }
  };

  const editVoucherItems = (record: any) => {
    setOpenEditModal({
      open: true,
      data: {
        ...record,
    
      },
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    try {
      const res = await VoucherService.createVoucher({
        ...values,
        startDay: values.startDay?.format("YYYY-MM-DD HH:mm:ss"),
        endDay: values.endDay?.format("YYYY-MM-DD HH:mm:ss"),
      });
      if (res.code === 0) {
        message.success("Voucher created successfully");
        setOpenCreateModal(false);
        setShouldRender((x) => !x);
      } else {
        message.error("Failed to create voucher");
      }
    } catch (error) {
      message.error("An error occurred while creating voucher");
    }
  };

  const onEditFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    try {
      const res = await VoucherService.updateVoucher({
        ...values,
        voucherId: openEditModal?.data?.voucherId,
        startDay: values.startDay?.format("YYYY-MM-DD HH:mm:ss"),
        endDay: values.endDay?.format("YYYY-MM-DD HH:mm:ss"),
      });
      if (res.code === 0) {
        message.success("Voucher updated successfully");
        setOpenEditModal({ open: false, data: {} });
        setShouldRender((x) => !x);
      } else {
        message.error("Failed to update voucher");
      }
    } catch (error) {
      message.error("An error occurred while updating voucher");
    }
  };

  const handleRuleTypeChange = (value: Voucher_RULE) => {
    setSelectedRuleType(value);
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
          dataSource={lstVouchers}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Tạo Voucher"
        centered
        closable
        open={isOpenCreateModal}
        destroyOnClose
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          form={form}
          name="createVoucher"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Mã giảm giá"
            name="code"
            rules={[{ required: true, message: "Mã giảm giá là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giá trị giảm giá"
            name="discountValue"
            rules={[
              { required: true, message: "Giá trị giảm giá là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giá trị đơn hàng"
            name="valueOrder"
            rules={[
              { required: true, message: "Giá trị đơn hàng là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giới hạn giảm giá"
            name="discountMax"
            rules={[
              { required: true, message: "Giới hạn giảm giá là bắt buộc!" },
            ]}
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
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              {Object.values(Vouchers_STATUS).map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Loại Voucher"
            name="typeValue"
            rules={[{ required: true, message: "Loại voucher là bắt buộc!" }]}
          >
            <Select placeholder="Chọn loại voucher">
              {Object.values(Vouchers_TYPE).map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Loại Quy Tắc"
            name="ruleType"
            rules={[{ required: true, message: "Loại quy tắc là bắt buộc!" }]}
          >
            <Select
              placeholder="Chọn loại quy tắc"
              onChange={handleRuleTypeChange}
            >
              {Object.values(Voucher_RULE).map((rule) => (
                <Option key={rule} value={rule}>
                  {rule}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {(selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE ||
            selectedRuleType === Voucher_RULE.ORDER_COUNT) && (
            <Form.Item<FieldType>
              label={
                selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE
                  ? "Giá trị đơn hàng tối thiểu"
                  : "Số đơn hàng tối thiểu"
              }
              name={
                selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE
                  ? "minOrderValue"
                  : "minOrderCount"
              }
              rules={[
                {
                  required: true,
                  message: `${
                    selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE
                      ? "Giá trị đơn hàng tối thiểu"
                      : "Số đơn hàng tối thiểu"
                  } là bắt buộc!`,
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                disabled={selectedRuleType !== Voucher_RULE.MIN_ORDER_VALUE}
              />
            </Form.Item>
          )}

          {selectedRuleType === Voucher_RULE.ORDER_COUNT && (
            <Form.Item<FieldType>
              label="Số đơn hàng tối đa"
              name="maxOrderCount"
              rules={[
                { required: true, message: "Số đơn hàng tối đa là bắt buộc!" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Tạo
            </Button>
            <Button type="default" onClick={() => setOpenCreateModal(false)}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa Voucher"
        centered
        closable
        open={openEditModal.open}
        destroyOnClose
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          form={form}
          name="editVoucher"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onEditFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Mã giảm giá"
            name="code"
            rules={[{ required: true, message: "Mã giảm giá là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giá trị giảm giá"
            name="discountValue"
            rules={[
              { required: true, message: "Giá trị giảm giá là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giá trị đơn hàng"
            name="valueOrder"
            rules={[
              { required: true, message: "Giá trị đơn hàng là bắt buộc!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giới hạn giảm giá"
            name="discountMax"
            rules={[
              { required: true, message: "Giới hạn giảm giá là bắt buộc!" },
            ]}
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
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              {Object.values(Vouchers_STATUS).map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Loại Voucher"
            name="typeValue"
            rules={[{ required: true, message: "Loại voucher là bắt buộc!" }]}
          >
            <Select placeholder="Chọn loại voucher">
              {Object.values(Vouchers_TYPE).map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Loại Quy Tắc"
            name="ruleType"
            rules={[{ required: true, message: "Loại quy tắc là bắt buộc!" }]}
          >
            <Select
              placeholder="Chọn loại quy tắc"
              onChange={handleRuleTypeChange}
            >
              {Object.values(Voucher_RULE).map((rule) => (
                <Option key={rule} value={rule}>
                  {rule}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {(selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE ||
            selectedRuleType === Voucher_RULE.ORDER_COUNT) && (
            <Form.Item<FieldType>
              label={
                selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE
                  ? "Giá trị đơn hàng tối thiểu"
                  : "Số đơn hàng tối thiểu"
              }
              name={
                selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE
                  ? "minOrderValue"
                  : "minOrderCount"
              }
              rules={[
                {
                  required: true,
                  message: `${
                    selectedRuleType === Voucher_RULE.MIN_ORDER_VALUE
                      ? "Giá trị đơn hàng tối thiểu"
                      : "Số đơn hàng tối thiểu"
                  } là bắt buộc!`,
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                disabled={selectedRuleType !== Voucher_RULE.MIN_ORDER_VALUE}
              />
            </Form.Item>
          )}

          {selectedRuleType === Voucher_RULE.ORDER_COUNT && (
            <Form.Item<FieldType>
              label="Số đơn hàng tối đa"
              name="maxOrderCount"
              rules={[
                { required: true, message: "Số đơn hàng tối đa là bắt buộc!" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Lưu
            </Button>
            <Button
              type="default"
              onClick={() => setOpenEditModal({ open: false, data: {} })}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
