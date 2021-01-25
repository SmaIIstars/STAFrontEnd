import React, { memo, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import CryptoJS from "crypto-js";

import LoginContainer from "components/LoginContainer";
import { emailCaptcha } from "servers/register";

import { CAPTCHA_REMAINING_TIME } from "./constants";
import { RegisterFrame, CaptchaWrapper } from "./style";

const formItemLayout = {
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 24,
  },
};

const Register = memo((props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [captcha, setCaptcha] = useState();
  const [stamp, setStamp] = useState(0);
  const [hashCaptcha, setHashCaptcha] = useState("");

  const [captchaStatus, setCaptchaStatus] = useState(false);
  const [isCaptchaTimer, setIsCaptchaTimer] = useState(false);
  const [remainingTimer, setRemainingTimer] = useState(CAPTCHA_REMAINING_TIME);

  useEffect(() => {
    resetCaptcha(remainingTimer);
  }, [remainingTimer]);

  const changeText = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "captcha":
        setCaptcha(e.target.value);
        break;
      default:
        break;
    }
  };

  // captcha
  const getCaptcha = () => {
    setCaptchaStatus(false);
    setIsCaptchaTimer(true);
    setTimer();
    emailCaptcha({ username, email }).then((res) => {
      const { data } = res;
      setStamp(data.time);
      setHashCaptcha(data.captcha);
    });
  };

  const setTimer = () => {
    for (let i = 1; i <= CAPTCHA_REMAINING_TIME; i++) {
      setTimeout(() => {
        setRemainingTimer(CAPTCHA_REMAINING_TIME - i);
      }, i * 1000);
    }
  };

  const resetCaptcha = (time) => {
    if (time === 0) {
      setIsCaptchaTimer(false);
      setCaptchaStatus(true);
      setRemainingTimer(CAPTCHA_REMAINING_TIME);
    }
  };

  // register
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
            rules={[{ required: true, message: "请输入用户名!" }]}
            name="username"
            label={
              <div>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>用户名</span>
              </div>
            }
            className="form-label"
          >
            <Input
              name="username"
              placeholder="Username"
              value={username}
              onChange={changeText}
            />
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
            <Input.Password
              placeholder="Password"
              type="password"
              value={password}
              name="password"
              onChange={changeText}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: "请再次输入密码!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("两次密码不匹配!");
                },
              }),
            ]}
            name="password1"
            label={
              <div>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>再次输入密码</span>
              </div>
            }
            className="form-label"
          >
            <Input.Password
              placeholder="Password"
              type="password"
              name="password1"
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: "请输入邮箱!" },
              {
                validator(_, value) {
                  const email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                  if (value === "") {
                    return Promise.reject();
                  }

                  if (email_reg.test(value)) {
                    setCaptchaStatus(true);
                    return Promise.resolve();
                  }

                  setCaptchaStatus(false);
                  return Promise.reject("邮箱格式错误!");
                },
              },
            ]}
            name="email"
            label={
              <div>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                <span>邮箱</span>
              </div>
            }
            className="form-label"
          >
            <Input
              placeholder="Email"
              name="email"
              value={email}
              onChange={changeText}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: "请输入验证码!" },

              {
                validator(_, value) {
                  let val = CryptoJS.SHA512(stamp + value).toString(
                    CryptoJS.enc.Hex
                  );

                  if (!value || val === hashCaptcha) {
                    return Promise.resolve();
                  }
                  return Promise.reject("验证码错误!");
                },
              },
            ]}
            name="Captcha"
            label={
              <CaptchaWrapper>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>验证码</span>

                <Button disabled={!captchaStatus} onClick={getCaptcha}>
                  {isCaptchaTimer ? remainingTimer + " s" : "获取验证码"}
                </Button>
              </CaptchaWrapper>
            }
            className="form-label"
          >
            <Input
              placeholder="Captcha"
              name="captcha"
              value={captcha}
              onChange={changeText}
            />
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
