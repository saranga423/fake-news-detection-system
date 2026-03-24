import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ModerationPage from "./pages/ModerationPage";
import ModelPage from "./pages/ModelPage";
import InsightsPage from "./pages/InsightsPage";
import HistoryPage from "./pages/HistoryPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const location = useLocation();

  const hideShell =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {!hideShell && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderation"
          element={
            <ProtectedRoute>
              <ModerationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/model"
          element={
            <ProtectedRoute>
              <ModelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideShell && <Footer />}
    </>
  );
}

export default App;