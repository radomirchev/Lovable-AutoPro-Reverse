import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Clock, Download, Trash2, Mail, MapPin } from 'lucide-react';
const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            {t('gdpr.privacyTitle')}
          </h1>
          <div className="prose prose-invert max-w-none">
            {/* Introduction */}
            <div className="card-metallic p-6 mb-8">
              <p className="text-muted-foreground">
                At AutoPro, we are committed to protecting your personal data and respecting your privacy. 
                This Privacy Policy explains how we collect, use, and protect your information in compliance 
                with the General Data Protection Regulation (GDPR).
              </p>
            </div>
            {/* Data Controller */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">Data Controller</h2>
              <div className="card-metallic p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">AutoPro GmbH</p>
                    <p className="text-muted-foreground">Auto Boulevard 123</p>
                    <p className="text-muted-foreground">10115 Berlin, Germany</p>
                    <p className="text-muted-foreground mt-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      privacy@autopro.de
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Data We Collect */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">Data We Collect</h2>
              <div className="card-metallic p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <strong>Account Information:</strong>
                      <p className="text-muted-foreground">Name, email address, password (encrypted)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <strong>Vehicle Preferences:</strong>
                      <p className="text-muted-foreground">Saved configurations, search filters, vehicle interests</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <strong>Usage Data:</strong>
                      <p className="text-muted-foreground">Pages visited, features used, session duration</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <strong>Technical Data:</strong>
                      <p className="text-muted-foreground">IP address, browser type, device information</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">{t('gdpr.yourRights')}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card-metallic p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">{t('gdpr.rightAccess')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request a copy of all personal data we hold about you.
                  </p>
                </div>
                <div className="card-metallic p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">{t('gdpr.rightRectification')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request correction of inaccurate personal data.
                  </p>
                </div>
                <div className="card-metallic p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Trash2 className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">{t('gdpr.rightErasure')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request deletion of your personal data ("right to be forgotten").
                  </p>
                </div>
                <div className="card-metallic p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">{t('gdpr.rightPortability')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive your data in a structured, machine-readable format.
                  </p>
                </div>
              </div>
            </section>
            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">{t('gdpr.dataRetention')}</h2>
              <div className="card-metallic p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground mb-4">
                      {t('gdpr.dataRetentionInfo')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Account data: Retained until account deletion</li>
                      <li>• Vehicle inquiries: 2 years</li>
                      <li>• Order history: 7 years (legal requirement)</li>
                      <li>• Analytics data: 26 months</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* Cookies */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">Cookies</h2>
              <div className="card-metallic p-6">
                <p className="text-muted-foreground mb-4">
                  We use cookies to enhance your experience. You can manage your preferences at any time.
                </p>
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent('openCookieSettings'))}
                  className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Manage Cookie Preferences
                </button>
              </div>
            </section>
            {/* Contact */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="card-metallic p-6">
                <p className="text-muted-foreground">
                  For any privacy-related questions or to exercise your rights, please contact our 
                  Data Protection Officer at{' '}
                  <a href="mailto:privacy@autopro.de" className="text-primary hover:underline">
                    privacy@autopro.de
                  </a>
                </p>
              </div>
            </section>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Privacy;