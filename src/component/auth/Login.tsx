import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { UserReords } from "../../appInterface/CrudInterface";
import { login, retrieveUser } from "../../feature/authSlice";

const Login = () => {
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
      (item: UserReords) =>
        item.email == values.email && item.password == values.password
    );
    console.log(findUser);
    if (findUser || userRecord.length === 0) {
      dispatch(login(values));
      setMessage("Login success");
      form.setFieldsValue({
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigation("/");
        window.location.reload();
      }, 5000);
    } else {
      setMessage("User doesnt exist");
    }
  };
  return (
    <div>
      <div className="add_edit_wrap">
        <div style={{ textAlign: "center", padding: "10px", fontSize: "30px" }}>
          Login
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
            User doesnt exist <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
