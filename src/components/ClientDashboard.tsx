import React, { useState } from 'react';
import { Home, PiggyBank, Receipt, Shield, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardHome from './dashboard/DashboardHome';
import StokvelDashboard from './stokvel/StokvelDashboard';

type DashboardTab = 'home' | 'stokvel' | 'loans' | 'debt' | 'profile';

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome userName="Kaycee" />;
      case 'stokvel':
        return <StokvelDashboard />;
      case 'loans':
        return <PlaceholderScreen title="Loans & Credit" icon={<Receipt size={48} />} message="No active loans. Apply in minutes." actionLabel="Apply for Loan" />;
      case 'debt':
        return <PlaceholderScreen title="Debt Recovery" icon={<Shield size={48} />} message="No debt recovery cases. Submit a case to get started." actionLabel="Submit Case" />;
      case 'profile':
        return <PlaceholderScreen title="My Profile" icon={<User size={48} />} message="Manage your account settings and documents." actionLabel="Edit Profile" />;
      default:
        return <DashboardHome userName="Kaycee" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white w-full relative h-full">
      <main className="flex-1 overflow-y-auto" style={{ scrollBehavior: 'smooth', paddingBottom: '90px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavBtn 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<Home size={22} />} 
          label="Home" 
        />
        <NavBtn 
          active={activeTab === 'stokvel'} 
          onClick={() => setActiveTab('stokvel')} 
          icon={<PiggyBank size={22} />} 
          label="Stokvel" 
        />
        <NavBtn 
          active={activeTab === 'loans'} 
          onClick={() => setActiveTab('loans')} 
          icon={<Receipt size={22} />} 
          label="Loans" 
        />
        <NavBtn 
          active={activeTab === 'debt'} 
          onClick={() => setActiveTab('debt')} 
          icon={<Shield size={22} />} 
          label="Recovery" 
        />
        <NavBtn 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<User size={22} />} 
          label="Profile" 
        />
      </nav>
    </div>
  );
};

const NavBtn = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`nav-item ${active ? 'active' : ''}`}
    style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const PlaceholderScreen = ({ title, icon, message, actionLabel }: { title: string, icon: React.ReactNode, message: string, actionLabel: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-32 text-center h-full gap-24">
    <div className="p-24 rounded-full bg-slate-50 text-slate-400">
      {icon}
    </div>
    <div>
      <h2 className="mb-8">{title}</h2>
      <p className="text-light">{message}</p>
    </div>
    <button className="btn btn-primary" style={{ maxWidth: '240px' }}>
      {actionLabel}
    </button>
  </div>
);

export default ClientDashboard;
