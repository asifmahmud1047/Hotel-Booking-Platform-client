import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../components/Shared/Container";
import LoginForm from "../components/Forms/LoginForm";
import PageBanner from "../components/Shared/PageBanner";
import useAuth from "../hooks/useAuth";
import { saveToken } from "../api/auth";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (email, password) => {
    try {
      const result = await signIn(email, password);
      const token = await saveToken(result.user);
      if (token) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const token = await saveToken(result.user);
      if (token) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Luxury Hotel Booking</title>
      </Helmet>
      <PageBanner title="Login" subtitle="Welcome back" />
      <Container>
        <div className="max-w-md mx-auto">
          <LoginForm
            onSubmit={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            error={error}
          />
          <p className="mt-4 text-center">
            Do not have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Login;
