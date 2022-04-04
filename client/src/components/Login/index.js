import { useState } from "react";
import { postLogin } from "../../api/loginApis/postLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthCookie } from "../../reducers/cookieReducer";
import "./index.css";
import { Row, Col, Form, Input, Button, notification } from "antd";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetPassword = () => {
    navigate("/reset-password");
  };

  const onFinishHandler = async (values) => {
    const result = await postLogin({
      ...values,
    });
    if (result.status === 200) {
      dispatch(setAuthCookie(true));
      navigate("/");
    } else if (result.status === 422) {
      setErrors(result?.data?.error ?? []);
    } else {
      notification["error"]({
        message: `Login Error`,
        description: result?.data?.response,
      });
    }
  };

  const errorCheckFiled = (fieldName) => {
    const field = errors.filter((item) => item.param === fieldName);
    if (fieldName in field) {
      return {
        status: "error",
        message: field?.msg,
      };
    } else {
      return {
        status: "success",
        message: "",
      };
    }
  };

  return (
    <Row justify="center">
      <Form
        className="product-form"
        name="login-form"
        onFinish={onFinishHandler}
        autoComplete="off"
      >
        <Form.Item
          className="label-field"
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          validateStatus={errorCheckFiled("email")?.status}
          help={errorCheckFiled("email")?.message}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-field"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input the password!" }]}
          validateStatus={errorCheckFiled("password")?.status}
          help={errorCheckFiled("password")?.message}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Row justify="center">
            <Col flex={2}>
              <Button
                className="general-button"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
            <Col flex={2}>
              <Button
                className="general-button"
                type="primary"
                onClick={resetPassword}
              >
                Reset-Password
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
