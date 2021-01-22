import { Redirect } from "react-router-dom";

import Personnel from "../views/Personnel";
import Project from "../views/Project";

const mainRoutes = [
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

export default mainRoutes;
