/**@jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import StyleService from "../services/StyleApi";
import { FormProps } from "antd/lib";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type StyleType = {
  styleId?: number;
  name?: string;
};

const StylesPage: React.FC = () => {
  const [lstStyles, setLstStyles] = useState<StyleType[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<{
    open: boolean;
    data: StyleType;
  }>({
    open: false,
    data: {},
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await StyleService.getStyles();
        if (Array.isArray(response.data) && response.data.length > 0) {
          setLstStyles(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch styles:", error);
      }
    })();
  }, [shouldRender]);

  const deleteStyleItems = async (record: StyleType) => {
    try {
      const response = await StyleService.deleteStyle(record.styleId!);
      if (response.code === 0) {
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to delete style:", error);
    }
  };

  const editStyleItems = (record: StyleType) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinishCreate: FormProps<StyleType>["onFinish"] = async (values) => {
    try {
      const response = await StyleService.createStyle(values);
      if (response.code === 0) {
        setOpenCreateModal(false);
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to create style:", error);
    }
  };

  const onFinishEdit: FormProps<StyleType>["onFinish"] = async (values) => {
    try {
      const response = await StyleService.updateStyle(
        openEditModal.data.styleId!,
        values
      );
      if (response.code === 0) {
        setOpenEditModal({ open: false, data: {} });
        setShouldRender((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to update style:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "styleId",
      key: "styleId",
    },
    {
      title: "Kiểu dáng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      render: (_: any, record: StyleType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => editStyleItems(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteStyleItems(record)}
          >
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
          dataSource={lstStyles}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Create Style"
        centered
        open={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createStyleForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinishCreate}
          autoComplete="off"
        >
          <Form.Item
            label="Kiểu dáng"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Style"
        centered
        open={openEditModal.open}
        destroyOnClose={true}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editStyleForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal.data}
          onFinish={onFinishEdit}
          autoComplete="off"
        >
          <Form.Item
            label="Kiểu dáng"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StylesPage;
