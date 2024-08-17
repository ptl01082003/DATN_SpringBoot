/**@jsxImportSource @emotion/react */

import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import SizeService from "../services/SizeApi";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type SizeType = {
  sizeId?: number;
  name?: string;
};

const SizePage: React.FC = () => {
  const [lstSizes, setLstSizes] = useState<SizeType[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<{
    open: boolean;
    data: SizeType;
  }>({
    open: false,
    data: {},
  });

  useEffect(() => {
    fetchSizes();
  }, [shouldRender]);

  const fetchSizes = async () => {
    try {
      const response = await SizeService.getSizes();
      if (response.code === 0) {
        setLstSizes(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch sizes:", error);
    }
  };

  const deleteSize = async (record: SizeType) => {
    try {
      const response = await SizeService.deleteSize(record.sizeId!);
      if (response.code === 0) {
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to delete size:", error);
    }
  };

  const editSize = (record: SizeType) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinishCreate = async (values: SizeType) => {
    try {
      const response = await SizeService.createSize(values);
      if (response.code === 0) {
        setOpenCreateModal(false);
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to create size:", error);
    }
  };

  const onFinishEdit = async (values: SizeType) => {
    try {
      const response = await SizeService.updateSize(
        openEditModal.data.sizeId!,
        values
      );
      if (response.code === 0) {
        setOpenEditModal({ open: false, data: {} });
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to update size:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "sizeId",
      key: "sizeId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      render: (_: any, record: SizeType) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => editSize(record)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => deleteSize(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
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
          dataSource={lstSizes}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Create Size"
        centered
        open={isOpenCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createSizeForm"
          onFinish={onFinishCreate}
          layout="horizontal"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the size name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Size"
        centered
        open={openEditModal.open}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editSizeForm"
          initialValues={openEditModal.data}
          onFinish={onFinishEdit}
          layout="horizontal"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the size name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SizePage;
