import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../components/Shared/Container";
import RegisterForm from "../components/Forms/RegisterForm";
import PageBanner from "../components/Shared/PageBanner";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../utils/imageUpload";
import { saveToken } from "../api/auth";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (name, email, password, image) => {
    try {
      // Upload image if provided
      let photoURL = "";
      if (image) {
        photoURL = await imageUpload(image);
      }

      // Create user
      const result = await createUser(email, password);

      // Update profile
      await updateUserProfile(name, photoURL);

      // Save token
      const token = await saveToken(result.user);
      if (token) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Luxury Hotel Booking</title>
      </Helmet>
      <PageBanner title="Register" subtitle="Create your account" />
      <Container>
        <div className="max-w-md mx-auto">
          <RegisterForm onSubmit={handleRegister} error={error} />
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Register;
