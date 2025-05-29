import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import TaskDetail from "../pages/TaskDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "task-detail/:id",
        element: <TaskDetail />,
      },
    ],
  },
]);

export default router;
