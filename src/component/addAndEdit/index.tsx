import { Button, Form, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { UserReords } from "../../appInterface/CrudInterface";
import {
  createUserRecord,
  retrieveUser,
  updateUser,
} from "../../feature/crudSlice";
interface FormProps {
  userName: string;
  email: string;
  phone: string;
}

const AddAndEdit = () => {
  const navigation = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { userRecord, loading } = useAppSelector((state) => state.crud);
  console.log(userRecord, loading);
  useEffect(() => {
    dispatch(retrieveUser());
    if (id && userRecord.length > 0) {
      setEdit(true);
      const singleUser = userRecord.find((item) => item.id == Number(id));
      console.log(singleUser);
      form.setFieldsValue({ ...singleUser, userName: singleUser?.userName });
    }
  }, [userRecord.length > 0]);
  const handleSubmit = (values: UserReords) => {
    if (!edit) {
      dispatch(createUserRecord({ ...values, id: Date.now() }));
      navigation("/");
    } else {
      dispatch(updateUser({ ...values, id: Number(id) }));
      setEdit(false);
      navigation("/");
    }
  };
  return (
    <div className="add_edit_wrap">
      <div style={{ textAlign: "center", padding: "10px", fontSize: "30px" }}>
        {edit ? "Edit User" : "Add User"}
      </div>
      <div>
        <Form
          name="useraddedit"
          labelCol={{
            span: 8,
          }}
          // wrapperCol={{
          //   span: 16,
          // }}
          form={form}
          onFinish={handleSubmit}
          className="add_edit_antd"
        >
          <Form.Item
            name={"userName"}
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input type={"text"} placeholder="username" />
          </Form.Item>
          <Form.Item
            name={"email"}
            label={"Email"}
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="email" type={"email"} />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label={"Phone"}
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
            ]}
          >
            <Input type={"text"} placeholder="phone" />
          </Form.Item>
          <Form.Item
            name={"city"}
            label="City"
            rules={[
              {
                required: true,
                message: "Please select city",
              },
            ]}
          >
            <Select placeholder="Select City">
              <option value={"prime1"}>Prime 1</option>
              <option value={"prime2"}>Prime 2</option>
            </Select>
          </Form.Item>
          <Form.Item name={"person"} label="Person">
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="add_edit_button"
            >
              {edit ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default AddAndEdit;
