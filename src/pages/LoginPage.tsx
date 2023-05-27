import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import SignInButton from "../components/foundation/SignInButton/SignInButton";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // ユーザーがログイン済みの場合、予算ページにリダイレクト
  if (user) {
    navigate("/budget");
  }

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center space-y-4 gap-4">
        <h1 className="text-4xl ">Budget App</h1>

        <div className="flex flex-col items-center space-y-2">
          <SignInButton onClick={handleLogin} />
          <p className="text-xs">ログインして始める</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
