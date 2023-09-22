import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// Pages
import Home from "./pages/homeView/Home/Home";

// Components
import { ClientView } from "./pages/dashboard/ClientView/ClientView";
import ProjectView from "./pages/dashboard/projects/ProjectView/ProjectView";
import NotFound from "./pages/NotFound/NotFound";
import AddClient from "./pages/homeView/AddClient/AddClient";
import ClientDashboard from "./pages/dashboard/profile/ClientDashboard/ClientDashboard";
import AddProject from "./pages/dashboard/projects/AddProject/AddProject";
import EditClient from "./pages/homeView/EditClient/EditClient";
import ClientInvoices from "./pages/dashboard/billing/ClientInvoices/ClientInvoices";
import AddInvoice from "./pages/dashboard/billing/AddInvoice/AddInvoice";
import Navigation from "./components/Navigation/Navigation";
import ClientBilling from "./pages/dashboard/billing/ClientBilling/ClientBilling";
import ClientTransactionsView from "./pages/dashboard/billing/ClientTransactionsView/ClientTransactionsView";
import AddTransaction from "./pages/dashboard/billing/AddTransaction/AddTransaction";
import MainDashboard from "./pages/homeView/MainDashboard/MainDashboard";
import { AddService } from "./pages/dashboard/projects/AddService/AddService";
import ProjectServices from "./pages/dashboard/projects/ProjectServices/ProjectServices";
import ProjectActivity from "./pages/dashboard/projects/ProjectActivity/ProjectActivity";
import ProjectProfile from "./pages/dashboard/projects/ProjectProfile/ProjectProfile";
import ProjectFinancials from "./pages/dashboard/projects/ProjectFinancials/ProjectFinancials";
import ProjectInvoices from "./pages/dashboard/projects/ProjectInvoices/ProjectInvoices";
import ProjectInvoice from "./pages/dashboard/projects/ProjectInvoice/ProjectInvoice";
import { ProjectTransactions } from "./pages/dashboard/projects/ProjectTransactions/ProjectTransactions";
import ProjectTransaction from "./pages/dashboard/projects/ProjectTransaction/ProjectTransaction";
import Projects from "./pages/Projects/Projects";
import Clients from "./pages/Clients/Clients";
import EditProject from "./pages/dashboard/projects/EditProject/EditProject";
import { ProjectService } from "./pages/dashboard/projects/ProjectService/ProjectService";

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
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5080/graphql",
  cache,
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navigation />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
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
                  <Route
                    element={<ProjectService />}
                    path="/clients/:clientId/projects/:projectId/services/:serviceId"
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
                    path="/clients/:clientId/projects/:projectId/financials/addInvoice"
                    element={<AddInvoice />}
                  />
                  <Route
                    path="/clients/:clientId/projects/:projectId/financials/addTransaction"
                    element={<AddTransaction />}
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
              <Route path="/projects" element={<Projects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
