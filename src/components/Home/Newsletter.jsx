import { useState } from "react";
import { motion } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success simulation
      setStatus({
        type: "success",
        message: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Mail className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Special Offers
          </h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter and get exclusive deals, travel tips,
            and more!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="px-6 py-3 rounded-lg w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold 
                         hover:bg-yellow-600 transition-colors disabled:opacity-50
                         disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Alert
                  variant={
                    status.type === "success" ? "default" : "destructive"
                  }
                >
                  <AlertTitle>
                    {status.type === "success" ? "Success!" : "Error"}
                  </AlertTitle>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </form>

          <p className="text-blue-100 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
