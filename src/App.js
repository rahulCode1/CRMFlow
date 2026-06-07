import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./utils/chartSetup";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LeadForm, { action as addLeadAction } from "./pages/LeadForm";
import RootLayout from "./components/RootLayout";
import { LeadProvider } from "./context/LeadContext";
import ErrorPage from "./pages/ErrorPage";
import AddNewAgent from "./pages/AddNewAgent";
import SalesAgent from "./pages/SalesAgents";
import DashboardScreen, {
  loader as allLeadsLoader,
} from "./pages/DashboardScreen";
import LeadManagementPage, {
  loader as leadManagementLoader,
  actions as commentAction,
} from "./pages/LeadManagementPage";
import LeadsList from "./pages/LeadsList";
import ReportPage from "./pages/ReportPage";
import LeadStatusViewPage from "./pages/LeadStatusViewPage";
import EditLeadPage, { action as editLeadAction } from "./pages/EditLeadPage";
import LeadsBySalesAgentPage from "./pages/LeadsBySalesAgentPage";
import SettingLayout from "./components/layout/SettingLayout";
import SettingLeadsPage, {
  action as deleteLeadAction,
} from "./components/setting/SettingLeadsPage";
import SalesAgents from "./components/setting/SalesAgent";
import LoginPage from "../src/pages/LoginPage";
import VerifyLogin from "./pages/VerifyLogin";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    loader: allLeadsLoader,
    id: "allLeads",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <DashboardScreen /> },
      { path: "login", element: <LoginPage /> },
      { path: "v1/profile/google", element: <VerifyLogin /> },
      {
        path: "leads",
        children: [
          { index: true, element: <LeadsList /> },
          {
            path: ":id",
            loader: leadManagementLoader,
            id: "leadId",
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoutes>
                    <LeadManagementPage />
                  </ProtectedRoutes>
                ),
                action: commentAction,
              },
              {
                path: "edit",
                element: (
                  <ProtectedRoutes>
                    <EditLeadPage />
                  </ProtectedRoutes>
                ),
                action: editLeadAction,
              },
            ],
          },
          {
            path: "addLeads",
            element: (
              <ProtectedRoutes>
                <LeadForm />
              </ProtectedRoutes>
            ),
            action: addLeadAction,
          },
          { path: "newLeads", element: <LeadStatusViewPage /> },
          { path: "leadByAgents", element: <LeadsBySalesAgentPage /> },
        ],
      },
      {
        path: "salesAgent",
        children: [
          { index: true, element: <SalesAgent /> },
          {
            path: "add",
            element: (
              <ProtectedRoutes>
                <AddNewAgent />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      { path: "report", element: <ReportPage /> },
      {
        path: "setting",
        element: <SettingLayout />,
        children: [
          { index: true, element: <Navigate to={"leads"} replace /> },
          {
            path: "leads",
            element: (
              <ProtectedRoutes>
                <SettingLeadsPage />
              </ProtectedRoutes>
            ),
            action: deleteLeadAction,
          },
          { path: "agents", element: <SalesAgents /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <LeadProvider>
      <RouterProvider router={router} />
    </LeadProvider>
  );
}

export default App;
