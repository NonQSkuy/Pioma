import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./services/routes";

createRoot(document.getElementById("root")!).render(
  // <QueryClientProvider client={reactQueryClient}>
  // <Provider store={store}>
  <RouterProvider
    router={createBrowserRouter(routes, {
      basename: import.meta.env.VITE_BASE_PATH || "",
    })}
  />,
  // </Provider>
  // </QueryClientProvider>
);
