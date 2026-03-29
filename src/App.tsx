import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingFlow from './components/OnboardingFlow';
import RoleSelection from './components/RoleSelection';
import StokvelDashboard from './components/stokvel/StokvelDashboard';

type AppState = 'splash' | 'welcome' | 'onboarding' | 'role-selection' | 'dashboard';

function App() {
  const [step, setStep] = useState<AppState>('splash');

  const handleSplashComplete = () => setStep('welcome');
  const handleStartOnboarding = () => setStep('onboarding');
  const handleOnboardingComplete = () => setStep('role-selection');
  const handleSkipOnboarding = () => setStep('role-selection');
  
  const handleRoleSelect = (_role: string) => {
    // Navigate straight to new Stokvel dashboard
    setStep('dashboard');
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
        {step === 'welcome' && (
          <WelcomeScreen 
            key="welcome" 
            onStart={handleStartOnboarding} 
            onLogin={() => setStep('dashboard')} 
          />
        )}
        {step === 'onboarding' && (
          <OnboardingFlow 
            key="onboarding" 
            onComplete={handleOnboardingComplete} 
            onSkip={handleSkipOnboarding} 
          />
        )}
        {step === 'role-selection' && (
          <RoleSelection 
            key="role-selection" 
            onSelect={handleRoleSelect} 
            onLogin={() => setStep('dashboard')} 
            onCreateAccount={() => alert('Redirecting to Registration')} 
          />
        )}
        {step === 'dashboard' && (
          <StokvelDashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
