import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  GoogleSignInButton,
  GithubSignInButton,
} from "../components/foundation/SignInButton/SignInButton";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      console.log("handleGithubLogin");
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white sm:bg-gray-100 ">
      <div className="container mx-auto px-4 py-8 max-w-sm flex flex-col items-center space-y-4 gap-4 bg-white rounded-lg sm:shadow-xl">
        <div className="flex flex-col items-center py-6 space-y-4">
          <h1 className="text-6xl font-serif font-light text-gray-900">
            Cashly
          </h1>
          <p className="text-sm font-serif text-gray-600">
            家計管理をより簡単に、より楽しく
          </p>
        </div>

        <div className="flex flex-col items-center pb-8 space-y-4">
          <hr className="w-full" />
          <p className="text-sm font-serif text-gray-600">ログインして始める</p>
          <GoogleSignInButton onClick={handleGoogleLogin} />
          <GithubSignInButton onClick={handleGithubLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
