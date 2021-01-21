import React, { memo } from "react";
import { Layout, Spin } from "antd";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
// import { HashRouter } from "react-router-dom";

import { mainRoutes } from "./routes";
import "assets/local_data.js";

import { MainLayout } from "./style";
import Sider from "views/layout/Sider";
import Header from "views/layout/Header";
import Footer from "views/layout/Footer";
import Login from "views/Login";
import Register from "./views/Register";

const App = memo(function App(props) {
  const { Content } = Layout;
  const loading = useSelector(
    (state) => state.getIn(["app", "loading"]),
    shallowEqual
  );

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
            <Sider />
            <Layout className="site-layout">
              <Header />
              <Spin spinning={loading} wrapperClassName="page-loading">
                <Content>{renderRoutes(mainRoutes)}</Content>
                <Footer />
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
