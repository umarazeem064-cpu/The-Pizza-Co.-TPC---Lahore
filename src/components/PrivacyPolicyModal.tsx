import React from 'react';
import { X, ShieldCheck, Lock, Key, Database, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyModal: React.FC = () => {
  const { isPrivacyOpen, setIsPrivacyOpen, userProfile, pushNotification } = useApp();

  if (!isPrivacyOpen) return null;

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(userProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'tpc_user_data_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    pushNotification('Data Exported', 'Your personal data archive has been downloaded.', 'system');
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your local session data?')) {
      localStorage.clear();
      pushNotification('Data Purged', 'Local caches have been cleared.', 'system');
      setIsPrivacyOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-stone-900 dark:text-stone-100">
                Security &amp; Privacy Policy
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                The Pizza &amp; Co. (TPC) Data Protection Governance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          {/* Security Protocols Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
              <Lock className="w-4 h-4" />
              <span>TLS 1.3 / 256-Bit Data Encryption Active</span>
            </div>
            <p className="text-emerald-900/80 dark:text-emerald-300/80">
              Your customer phone numbers, delivery addresses, and payment tokens are processed securely in compliance with international privacy protocols and never shared with third-party telemarketers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              1. Information We Collect
            </h3>
            <p>
              We collect your name, phone number, and delivery street address purely to fulfill your fast pizza and fast food orders from our Usman Plaza, Sharaqpur Road branch in Lahore, and to transmit live dispatch coordinates to our riders.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              2. Secure Payment Gateways
            </h3>
            <p>
              Payment data for Credit Cards, JazzCash, and EasyPaisa are handled with direct gateway tokens. TPC does not store your card CVVs or wallet MPINs on our application servers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              3. User Data Control &amp; GDPR Rights
            </h3>
            <p>
              You maintain full authority over your data. You may download a copy of your saved profile or permanently purge all cached local records at any time using the clickable controls below.
            </p>

            {/* User Data Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExportData}
                className="px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-500" />
                <span>Export My Profile Data (JSON)</span>
              </button>

              <button
                onClick={handleClearHistory}
                className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All Saved Local Data</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-stone-400">
            <span>Last Updated: November 2026</span>
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              The Pizza &amp; Co. (TPC Lahore)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
