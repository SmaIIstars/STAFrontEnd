import React, { memo } from "react";
import { Form, Input, Button } from "antd";

import LoginContainer from "components/LoginContainer";
import { RegisterFrame } from "./style";

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const Register = memo((props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <LoginContainer>
      <RegisterFrame>
        <a
          href="/login"
          className="fa fa-exchange exchange-icon"
          aria-hidden="true"
        >
          {" "}
        </a>
        <div className="registerTitle">注册</div>

        <Form
          {...formItemLayout}
          layout={"vertical"}
          onFinish={onFinish}
          className="form"
        >
          <Form.Item
            rules={[{ required: true, message: "Please input your Username!" }]}
            name="username"
            label={
              <div>
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>用户名</span>
              </div>
            }
            className="form-label"
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please input your Password!" }]}
            name="password"
            label={
              <div>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>密码</span>
              </div>
            }
            className="form-label"
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please input your Email!" }]}
            name="email"
            label={
              <div>
                <i className="fa fa-email" aria-hidden="true"></i>
                <span>邮箱</span>
              </div>
            }
            className="form-label"
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="enterBut" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </RegisterFrame>
    </LoginContainer>
  );
});

export default Register;
