import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Shield } from 'lucide-react';
import Cookies from 'js-cookie';
interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}
const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowSettings(true);
    };
    document.addEventListener('openCookieSettings', handleOpenSettings);
    return () => document.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);
  const saveConsent = (prefs: CookiePreferences) => {
    Cookies.set('cookie_consent', JSON.stringify(prefs), { expires: 365 });
    setIsVisible(false);
  };
  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };
  const rejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };
  const savePreferences = () => {
    saveConsent(preferences);
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-xl shadow-elevated p-6">
              {!showSettings ? (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-1">
                        {t('gdpr.cookieTitle')}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t('gdpr.cookieMessage')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {t('gdpr.customize')}
                    </button>
                    <button
                      onClick={rejectAll}
                      className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {t('gdpr.rejectAll')}
                    </button>
                    <button
                      onClick={acceptAll}
                      className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {t('gdpr.acceptAll')}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">
                        {t('gdpr.customize')}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 mb-6">
                    {/* Necessary */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{t('gdpr.necessary')}</p>
                        <p className="text-sm text-muted-foreground">Required for the website to function</p>
                      </div>
                      <div className="w-12 h-6 bg-primary/30 rounded-full flex items-center justify-end px-1 cursor-not-allowed">
                        <div className="w-4 h-4 bg-primary rounded-full" />
                      </div>
                    </div>
                    {/* Analytics */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{t('gdpr.analytics')}</p>
                        <p className="text-sm text-muted-foreground">Help us improve our website</p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics ? 'bg-primary justify-end' : 'bg-secondary justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-foreground rounded-full" />
                      </button>
                    </div>
                    {/* Marketing */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{t('gdpr.marketing')}</p>
                        <p className="text-sm text-muted-foreground">Personalized advertisements</p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing ? 'bg-primary justify-end' : 'bg-secondary justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-foreground rounded-full" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      onClick={savePreferences}
                      className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {t('gdpr.save')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CookieBanner;