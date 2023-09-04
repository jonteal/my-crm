import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// Pages
import Home from "./pages/Home/Home";
// import Header from "./components/Header/Header";

// Components
import ClientView from "./pages/ClientView/ClientView";
// import ProjectView from "./pages/ProjectView/ProjectView";
// import NotFound from "./pages/NotFound/NotFound";
import AddClient from "./pages/AddClient/AddClient";
// import AddProject from "./pages/AddProject/AddProject";
// import EditProject from "./pages/EditProject/EditProject";
// import EditClient from "./pages/EditClient/EditClient";
// import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
// import ClientsPage from "./pages/ClientsPage/ClientsPage";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Kanban from "./pages/Kanban/Kanban";
// import AddKanban from "./pages/AddKanban/AddKanban";
// import AddTicket from './pages/AddTicket/AddTicket';
// import TicketView from "./pages/TicketView/TicketView";
// import EditTicket from "./pages/EditTicket/EditTicket";
// import EditKanban from "./pages/EditKanban/EditKanban";

import "./App.css";

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
          {/* <Header /> */}
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addClient" element={<AddClient />} />
              <Route path="/clients/:id" element={<ClientView />} />
              {/* <Route path="/clients" element={<ClientsPage />} /> */}
              {/* <Route path="/addProject" element={<AddProject />} /> */}
              {/* <Route path="/projects/:id" element={<ProjectView />} />
              <Route path="/projects" element={<ProjectsPage />} /> */}
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/projects/:id/edit" element={<EditProject />} />
              <Route path="/clients/:id/edit" element={<EditClient />} /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
