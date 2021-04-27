import React, { memo, useState } from "react";
import { Layout, Spin } from "antd";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
// import { HashRouter } from "react-router-dom";

import mainRoutes from "./routes";
import "assets/local_data.js";

import { MainLayout } from "./style";
import Sider from "views/layout/Sider";
import Header from "views/layout/Header";
// import Footer from "views/layout/Footer";
import Login from "views/Login";
import Register from "./views/Register";

const App = memo(function App(props) {
  const { Content } = Layout;
  const loading = useSelector(
    (state) => state.getIn(["app", "loading"]),
    shallowEqual
  );
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const getSiderCollapsed = (status) => {
    setSiderCollapsed(status);
  };

  return (
    <BrowserRouter>
      {/* <HashRouter> */}
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <MainLayout>
          <Layout className="layoutwrapper">
            <Sider getSiderCollapsed={getSiderCollapsed} />
            <Layout
              className="site-layout"
              style={siderCollapsed ? { marginLeft: 80 } : { marginLeft: 200 }}
            >
              <Header />
              <Spin spinning={loading} wrapperClassName="page-loading">
                <Content>{renderRoutes(mainRoutes)}</Content>
                {/* Copyright */}
                {/* <Footer /> */}
              </Spin>
            </Layout>
          </Layout>
        </MainLayout>
      </Switch>
      {/* </HashRouter> */}
    </BrowserRouter>
  );
});

export default App;
