import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Settings, Loader2, AlertCircle } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    // Simple validation against hardcoded credentials
    setTimeout(() => {
      if (username === "admin123" && password === "123admin") {
        onLoginSuccess();
        // Reset fields
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="bg-slate-900 border border-gold-500/20 p-8 rounded-none w-full max-w-md relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 bg-white/5 text-slate-100 hover:text-gold-500 hover:bg-white/10 border border-white/5 rounded-none transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-2xl font-serif text-white font-medium mb-4 text-center">
              Admin Panel Access
            </h3>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-none bg-red-500/5 border border-red-500/20 flex items-center gap-2 text-xs text-red-300"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-2 text-xs text-white placeholder-slate-700 focus:outline-none"
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-2 text-xs text-white placeholder-slate-700 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-500 hover:bg-white text-slate-950 font-bold py-2 rounded-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  <>
                    <Settings size={14} />
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminLoginModal;
