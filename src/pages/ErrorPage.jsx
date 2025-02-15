import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../components/Shared/Container";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Luxury Hotel Booking</title>
      </Helmet>
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <img
            src="/error-404.gif"
            alt="404 Error"
            className="max-w-md mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </>
  );
};

export default ErrorPage;
