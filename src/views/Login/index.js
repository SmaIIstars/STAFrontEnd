import React, { memo } from "react";
import { useHistory } from "react-router";
import { Form, Input, Button, message } from "antd";

import { loginRequest } from "servers/login";

import LoginContainer from "components/LoginContainer";
import { user } from "assets/local_data";
import { LoginFrame } from "./style";

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const Login = memo((props) => {
  const history = useHistory();

  const onFinish = (values) => {
    const { email, password } = values;
    loginRequest(email, password)
      .then((res) => {
        const { data } = res;
        // successful
        if (data.code === 1001) {
          message.success("succesful");
          const { token, username, authority } = data.data;
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("authority", authority);
          localStorage.setItem("email", email);

          // This value needs to be update immediately, otherwise it will cause error during Sider rendering. LocalStorage value, although update immediately, but can't available during the rendering.
          user.authority = authority;

          history.push("/personnel");
        } else {
          message.error({
            content: data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
            rules={[{ required: true, message: "请输入邮箱!" }]}
            name="email"
            label={
              <div>
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>邮箱</span>
              </div>
            }
            className="form-label"
          >
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "请输入密码!" }]}
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
