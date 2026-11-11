import React, { useState } from 'react';
import { X, Star, Send, MessageSquare, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackOpen, setIsFeedbackOpen, addReview, userProfile, t } = useApp();

  const [author, setAuthor] = useState(userProfile.name);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isFeedbackOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      author: author || 'Lahore Foodie',
      rating,
      comment,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
      setIsFeedbackOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-stone-900 dark:text-stone-100">
                {t.feedbackTitle}
              </h2>
              <p className="text-xs text-stone-500">{t.feedbackSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setIsFeedbackOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
              <ThumbsUp className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">
              Review Submitted!
            </h3>
            <p className="text-xs text-stone-500">
              Thank you for helping us make The Pizza &amp; Co. even better.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-2">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300 dark:text-stone-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                  {rating}.0 / 5.0
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Your Feedback &amp; Comments *
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the taste, crust, crust softness, delivery speed, or dine-in ambiance..."
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.submitFeedback}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
