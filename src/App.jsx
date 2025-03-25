import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AddEmail from "./pages/AddEmail";
import Layout from "./components/Layout";
import EmailList from "./pages/EmailList";
import Cookies from "js-cookie";

// Simulated authentication check function
const isAuthenticated = () => {
  return Cookies.get("token") ? true : false; // Check if token exists
};

// PrivateRoute component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            element={
              <Layout>
                <AddEmail />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/email-list"
        element={
          <PrivateRoute
            element={
              <Layout>
                <EmailList />
              </Layout>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
