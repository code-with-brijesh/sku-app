import React from "react";
import { lazy } from "react";
import Loadable from "../components/layout/Loadable";
import Layout from "../components/layout/layout";
// Custom components
// import MinimalLayout from "layout/MinimalLayout";

// Dynamic imports with lazy loading
// Loadable HOC (Higher Order Component) for code splitting

const Skus = Loadable(lazy(() => import("../pages/skus"))); // Lazy-loaded sku page

// Routes for authentication
const LoginRoutes = [
  {
    path: "/", // Root path
    element: <Layout />, // Layout component for non-authenticated pages
    children: [
      {
        path: "/", // Home path
        element: <Skus />, // Home page component
      }
    ],
  }
];

export default LoginRoutes;
