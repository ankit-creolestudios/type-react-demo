import { Button, Form, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { UserReords } from "../../appInterface/CrudInterface";
import { createUserRecord, retrieveUser } from "../../feature/authSlice";

const Register = () => {
  const navigation = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(retrieveUser());
  }, []);
  const { userRecord, loading } = useAppSelector((state) => state.auth);
  console.log(userRecord);
  const [form] = Form.useForm();
  const handleSubmit = (values: UserReords) => {
    const findUser = userRecord?.find(
      (item: UserReords) => item.email == values.email
    );
    console.log(findUser);
    if (!findUser || userRecord.length === 0) {
      dispatch(createUserRecord({ ...values, id: Date.now() }));
      form.setFieldsValue({
        userName: "",
        email: "",
        phone: "",
        city: "",
        person: "",
        password: "",
        confirm: "",
      });
      navigation("/login");
    } else {
      setMessage("User already exist");
    }
  };
  return (
    <div>
      <div className="add_edit_wrap">
        <div style={{ textAlign: "center", padding: "10px", fontSize: "30px" }}>
          Register
        </div>
        <div className="register__already">{message !== "" && message}</div>
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
              {
                pattern: new RegExp(/^[a-zA-Z0-9]{2,}$/),
                message: "User name contain only characters and numbers",
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
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                pattern: new RegExp(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                ),
                message:
                  "Password must contain one upper case,lower case,number and special character and min 8 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
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
              Register
            </Button>
          </Form.Item>
          <div className="register__pure">
            Already register <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
