import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select, Table, message, DatePicker } from "antd";
import { toast } from "react-toastify";
import UserService from "../services/userApi";
import dayjs from "dayjs";

const { Option } = Select;

enum UserStatus {
  ACTIVE = "LAM_VIEC",
  INACTIVE = "NGHI_VIEC",
}

interface User {
  userId: number;
  userName: string;
  email: string;
  phone: string;
  fullName: string;
  birth: string;
  roles: string; // Đảm bảo vai trò luôn là chuỗi
  status: string;
  password?: string;  // Tùy chọn cho việc chỉnh sửa người dùng hiện tại
  roleId?: number; // Thêm roleId
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
        console.log('Phản hồi đầy đủ:', userResponse);

        if (Array.isArray(userResponse)) {
          setUsers(userResponse);
        } else {
          console.error("Định dạng dữ liệu không hợp lệ:", userResponse);
        }
      } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
        toast.error("Lỗi khi lấy người dùng.");
      }
    })();
  }, []);

  const onFinish = async (values: any) => {
    try {
      let response;
      const birth = values.birth?.format('YYYY-MM-DD');
      const data = { ...values, birth, roleId: values.roles }; // Sửa `roleId` từ `roles`

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

      if (response && response.data) {
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
      toast.error("Lỗi khi xử lý dữ liệu.");
    }
  };

  const handleEditUser = (user: User) => {
    if (user && user.userId !== undefined) {
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
        roles: user.roleId, // Đặt roleId khi chỉnh sửa
        status: user.status,
        password: '',  
      });
    } else {
      console.error("Dữ liệu người dùng không hợp lệ:", user);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birth',
      key: 'birth',
      render: (text: string) => <span>{dayjs(text).format('DD-MM-YYYY')}</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
      render: (text: string) => <span>{text}</span>, // Bạn có thể thay đổi cách hiển thị vai trò nếu cần
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <span>{text === UserStatus.ACTIVE ? 'Hoạt động' : 'Ngừng hoạt động'}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text: string, record: User) => (
        <Button onClick={() => handleEditUser(record)}>Sửa</Button>
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
            rules={[{ required: true, message: "Tên người dùng là bắt buộc" }]}
          >
            <Input placeholder="Nhập tại đây" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Email là bắt buộc" }]}
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
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="roles" 
            label="Vai trò"
            rules={[{ required: true, message: "Vai trò là bắt buộc" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value={3}>Quản trị viên</Option>
              <Option value={2}>Thành viên</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select placeholder="Chọn trạng thái">
              <Option value={UserStatus.ACTIVE}>Hoạt động</Option>
              <Option value={UserStatus.INACTIVE}>Ngừng hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: modalInfo.mode === "create", message: "Mật khẩu là bắt buộc" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {modalInfo.mode === "create" ? "Thêm" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default UserPage;
