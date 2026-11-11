import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCircle2, Sparkles, Bike } from 'lucide-react';

export const NotificationToasts: React.FC = () => {
  const { notifications, markNotificationAsRead, setIsTrackingOpen } = useApp();

  // Show recent unread notifications as floating toasts
  const recentToasts = notifications.filter((n) => !n.read).slice(0, 3);

  if (recentToasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {recentToasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-stone-900/95 text-stone-100 p-4 rounded-2xl shadow-2xl border border-amber-500/40 backdrop-blur-md flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            {toast.type === 'order' ? (
              <Bike className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="font-heading font-bold text-xs text-amber-400">
              {toast.title}
            </h5>
            <p className="text-xs text-stone-300 mt-0.5 leading-snug">
              {toast.message}
            </p>
            {toast.type === 'order' && (
              <button
                onClick={() => {
                  markNotificationAsRead(toast.id);
                  setIsTrackingOpen(true);
                }}
                className="text-[11px] font-bold text-amber-400 hover:underline mt-1.5 inline-block"
              >
                Open Live Tracker →
              </button>
            )}
          </div>

          <button
            onClick={() => markNotificationAsRead(toast.id)}
            className="text-stone-400 hover:text-white p-1"
            aria-label="Dismiss Notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
