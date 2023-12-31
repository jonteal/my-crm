import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useContext } from "react";
import { ThemeContext } from "./context";

// Components
import { Home } from "./pages/homeView/Home/Home";
import { ClientView } from "./pages/dashboard/ClientView/ClientView";
import { ProjectView } from "./pages/dashboard/projects/ProjectView/ProjectView";
import { NotFound } from "./pages/NotFound/NotFound";
import { AddClient } from "./pages/homeView/AddClient/AddClient";
import { ClientDashboard } from "./pages/dashboard/profile/ClientDashboard/ClientDashboard";
import { AddProject } from "./pages/dashboard/projects/AddProject/AddProject";
import { EditClient } from "./pages/homeView/EditClient/EditClient";
import { ClientInvoices } from "./pages/dashboard/billing/ClientInvoices/ClientInvoices";
import { AddInvoice } from "./pages/dashboard/billing/AddInvoice/AddInvoice";
import { Navigation } from "./components/Navigation/Navigation";
import { ClientBilling } from "./pages/dashboard/billing/ClientBilling/ClientBilling";
import { ClientTransactionsView } from "./pages/dashboard/billing/ClientTransactionsView/ClientTransactionsView";
import { AddTransaction } from "./pages/dashboard/billing/AddTransaction/AddTransaction";
import { MainDashboard } from "./pages/homeView/MainDashboard/MainDashboard";
import { AddService } from "./pages/dashboard/projects/AddService/AddService";
import { ProjectServices } from "./pages/dashboard/projects/ProjectServices/ProjectServices";
import { ProjectActivity } from "./pages/dashboard/projects/ProjectActivity/ProjectActivity";
import { ProjectProfile } from "./pages/dashboard/projects/ProjectProfile/ProjectProfile";
import { ProjectFinancials } from "./pages/dashboard/projects/ProjectFinancials/ProjectFinancials";
import { ProjectKanban } from "./pages/dashboard/projects/ProjectKanban/ProjectKanban";
import { AddKanbanTicket } from "./pages/dashboard/projects/AddKanbanTicket/AddKanbanTicket";
import { ProjectInvoices } from "./pages/dashboard/projects/ProjectInvoices/ProjectInvoices";
import { ProjectInvoice } from "./pages/dashboard/projects/ProjectInvoice/ProjectInvoice";
import { ProjectTransactions } from "./pages/dashboard/projects/ProjectTransactions/ProjectTransactions";
import { ProjectTransaction } from "./pages/dashboard/projects/ProjectTransaction/ProjectTransaction";
import { Projects } from "./pages/Projects/Projects";
import { Clients } from "./pages/Clients/Clients";
import { EditProject } from "./pages/dashboard/projects/EditProject/EditProject";
import { ProjectService } from "./pages/dashboard/projects/ProjectService/ProjectService";
import { ProjectServicesByProvider } from "./pages/dashboard/projects/ProjectServicesByProvider/ProjectServicesByProvider";
import { ClientProjects } from "./pages/dashboard/projects/ClientProjects/ClientProjects";
import { TicketView } from "./pages/dashboard/projects/TicketView/TicketView";
import { EditKanbanTicket } from "./pages/dashboard/projects/EditKanbanTicket/EditKanbanTicket";
import { ClientsListByStatus } from "./pages/Clients/ClientsListByStatus/ClientsListByStatus";
import { EditService } from "./pages/dashboard/projects/EditService/EditService";
import { Login } from "./pages/Auth/Login/Login";
import { Signup } from "./pages/Auth/Signup/Signup";

import "./App.css";

if (process.env.NODE_ENV === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        members: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        invoices: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        transactions: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        services: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projectActivityComments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        clientActivityComments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        clientActivityCommentReplies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projectActivityCommentReplies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        tickets: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5080/graphql",
  cache,
});

export const App = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const isAuth = false;

  return (
    <div
      className={`App transform xl:translate-x-0 ease-in-out transition duration-500 ${
        darkMode ? "bg-sky-950 h-screen" : "white"
      } ${darkMode ? "text-sky-50" : "text-slate-900"}`}
    >
      <ApolloProvider client={client}>
        <Router>
          <Navigation />
          <div>
            <Routes>
              <Route path="/" element={isAuth ? <Home /> : <Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/dashboard" element={<MainDashboard />} />
              <Route path="/addClient" element={<AddClient />} />
              <Route path="/clients/:clientId" element={<ClientView />}>
                <Route
                  path="/clients/:clientId/dashboard"
                  element={<ClientDashboard />}
                />
                <Route
                  path="/clients/:clientId/billing"
                  element={<ClientBilling />}
                />
                <Route
                  path="/clients/:clientId/projects"
                  element={<ClientProjects />}
                />
                <Route
                  path="/clients/:clientId/addInvoice"
                  element={<AddInvoice />}
                />
                <Route
                  path="/clients/:clientId/addTransaction"
                  element={<AddTransaction />}
                />
                <Route
                  path="/clients/:clientId/projects/:projectId"
                  element={<ProjectView />}
                >
                  <Route
                    element={<ProjectProfile />}
                    path="/clients/:clientId/projects/:projectId/profile"
                  />
                  <Route
                    element={<ProjectServices />}
                    path="/clients/:clientId/projects/:projectId/services"
                  />
                  {/* <Route
                    element={<ProjectServicesByProvider />}
                    path="/clients/:clientId/projects/:projectId/services/:serviceProvider"
                  /> */}
                  <Route
                    element={<ProjectService />}
                    path="/clients/:clientId/projects/:projectId/services/:serviceId"
                  />
                  <Route
                    element={<EditService />}
                    path="/clients/:clientId/projects/:projectId/services/:serviceId/edit"
                  />
                  <Route
                    element={<ProjectActivity />}
                    path="/clients/:clientId/projects/:projectId/activity"
                  />
                  <Route
                    element={<ProjectFinancials />}
                    path="/clients/:clientId/projects/:projectId/financials"
                  />
                  <Route
                    element={<ProjectKanban />}
                    path="/clients/:clientId/projects/:projectId/kanban"
                  />
                  <Route
                    element={<AddKanbanTicket />}
                    path="/clients/:clientId/projects/:projectId/kanban/addTicket"
                  />
                  <Route
                    element={<EditKanbanTicket />}
                    path="/clients/:clientId/projects/:projectId/kanban/:ticketId/edit"
                  />
                  <Route
                    element={<TicketView />}
                    path="/clients/:clientId/projects/:projectId/kanban/:ticketId"
                  />
                  <Route
                    element={<ProjectInvoices />}
                    path="/clients/:clientId/projects/:projectId/financials/invoices"
                  />
                  <Route
                    element={<ProjectTransactions />}
                    path="/clients/:clientId/projects/:projectId/financials/transactions"
                  />
                  <Route
                    element={<ProjectTransaction />}
                    path="/clients/:clientId/projects/:projectId/financials/transactions/:transactionId"
                  />
                  <Route
                    element={<ProjectInvoice />}
                    path="/clients/:clientId/projects/:projectId/financials/invoices/:invoiceId"
                  />
                  <Route
                    path="/clients/:clientId/projects/:projectId/addService"
                    element={<AddService />}
                  />
                  <Route
                    path="/clients/:clientId/projects/:projectId/edit"
                    element={<EditProject />}
                  />
                </Route>

                <Route
                  path="/clients/:clientId/edit"
                  element={<EditClient />}
                />
                <Route
                  path="/clients/:clientId/billing/invoices"
                  element={<ClientInvoices />}
                />
                <Route
                  path="/clients/:clientId/billing/transactions"
                  element={<ClientTransactionsView />}
                />
              </Route>
              <Route path="/addProject" element={<AddProject />} />
              <Route path="/clients" element={<Clients />} />
              <Route
                path="/clients/list/:status"
                element={<ClientsListByStatus />}
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
};
