import Dashboard from "./pages/dashboard";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  CreateCustomer,
  CreateInventory,
  CreateOrder,
  CreateService,
  CreateStaff,
  Customers,
  EditCustomer,
  EditInventory,
  EditOrder,
  EditService,
  EditStaff,
  Inventory,
  Login,
  Orders,
  Reports,
  Services,
  Staff,
  ViewCustomer,
  ViewInventory,
  ViewOrder,
  ViewService,
  ViewStaff,
} from "./pages";
import { Layout } from "./components";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "orders",
        element: <Outlet />,
        children: [
          {
            index: true,
            path: "",
            element: <Orders />,
          },
          {
            path: ":orderId",
            element: <ViewOrder />,
          },
          {
            path: ":orderId/edit",
            element: <EditOrder />,
          },
          {
            path: "new",
            element: <CreateOrder />,
          },
        ],
      },
      {
        path: "services",
        element: <Outlet />,
        children: [
          {
            index: true,
            path: "",
            element: <Services />,
          },
          {
            path: ":serviceId",
            element: <ViewService />,
          },
          {
            path: ":serviceId/edit",
            element: <EditService />,
          },
          {
            path: "new",
            element: <CreateService />,
          },
        ],
      },
      {
        path: "customers",
        element: <Outlet />,
        children: [
          {
            index: true,
            path: "",
            element: <Customers />,
          },
          {
            path: ":customerId",
            element: <ViewCustomer />,
          },
          {
            path: ":customerId/edit",
            element: <EditCustomer />,
          },
          {
            path: "new",
            element: <CreateCustomer />,
          },
        ],
      },
      {
        path: "inventory",
        element: <Outlet />,
        children: [
          {
            index: true,
            path: "",
            element: <Inventory />,
          },
          {
            path: ":itemId",
            element: <ViewInventory />,
          },
          {
            path: ":itemId/edit",
            element: <EditInventory />,
          },
          {
            path: "new",
            element: <CreateInventory />,
          },
        ],
      },
      {
        path: "staff",
        element: <Outlet />,
        children: [
          {
            index: true,
            path: "",
            element: <Staff />,
          },
          {
            path: ":staffId",
            element: <ViewStaff />,
          },
          {
            path: ":staffId/edit",
            element: <EditStaff />,
          },
          {
            path: "new",
            element: <CreateStaff />,
          },
        ],
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/profile",
        element: <Login />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
