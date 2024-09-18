/**@jsxImportSource @emotion/react */
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";

import { tableCustomizeStyle } from "../styles/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { confirmAlert } from "react-confirm-alert"; // Import thư viện
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS
import { FormProps } from "antd/lib";
import SizeService from "../services/SizeApi";

const deletebtn = [
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
      fill="#111827"
      className="fill-danger"
    ></path>
  </svg>,
];
const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];
export default function SizePage() {
  const [sizes, setSizes] = useState<any>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<any>({
    open: false,
    data: {},
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "sizeId",
      key: "sizeId",
    },
    {
      title: "Tên Size",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => editSizeItems(record)}
            >
              Sửa
            </Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteSizeItems(record)}
            >
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchSizes = async () => {
      const response = await SizeService.getSizes();
      console.log("Fetched sizes:", response.data);

      setSizes(response.data);
    };

    fetchSizes();
  }, [shouldRender]); // Theo dõi `shouldRender`
  const confirmDelete = (onConfirm: () => void) => {
    confirmAlert({
      title: "Xác nhận",
      message: "Bạn có chắc chắn muốn xóa kích cỡ này?",
      buttons: [
        {
          label: "Có",
          onClick: onConfirm,
        },
        {
          label: "Không",
          // Không làm gì khi người dùng chọn không
        },
      ],
    });
  };

  const deleteSizeItems = (record: any) => {
    confirmDelete(async () => {
      try {
        const response = await SizeService.deleteSize(
          record.sizeId!
        );
        console.log("Delete response:", response);
        if (response.code === 0) {
          confirmAlert({
            title: "Thành công",
            message: "Xóa kich cỡ thành công!",
            buttons: [
              {
                label: "OK",
                onClick: () => {
                  // Cập nhật danh sách chất liệu và re-render
                  setShouldRender((prev) => !prev);
                },
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error deleting size:", error);
      }
    });
  };

  const editSizeItems = (record: any) => {
    setOpenEditModal({
      open: true,
      data: record,
    });
  };
  const confirmSave = (onConfirm: () => void, action: string) => {
    confirmAlert({
      title: "Xác nhận",
      message: `Bạn có chắc chắn muốn ${action} kích cỡ này?`,
      buttons: [
        {
          label: "Có",
          onClick: onConfirm,
        },
        {
          label: "Không",
          // Không làm gì khi người dùng chọn không
        },
      ],
    });
  };
  const confirmEdit = (onConfirm: () => void) => {
    confirmAlert({
      title: "Xác nhận",
      message: "Bạn có chắc chắn muốn lưu thay đổi?",
      buttons: [
        {
          label: "Có",
          onClick: onConfirm,
        },
        {
          label: "Không",
          // Không làm gì khi người dùng chọn không
        },
      ],
    });
  };

  const onFinishEdit = async (values: any) => {
    confirmEdit(async () => {
      try {
        const response = await SizeService.updateSize({
          ...values,
          sizeId: openEditModal.data.sizeId,
        });

        if (response.code === 0) {
          // Đóng modal sau khi thao tác thành công
          setOpenEditModal({ open: false, data: {} });

          // Hiển thị thông báo xác nhận
          confirmAlert({
            title: "Thành công",
            message: "Kích cỡ đã được cập nhật thành công!",
            buttons: [
              {
                label: "OK",
                onClick: () => {
                  // Cập nhật danh sách chất liệu và re-render
                  setShouldRender((prev) => !prev);
                },
              },
            ],
          });
        } else {
          console.error("Error:", response.data.message);
          // Nếu cần, hiển thị thông báo lỗi
        }
      } catch (error) {
        console.error("Error updating size:", error);
        // Nếu cần, hiển thị thông báo lỗi
      }
    });
  };

  const onFinishCreate = async (values: any) => {
    confirmSave(async () => {
      try {
        const response = await SizeService.createSize(values);
        if (response.code === 0) {
          // setOpenCreateModal(false);
          confirmAlert({
            title: "Thành công",
            message: "Kích cỡ đã được thêm thành công!",
            buttons: [
              {
                label: "OK",
                onClick: () => {
                  // Cập nhật danh sách chất liệu và re-render
                  setShouldRender((prev) => !prev);
                },
              },
            ],
          });
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating size:", error);
      }
    }, "thêm mới");
  };

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
          dataSource={sizes}
          pagination={false}
          className="ant-border-space"
        />
      </div>

      <Modal
        title="Create size"
        centered
        visible={isOpenCreateModal}
        destroyOnClose={true}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        width={750}
      >
        <Form
          name="createssize"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{}}
          onFinish={onFinishCreate}
          autoComplete="off"
        >
          <Form.Item
            label="Kích cỡ"
            name="name"
            rules={[
              { required: true, message: "Please input the size name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setOpenCreateModal(false);
              }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit size"
        centered
        visible={openEditModal.open}
        destroyOnClose={true}
        onCancel={() => setOpenEditModal({ open: false, data: {} })}
        footer={null}
        width={750}
      >
        <Form
          name="editssize"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={openEditModal.data}
          onFinish={onFinishEdit}
          autoComplete="off"
        >
          <Form.Item
            label="size Name"
            name="name"
            rules={[
              { required: true, message: "Please input the size name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setOpenEditModal(false);
              }}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
