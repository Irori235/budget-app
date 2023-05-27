import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import LoginPage from "./pages/LoginPage";
import BudgetPage from "./pages/BudgetPage";

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <BudgetPage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
