import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Settings, FileText, Search, ShoppingBag, Shield, Download, Trash2, LogOut, ChevronRight, Calendar, Car, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
type Tab = 'dashboard' | 'configurations' | 'filters' | 'orders' | 'privacy';
const Account = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, savedConfigurations, savedFilters, orders, deleteConfiguration, deleteFilter, exportUserData, deleteAccount, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  const tabs = [
    { id: 'dashboard' as Tab, label: t('account.dashboard'), icon: User },
    { id: 'configurations' as Tab, label: t('account.configurations'), icon: FileText },
    { id: 'filters' as Tab, label: t('account.savedFilters'), icon: Search },
    { id: 'orders' as Tab, label: t('account.orders'), icon: ShoppingBag },
    { id: 'privacy' as Tab, label: t('account.privacy'), icon: Shield },
  ];
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccount();
      toast.success('Account deleted successfully');
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              {t('account.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('account.welcome')}, {user?.name}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('account.logout')}</span>
                </button>
              </nav>
            </div>
            {/* Main Content */}
            <div className="md:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Dashboard */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <div className="card-metallic p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-display text-2xl font-bold">{user?.name}</h2>
                          <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="font-display text-3xl font-bold text-primary">
                            {savedConfigurations.length}
                          </p>
                          <p className="text-sm text-muted-foreground">Configurations</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="font-display text-3xl font-bold text-primary">
                            {savedFilters.length}
                          </p>
                          <p className="text-sm text-muted-foreground">Saved Searches</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="font-display text-3xl font-bold text-primary">
                            {orders.length}
                          </p>
                          <p className="text-sm text-muted-foreground">Orders</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Link to="/configurator" className="card-metallic p-6 hover:border-primary transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Car className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Build Your Car</h3>
                              <p className="text-sm text-muted-foreground">Start a new configuration</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </Link>
                      <Link to="/used-cars" className="card-metallic p-6 hover:border-primary transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Search className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Browse Used Cars</h3>
                              <p className="text-sm text-muted-foreground">Find your perfect match</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                {/* Configurations */}
                {activeTab === 'configurations' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('account.configurations')}
                    </h2>
                    
                    {savedConfigurations.length === 0 ? (
                      <div className="card-metallic p-12 text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">{t('account.noConfigs')}</p>
                        <Link to="/configurator" className="btn-primary px-6 py-2 rounded-lg text-sm inline-block mt-4">
                          Create Configuration
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedConfigurations.map((config) => (
                          <div key={config.id} className="card-metallic p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-display text-xl font-bold">{config.model}</h3>
                                <p className="text-muted-foreground text-sm">
                                  {config.trim} • {config.powertrain} • {config.exterior}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>{config.date}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-display text-2xl font-bold text-primary">
                                  €{config.totalPrice.toLocaleString()}
                                </p>
                                <button
                                  onClick={() => deleteConfiguration(config.id)}
                                  className="text-sm text-destructive hover:underline mt-2"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Saved Filters */}
                {activeTab === 'filters' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('account.savedFilters')}
                    </h2>
                    
                    {savedFilters.length === 0 ? (
                      <div className="card-metallic p-12 text-center">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No saved searches yet</p>
                        <Link to="/used-cars" className="btn-primary px-6 py-2 rounded-lg text-sm inline-block mt-4">
                          Browse Used Cars
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedFilters.map((filter) => (
                          <div key={filter.id} className="card-metallic p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{filter.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Created: {new Date(filter.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link to="/used-cars" className="btn-secondary px-4 py-2 rounded-lg text-sm">
                                Apply
                              </Link>
                              <button
                                onClick={() => deleteFilter(filter.id)}
                                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Orders */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('account.orders')}
                    </h2>
                    
                    {orders.length === 0 ? (
                      <div className="card-metallic p-12 text-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">{t('account.noOrders')}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="card-metallic p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-display text-xl font-bold">{order.vehicle}</h3>
                                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                    order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                                    order.status === 'processing' ? 'bg-primary/20 text-primary' :
                                    'bg-muted text-muted-foreground'
                                  }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                  Order #{order.id} • {order.date}
                                </p>
                              </div>
                              <p className="font-display text-2xl font-bold text-primary">
                                €{order.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Privacy & Data */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('account.privacy')}
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="card-metallic p-6">
                        <h3 className="font-semibold mb-4">{t('gdpr.yourRights')}</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {t('gdpr.rightAccess')}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {t('gdpr.rightRectification')}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {t('gdpr.rightErasure')}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {t('gdpr.rightPortability')}
                          </li>
                        </ul>
                      </div>
                      <div className="card-metallic p-6">
                        <h3 className="font-semibold mb-2">{t('gdpr.dataRetention')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t('gdpr.dataRetentionInfo')}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={exportUserData}
                          className="btn-secondary px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          {t('account.exportData')}
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                          {t('account.deleteAccount')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;