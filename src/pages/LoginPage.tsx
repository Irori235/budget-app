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
    <div>
      <h1>ログイン</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
      <SignInButton onClick={handleLogin} />
    </div>
  );
};

export default LoginPage;
