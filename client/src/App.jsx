import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// Pages
import Home from "./pages/Home/Home";
// import Header from "./components/Header/Header";

// Components
import ClientView from "./pages/ClientView/ClientView";
import ProjectView from "./pages/ProjectView/ProjectView";
import NotFound from "./pages/NotFound/NotFound";
import AddClient from "./pages/AddClient/AddClient";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import AddProject from "./pages/AddProject/AddProject";
import AddClientProject from "./pages/AddClientProject/AddClientProject";
import EditClient from "./pages/EditClient/EditClient";
import ClientInvoices from "./pages/ClientInvoices/ClientInvoices";
import AddInvoice from "./pages/AddInvoice/AddInvoice";
import Navigation from "./components/Navigation/Navigation";
import ClientTables from "./pages/ClientTables/ClientTables";
import ClientBilling from "./pages/ClientBilling/ClientBilling";
import ClientTransactionsView from "./pages/ClientTransactionsView/ClientTransactionsView";
// import EditProject from "./pages/EditProject/EditProject";
// import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
// import ClientsPage from "./pages/ClientsPage/ClientsPage";

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
              <Route path="/addClient" element={<AddClient />} />
              <Route path="/clients/:id" element={<ClientView />}>
                <Route
                  path="/clients/:id/dashboard"
                  element={<ClientDashboard />}
                />
                <Route path="/clients/:id/tables" element={<ClientTables />} />
                <Route
                  path="/clients/:id/billing"
                  element={<ClientBilling />}
                />
                <Route
                  path="/clients/:id/projects/:id"
                  element={<ProjectView />}
                />
                <Route
                  path="/clients/:id/addProject"
                  element={<AddClientProject />}
                />
                <Route path="/clients/:id/edit" element={<EditClient />} />
                <Route
                  path="/clients/:id/billing/invoices"
                  element={<ClientInvoices />}
                />
                <Route
                  path="/clients/:id/billing/addInvoice"
                  element={<AddInvoice />}
                />
                <Route
                  path="/clients/:id/billing/transactions"
                  element={<ClientTransactionsView />}
                />
              </Route>
              <Route path="/addProject" element={<AddProject />} />
              {/* <Route path="/clients" element={<ClientsPage />} /> */}
              {/* <Route path="/projects" element={<ProjectsPage />} /> */}
              {/* <Route path="/projects/:id/edit" element={<EditProject />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
