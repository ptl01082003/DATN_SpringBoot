/**@jsxImportSource @emotion/react */
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import MaterialService from "../services/MaterialApi";
import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FormProps } from "antd/lib";

type MaterialType = {
  materialId?: number;
  name?: string;
};

export default function MaterialPage() {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<{
    open: boolean;
    data: MaterialType;
  }>({
    open: false,
    data: {},
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "materialId",
      key: "materialId",
    },
    {
      title: "Tên Vật Liệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      render: (_: any, record: MaterialType) => {
        return (
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => editMaterialItems(record)}
            >
              Sửa
            </Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteMaterialItems(record)}
            >
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await MaterialService.getMaterials();
      if (response.code === 0) {
        setMaterials(response.data);
      }
    })();
  }, [shouldRender]);

  const deleteMaterialItems = async (record: MaterialType) => {
    const response = await MaterialService.deleteMaterial(record.materialId!);
    if (response.code === 0) {
      setShouldRender((prev) => !prev);
    }
  };

  const editMaterialItems = (record: MaterialType) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  const onFinishCreate = async (values: MaterialType) => {
    const response = await MaterialService.createMaterial(values);
    if (response.code === 0) {
      setOpenCreateModal(false);
      setShouldRender((prev) => !prev);
    }
  };

  const editBrandItems = async (record: any) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };

  // const onEditFinish: FormProps<MaterialType>["onFinish"] = async (
  //   values: MaterialType
  // ) => {
  //   const res = await MaterialService.updateMaterial({
  //     ...values,
  //     materialId: openEditModal?.data?.materialId,
  //   });
  //   if (res.code === 0) {
  //     setOpenEditModal(undefined);
  //     setShouldRender((x) => !x);
  //   }
  // };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          THÊM MỚI
        </Button>
      </div>
      <div css={tableCustomizeStyle} className="table-responsive">
        <Table
          columns={columns}
          dataSource={materials}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Create Material"
        centered
        visible={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createMaterial"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{}}
          onFinish={onFinishCreate}
          autoComplete="off"
        >
          <Form.Item
            label="Chất liệu"
            name="name"
            rules={[
              { required: true, message: "Please input the material name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Material"
        centered
        visible={openEditModal.open}
        destroyOnClose={true}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editMaterial"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal.data}
          // onFinish={onFinishEdit}
          autoComplete="off"
        >
          <Form.Item
            label="Material Name"
            name="name"
            rules={[
              { required: true, message: "Please input the material name!" },
            ]}
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
}
