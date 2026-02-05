import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">A</span>
              </div>
              <span className="font-display text-xl font-bold">AutoPro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {t('footer.aboutText')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/configurator" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('nav.configurator')}
                </Link>
              </li>
              <li>
                <Link to="/used-cars" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('nav.usedCars')}
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('nav.account')}
                </Link>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('footer.financing')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('footer.tradeIn')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('footer.warranty')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('footer.serviceCenter')}
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+493012345678" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@autopro.de" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} AutoPro. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t('footer.privacy')}
            </Link>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t('footer.terms')}
            </a>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('openCookieSettings'))}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {t('footer.cookies')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;