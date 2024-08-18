import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main, UncontrolledForm, ReactHookForm } from "./pages";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/uncontrolled-approach",
    element: <UncontrolledForm />,
  },
  {
    path: "react-hook-form",
    element: <ReactHookForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
