import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Save, FileText, Fuel, Zap, Droplet, Battery } from 'lucide-react';
import { carModels, trims, powertrains, exteriorPackages, accessories, CarModel, Trim, Powertrain, ExteriorPackage, Accessory } from '@/data/cars';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
type Step = 'model' | 'trim' | 'powertrain' | 'exterior' | 'accessories' | 'summary';
const steps: Step[] = ['model', 'trim', 'powertrain', 'exterior', 'accessories', 'summary'];
const Configurator = () => {
  const { t } = useTranslation();
  const { isAuthenticated, addConfiguration } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('model');
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedTrim, setSelectedTrim] = useState<Trim | null>(null);
  const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
  const [selectedExterior, setSelectedExterior] = useState<ExteriorPackage | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  const currentStepIndex = steps.indexOf(currentStep);
  const calculateTotal = () => {
    let total = selectedModel?.basePrice || 0;
    total += selectedTrim?.price || 0;
    total += selectedPowertrain?.price || 0;
    total += selectedExterior?.price || 0;
    total += selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
    return total;
  };
  const canProceed = () => {
    switch (currentStep) {
      case 'model': return !!selectedModel;
      case 'trim': return !!selectedTrim;
      case 'powertrain': return !!selectedPowertrain;
      case 'exterior': return !!selectedExterior;
      case 'accessories': return true;
      case 'summary': return true;
    }
  };
  const nextStep = () => {
    const next = steps[currentStepIndex + 1];
    if (next) setCurrentStep(next);
  };
  const prevStep = () => {
    const prev = steps[currentStepIndex - 1];
    if (prev) setCurrentStep(prev);
  };
  const toggleAccessory = (accessory: Accessory) => {
    setSelectedAccessories(prev =>
      prev.find(a => a.id === accessory.id)
        ? prev.filter(a => a.id !== accessory.id)
        : [...prev, accessory]
    );
  };
  const saveConfiguration = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save your configuration');
      return;
    }
    addConfiguration({
      model: selectedModel?.name || '',
      trim: selectedTrim?.name || '',
      powertrain: selectedPowertrain?.name || '',
      exterior: selectedExterior?.name || '',
      accessories: selectedAccessories.map(a => a.name),
      totalPrice: calculateTotal(),
    });
    toast.success('Configuration saved successfully!');
  };
  const getFuelIcon = (type: string) => {
    switch (type) {
      case 'petrol': return <Fuel className="w-5 h-5" />;
      case 'diesel': return <Droplet className="w-5 h-5" />;
      case 'hybrid': return <Zap className="w-5 h-5" />;
      case 'electric': return <Battery className="w-5 h-5" />;
      default: return <Fuel className="w-5 h-5" />;
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('configurator.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('configurator.subtitle')}
          </p>
        </div>
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => index < currentStepIndex && setCurrentStep(step)}
                  className={`step-indicator ${
                    index < currentStepIndex
                      ? 'completed'
                      : index === currentStepIndex
                      ? 'active'
                      : 'pending'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                <span className={`ml-2 text-sm font-medium hidden md:block ${
                  index === currentStepIndex ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {t(`configurator.steps.${step}`)}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                    index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Model Selection */}
                {currentStep === 'model' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('configurator.selectModel')}
                    </h2>
                    <div className="grid gap-6">
                      {carModels.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model)}
                          className={`card-metallic p-6 text-left transition-all ${
                            selectedModel?.id === model.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : ''
                          }`}
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            <img
                              src={model.image}
                              alt={model.name}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <span className="text-xs uppercase tracking-wide text-primary font-medium">
                                {model.category}
                              </span>
                              <h3 className="font-display text-2xl font-bold mt-1 mb-2">
                                {model.name}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4">
                                {model.description}
                              </p>
                              <p className="font-display text-xl font-bold text-primary">
                                €{model.basePrice.toLocaleString()}
                              </p>
                            </div>
                            {selectedModel?.id === model.id && (
                              <div className="flex items-center">
                                <Check className="w-8 h-8 text-primary" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Trim Selection */}
                {currentStep === 'trim' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('configurator.selectTrim')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {trims.map((trim) => (
                        <button
                          key={trim.id}
                          onClick={() => setSelectedTrim(trim)}
                          className={`card-metallic p-6 text-left transition-all ${
                            selectedTrim?.id === trim.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-display text-xl font-bold">{trim.name}</h3>
                            {selectedTrim?.id === trim.id && (
                              <Check className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <p className="text-lg font-semibold text-primary mb-4">
                            {trim.price === 0 ? 'Included' : `+€${trim.price.toLocaleString()}`}
                          </p>
                          <ul className="space-y-2">
                            {trim.features.map((feature, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Powertrain Selection */}
                {currentStep === 'powertrain' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('configurator.selectPowertrain')}
                    </h2>
                    <div className="grid gap-4">
                      {powertrains.map((pt) => (
                        <button
                          key={pt.id}
                          onClick={() => setSelectedPowertrain(pt)}
                          className={`card-metallic p-6 text-left transition-all ${
                            selectedPowertrain?.id === pt.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                {getFuelIcon(pt.type)}
                              </div>
                              <div>
                                <h3 className="font-display text-lg font-bold">{pt.name}</h3>
                                <p className="text-muted-foreground text-sm">
                                  {pt.power} • {pt.fuelConsumption}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-lg font-semibold text-primary">
                                {pt.price === 0 ? 'Included' : `+€${pt.price.toLocaleString()}`}
                              </p>
                              {selectedPowertrain?.id === pt.id && (
                                <Check className="w-6 h-6 text-primary" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Exterior Selection */}
                {currentStep === 'exterior' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('configurator.selectExterior')}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {exteriorPackages.map((ext) => (
                        <button
                          key={ext.id}
                          onClick={() => setSelectedExterior(ext)}
                          className={`card-metallic p-4 text-center transition-all ${
                            selectedExterior?.id === ext.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : ''
                          }`}
                        >
                          <div
                            className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-card"
                            style={{ backgroundColor: ext.color }}
                          />
                          <h3 className="font-semibold mb-1">{ext.name}</h3>
                          <p className="text-sm text-primary font-medium">
                            {ext.price === 0 ? 'Included' : `+€${ext.price.toLocaleString()}`}
                          </p>
                          {selectedExterior?.id === ext.id && (
                            <Check className="w-5 h-5 text-primary mx-auto mt-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Accessories Selection */}
                {currentStep === 'accessories' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('configurator.selectAccessories')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {accessories.map((acc) => {
                        const isSelected = selectedAccessories.find(a => a.id === acc.id);
                        return (
                          <button
                            key={acc.id}
                            onClick={() => toggleAccessory(acc)}
                            className={`card-metallic p-4 text-left transition-all ${
                              isSelected ? 'border-primary ring-2 ring-primary/20' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                  {acc.category}
                                </span>
                                <h3 className="font-semibold">{acc.name}</h3>
                              </div>
                              <div className="flex items-center gap-3">
                                <p className="text-primary font-semibold">+€{acc.price}</p>
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                                }`}>
                                  {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* Summary */}
                {currentStep === 'summary' && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">
                      {t('configurator.reviewSummary')}
                    </h2>
                    <div className="card-metallic p-6 space-y-6">
                      <div className="flex items-center gap-4 pb-4 border-b border-border">
                        <img
                          src={selectedModel?.image}
                          alt={selectedModel?.name}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-display text-2xl font-bold">{selectedModel?.name}</h3>
                          <p className="text-muted-foreground">{selectedTrim?.name} • {selectedPowertrain?.name}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base Price</span>
                          <span>€{selectedModel?.basePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{selectedTrim?.name} Trim</span>
                          <span>+€{selectedTrim?.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{selectedPowertrain?.name}</span>
                          <span>+€{selectedPowertrain?.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{selectedExterior?.name}</span>
                          <span>+€{selectedExterior?.price.toLocaleString()}</span>
                        </div>
                        {selectedAccessories.length > 0 && (
                          <div className="pt-2 border-t border-border">
                            <p className="text-sm font-medium mb-2">Accessories:</p>
                            {selectedAccessories.map(acc => (
                              <div key={acc.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{acc.name}</span>
                                <span>+€{acc.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="btn-secondary px-6 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                {t('configurator.back')}
              </button>
              {currentStep !== 'summary' ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="btn-primary px-6 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('configurator.next')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={saveConfiguration}
                    className="btn-secondary px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {t('configurator.saveConfig')}
                  </button>
                  <button className="btn-primary px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {t('configurator.requestQuote')}
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-metallic p-6 sticky top-24">
              <h3 className="font-display text-lg font-semibold mb-4">
                {t('configurator.totalPrice')}
              </h3>
              
              <div className="space-y-3 mb-6">
                {selectedModel && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Model</span>
                    <span>{selectedModel.name}</span>
                  </div>
                )}
                {selectedTrim && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trim</span>
                    <span>{selectedTrim.name}</span>
                  </div>
                )}
                {selectedPowertrain && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Powertrain</span>
                    <span>{selectedPowertrain.name}</span>
                  </div>
                )}
                {selectedExterior && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Exterior</span>
                    <span>{selectedExterior.name}</span>
                  </div>
                )}
                {selectedAccessories.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accessories</span>
                    <span>{selectedAccessories.length} items</span>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total</span>
                  <span className="font-display text-3xl font-bold text-primary">
                    €{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Configurator;