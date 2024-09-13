import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  message,
  DatePicker,
} from "antd";
import { toast } from "react-toastify";
import UserService from "../services/userApi";
import dayjs from "dayjs";

const { Option } = Select;

interface User {
  userId: number;
  userName: string;
  email: string;
  phone: string;
  fullName: string;
  birth: string;
  roles: string[];
  status: boolean;
  password?: string;  // Optional for editing existing users
}

interface ModalInfo {
  open: boolean;
  mode: "create" | "edit";
  data?: User;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ open: false, mode: "create" });
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      try {
        const userResponse = await UserService.getUsers();
        setUsers(userResponse.data || []);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải người dùng.");
      }
    })();
  }, []);

  const onFinish = async (values: any) => {
    try {
      let response;
      // Convert date to string before sending
      const birth = values.birth?.format('YYYY-MM-DD');
      const data = { ...values, birth };

      // Remove empty password field if updating
      if (!data.password) delete data.password;

      if (modalInfo.mode === "create") {
        response = await UserService.createUser(data);
        toast.success("Thêm người dùng thành công!");
      } else {
        if (modalInfo.data?.userId) {
          response = await UserService.updateUser(modalInfo.data.userId, data);
          toast.success("Cập nhật người dùng thành công!");
        } else {
          toast.error("ID người dùng không hợp lệ.");
          return;
        }
      }

      if (response) {
        setModalInfo({ open: false, mode: modalInfo.mode });
        setUsers((prev) =>
          modalInfo.mode === "create"
            ? [...prev, response.data]
            : prev.map((item) =>
                item.userId === response.data.userId ? response.data : item
              )
        );
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý dữ liệu.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await UserService.deleteUser(userId);
      setUsers((prev) =>
        prev.filter((item) => item.userId !== userId)
      );
      message.success("Xóa người dùng thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa người dùng.");
    }
  };

  const handleEditUser = (user: User) => {
    setModalInfo({
      open: true,
      mode: "edit",
      data: user,
    });
    form.setFieldsValue({
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      birth: user.birth ? dayjs(user.birth) : null,
      roles: user.roles,
      status: user.status,
      // Don't set the password if editing
      password: undefined,
    });
  };

  const columns = [
    {
      title: "Mã người dùng",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => Array.isArray(roles) ? roles.join(", ") : "",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Kích hoạt" : "Ngừng hoạt động"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditUser(record)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteUser(record.userId)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

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
      <Table columns={columns} dataSource={users} rowKey="userId" />

      <Drawer
        footer={null}
        placement="right"
        width={"50%"}
        destroyOnClose={true}
        open={modalInfo.open}
        title={
          <h3 className="mb-2 text-2xl font-bold text-center text-orange-600">
            {modalInfo.mode === "create" ? "THÊM MỚI" : "CẬP NHẬT"} NGƯỜI DÙNG
          </h3>
        }
        onClose={() => setModalInfo({ open: false, mode: modalInfo.mode })}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            label="Tên người dùng"
            rules={[{ required: true, message: "Tên người dùng không được để trống" }]}
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Email không được để trống" }]}
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Tên đầy đủ"
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="birth"
            label="Ngày sinh"
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="roles"
            label="Vai trò"
            rules={[{ required: true, message: "Vai trò không được để trống" }]}
          >
            <Select placeholder="Chọn vai trò" mode="multiple">
              <Option value="admin">Quản trị viên</Option>
              <Option value="user">Người dùng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          {modalInfo.mode === "create" && (
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Mật khẩu không được để trống" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          )}
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
        </Form>
      </Drawer>
    </>
  );
};

export default UserPage;
