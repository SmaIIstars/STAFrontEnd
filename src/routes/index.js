import { Redirect } from "react-router-dom";

import Personnel from "../views/Personnel";
import Project from "../views/Project";
import Paper from "../views/Paper";
import Patent from "../views/Patent";
import Monograph from "../views/Monograph";
import SRTA from "../views/SRTA";
import Meeting from "../views/Meeting";

import Authority from "../views/Authority";

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

  {
    path: "/paper",
    component: Paper,
  },

  {
    path: "/patent",
    component: Patent,
  },

  {
    path: "/monograph",
    component: Monograph,
  },

  {
    path: "/srta",
    component: SRTA,
  },

  {
    path: "/meeting",
    component: Meeting,
  },

  {
    path: "/authority",
    component: Authority,
  },
];

export default mainRoutes;
