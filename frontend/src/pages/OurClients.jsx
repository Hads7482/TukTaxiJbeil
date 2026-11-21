

import React, { useEffect, useState } from "react";
import { Star, Quote, Send, User } from "lucide-react";
import { motion } from "framer-motion";

const OurClients = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem("tuktaxi_reviews");

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Submit review
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !review.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      review: review.trim(),
      rating,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);

    localStorage.setItem(
      "tuktaxi_reviews",
      JSON.stringify(updatedReviews)
    );

    // Reset form
    setName("");
    setReview("");
    setRating(5);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, item) => total + item.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm font-bold mb-4">
              Customer Reviews
            </p>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              What Our{" "}
              <span className="text-yellow-400">
                Customers Say
              </span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Your experience matters to us. Leave a review and
              let us know how your ride with TUK TAXI was.
            </p>
          </motion.div>

          {/* RATING SUMMARY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10 inline-flex flex-col items-center"
          >
            <div className="text-5xl font-black">
              {averageRating}
            </div>

            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="text-gray-500">
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* WRITE REVIEW */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10"
          >

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center">
                <Quote size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Share Your Experience
                </h2>

                <p className="text-gray-500 text-sm">
                  Tell us about your ride
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Your Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-yellow-400 transition"
                    required
                  />
                </div>
              </div>

              {/* RATING */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Your Rating
                </label>

                <div className="flex gap-2">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-600"
                        }
                      />
                    </button>
                  ))}

                  <span className="ml-2 self-center text-gray-400">
                    {rating}/5
                  </span>
                </div>
              </div>

              {/* REVIEW */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Your Review
                </label>

                <textarea
                  placeholder="Tell us about your experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="5"
                  className="w-full bg-black border border-zinc-700 rounded-xl py-4 px-4 outline-none resize-none focus:border-yellow-400 transition"
                  required
                />
              </div>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4 mb-5 text-center"
                >
                  Thank you! Your review has been added.
                </motion.div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Send size={19} />
                Submit Review
              </button>

            </form>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest">
                Customer Feedback
              </p>

              <h2 className="text-3xl md:text-4xl font-black mt-2">
                Recent Reviews
              </h2>
            </div>
          </div>

          {reviews.length === 0 ? (

            <div className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-12">
              <Quote
                size={40}
                className="mx-auto text-yellow-400 mb-4"
              />

              <h3 className="text-xl font-bold mb-2">
                No reviews yet
              </h3>

              <p className="text-gray-500">
                Be the first customer to leave a review!
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {reviews.map((item, index) => (

                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-400/40 transition"
                >

                  {/* STARS */}
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={17}
                        className={
                          star <= item.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-700"
                        }
                      />
                    ))}
                  </div>

                  {/* REVIEW */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    "{item.review}"
                  </p>

                  {/* USER */}
                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black">
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {item.date}
                      </p>
                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>
      </section>

    </div>
  );
};

export default OurClients;
