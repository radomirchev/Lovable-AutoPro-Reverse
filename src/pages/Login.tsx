import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast.success('Welcome back!');
          navigate('/account');
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          toast.success('Account created successfully!');
          navigate('/account');
        } else {
          toast.error('Registration failed');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-12 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">
              {isLogin ? t('auth.login') : t('auth.register')}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? 'Welcome back to AutoPro'
                : 'Create your account to get started'}
            </p>
          </div>
          <div className="card-metallic p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name (Register only) */}
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('auth.name')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 input-dark rounded-lg"
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 input-dark rounded-lg"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(f => ({ ...f, password: e.target.value }))}
                    className="w-full pl-12 pr-12 py-3 input-dark rounded-lg"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(f => ({ ...f, confirmPassword: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 input-dark rounded-lg"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:underline">
                    {t('auth.forgotPassword')}
                  </button>
                </div>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? t('auth.signIn') : t('auth.signUp')}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            {/* Toggle Login/Register */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? t('auth.signUp') : t('auth.signIn')}
                </button>
              </p>
            </div>
          </div>
          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Login;