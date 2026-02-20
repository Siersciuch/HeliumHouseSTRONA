import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import logoHH from "@/assets/logoHH.jpg";

const LoginPage = () => {
  const { login, user, changePassword } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Force password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const showChangePassword = user?.mustChangePassword;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(username, password);
    setLoading(false);
    if (!ok) setError("Nieprawidłowy login lub hasło");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Hasła się nie zgadzają");
      return;
    }
    setLoading(true);
    await changePassword(newPassword);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 gradient-petrol opacity-10" />
      <div className="absolute inset-0 gradient-pearl opacity-30 dark:opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-glow">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <img
              src={logoHH}
              alt="Helium House"
              className="h-20 w-auto object-contain rounded-lg"
            />
          </motion.div>

          <h1 className="text-2xl font-bold text-center mb-1 text-foreground">
            Helium House <span className="text-gradient-petrol">OPS</span>
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            System zarządzania eventami
          </p>

          <AnimatePresence mode="wait">
            {showChangePassword ? (
              <motion.form
                key="change-pw"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleChangePassword}
                className="space-y-5"
              >
                <div className="bg-accent/30 rounded-lg p-3 text-sm text-foreground">
                  <Lock className="inline h-4 w-4 mr-2" />
                  Ustaw nowe hasło przy pierwszym logowaniu
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-pw">Nowe hasło</Label>
                  <Input
                    id="new-pw"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 znaków"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-pw">Potwierdź hasło</Label>
                  <Input
                    id="confirm-pw"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Powtórz hasło"
                    required
                  />
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm">
                    {error}
                  </motion.p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Zapisuję..." : "Zmień hasło"}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="username">Login</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nazwa użytkownika"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm">
                    {error}
                  </motion.p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logowanie..." : "Zaloguj się"}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Demo: admin / admin123
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
