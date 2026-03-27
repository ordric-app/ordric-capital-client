import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingFlow from './components/OnboardingFlow';
import RoleSelection from './components/RoleSelection';

type AppState = 'splash' | 'welcome' | 'onboarding' | 'role-selection';

function App() {
  const [step, setStep] = useState<AppState>('splash');

  const handleSplashComplete = () => setStep('welcome');
  const handleStartOnboarding = () => setStep('onboarding');
  const handleOnboardingComplete = () => setStep('role-selection');
  const handleSkipOnboarding = () => setStep('role-selection');
  
  const handleRoleSelect = (role: string) => {
    console.log('Selected role:', role);
    alert(`Enrolling as: ${role}`);
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
            onLogin={() => alert('Redirecting to Login')} 
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
            onLogin={() => alert('Redirecting to Login')} 
            onCreateAccount={() => alert('Redirecting to Registration')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
