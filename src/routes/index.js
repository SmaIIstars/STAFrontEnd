import { Redirect } from "react-router-dom";

import Personnel from "../views/Personnel";
import Project from "../views/Project";
import Login from "../views/Login";

export const mainRoutes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/personnel" />,
  },
  {
    path: "/personnel",
    component: Personnel,
  },
  {
    path: "/project",
    component: Project,
  },
];

export const otherRoutes = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
];
