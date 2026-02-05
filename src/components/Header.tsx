import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/configurator', label: t('nav.configurator') },
    { path: '/used-cars', label: t('nav.usedCars') },
  ];
  const isActive = (path: string) => location.pathname === path;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              AutoPro
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm font-medium uppercase tracking-wide ${
                  isActive(link.path) ? 'active text-primary' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {isAccountMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevated overflow-hidden"
                    >
                      <Link
                        to="/account"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block px-4 py-3 text-sm hover:bg-muted transition-colors"
                      >
                        {t('nav.account')}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors text-destructive"
                      >
                        {t('account.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary px-5 py-2 rounded-lg text-sm font-medium"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <div className="px-4 py-2">
                    <LanguageSwitcher />
                  </div>
                  
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        {t('nav.account')}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-muted transition-colors"
                      >
                        {t('account.logout')}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block mx-4 mt-2 btn-primary px-5 py-3 rounded-lg text-sm font-medium text-center"
                    >
                      {t('nav.login')}
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
export default Header;