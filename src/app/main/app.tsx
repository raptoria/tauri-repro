import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: () => <div>Tauri test</div>,
    handle: { title: "Login" },
  },
]);

export const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<span>404</span>}
      future={{
        // Wrap all state updates in React.startTransition()
        v7_startTransition: true,
      }}
    />
  );
};
