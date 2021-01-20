import React, { memo } from "react";
import { Form, Input, Button } from "antd";

import LoginContainer from "components/LoginContainer";
import { LoginFrame } from "./style";
import { loginRequest } from "servers/login";
// import { getPersonnelList } from "../../servers/personnel";

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const Login = memo((props) => {
  const onFinish = (values) => {
    const { username, password } = values;
    loginRequest(username, password).then((res) => {
      console.log(res);
    });
  };

  return (
    <LoginContainer>
      <LoginFrame>
        <a
          href="/register"
          className="fa fa-exchange exchange-icon"
          aria-hidden="true"
        >
          {" "}
        </a>
        <div className="loginTitle">登录</div>

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

          <Form.Item>
            <Button type="primary" className="enterBut" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </LoginFrame>
    </LoginContainer>
  );
});

export default Login;
