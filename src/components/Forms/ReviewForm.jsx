import { useState } from "react";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import axios from "axios";

const ReviewForm = ({ roomId, onSuccess }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setLoading(true);
      const reviewData = {
        roomId,
        userId: user._id,
        rating,
        comment,
        username: user.name,
        userImage: user.photoURL,
        timestamp: new Date(),
      };

      const response = await axios.post("/api/reviews", reviewData);

      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setComment("");
        onSuccess?.();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <Rating
          value={rating}
          onChange={setRating}
          size={24}
          className="space-x-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export { BookingForm, LoginForm, RegisterForm, ReviewForm };
