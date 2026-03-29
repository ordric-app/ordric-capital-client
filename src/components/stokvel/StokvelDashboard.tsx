import React, { useState } from 'react';
import { Home, LineChart, List, Settings } from 'lucide-react';
import OverviewScreen from './OverviewScreen';
import GrowthDashboard from './GrowthDashboard';
import TransactionHistory from './TransactionHistory';
import ManageStokvel from './ManageStokvel';
import CreatePlanForm from './CreatePlanForm';

export interface StokvelPlan {
  id: string;
  type: 'individual' | 'group';
  monthlyContribution: number;
  termMonths: number;
  startDate: string;
  progressMonths: number;
  groupName?: string;
  currentBalance: number;
  totalContributions: number;
  totalGrowth: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'fee' | 'interest';
  status: 'successful' | 'pending' | 'failed';
  reference: string;
}

// Simulated User Data
const initialMockPlan: StokvelPlan | null = null; // Forces user to create a plan first

const StokvelDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'growth' | 'transactions' | 'settings'>('overview');
  const [plan, setPlan] = useState<StokvelPlan | null>(initialMockPlan);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowScrollTop(scrollRef.current.scrollTop > 150);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If no plan is active, force the "Create Plan" flow
  if (!plan) {
    return (
      <div className="flex-1 overflow-y-auto bg-white w-full" style={{ minHeight: 0 }}>
         <CreatePlanForm 
            onPlanCreated={(newPlan: StokvelPlan) => {
              setPlan(newPlan);
              // generate mock transactions based on progressMonths
              const mockTxs: Transaction[] = [];
              let currentBal = 0;
              let date = new Date(newPlan.startDate);

              for(let i=0; i<newPlan.progressMonths; i++) {
                 // add deposit
                 mockTxs.push({
                   id: `tx-dep-${i}`,
                   date: date.toISOString(),
                   amount: newPlan.monthlyContribution,
                   type: 'deposit',
                   status: 'successful',
                   reference: `STOKVEL-${date.getTime().toString().slice(-6)}`
                 });
                 currentBal += newPlan.monthlyContribution;

                 // add interest (2.0% per month)
                 const interestEarned = currentBal * 0.02;
                 mockTxs.push({
                   id: `tx-int-${i}`,
                   date: new Date(date.getTime() + 86400000).toISOString(), // next day
                   amount: interestEarned,
                   type: 'interest',
                   status: 'successful',
                   reference: `GROWTH-${date.getTime().toString().slice(-6)}`
                 });
                 currentBal += interestEarned;
                 date.setMonth(date.getMonth() + 1);
              }
              setTransactions(mockTxs.reverse()); // newest first
            }}
         />
      </div>
    );
  }

  // Dashboard layout
  return (
    <div className="flex-1 flex flex-col bg-white w-full relative" style={{ overflow: 'hidden' }}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto w-full" 
        style={{ minHeight: 0, paddingBottom: 80, scrollBehavior: 'smooth' }}
      >
        {activeTab === 'overview' && <OverviewScreen plan={plan} transactions={transactions} />}
        {activeTab === 'growth' && <GrowthDashboard plan={plan} transactions={transactions} />}
        {activeTab === 'transactions' && <TransactionHistory transactions={transactions} />}
        {activeTab === 'settings' && <ManageStokvel plan={plan} onCancel={() => setPlan(null)} />}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-12 rounded-full bg-primary text-white shadow-lg"
          style={{ 
            position: 'absolute', bottom: 90, right: 20, 
            zIndex: 20, border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(131, 34, 103, 0.4)'
          }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center px-24 py-16 w-full" style={{ 
        position: 'absolute', bottom: 0, left: 0, right: 0, 
        backgroundColor: 'var(--white)', borderTop: '1px solid #f0f0f0',
        zIndex: 10
      }}>
        <NavButton 
          icon={<Home size={24} />} 
          label="Home" 
          isActive={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')} 
        />
        <NavButton 
          icon={<LineChart size={24} />} 
          label="Growth" 
          isActive={activeTab === 'growth'} 
          onClick={() => setActiveTab('growth')} 
        />
        <NavButton 
          icon={<List size={24} />} 
          label="History" 
          isActive={activeTab === 'transactions'} 
          onClick={() => setActiveTab('transactions')} 
        />
        <NavButton 
          icon={<Settings size={24} />} 
          label="Manage" 
          isActive={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-8"
    style={{ 
      color: isActive ? 'var(--primary)' : 'var(--text-light)',
      background: 'none', border: 'none', cursor: 'pointer', outline: 'none'
    }}
  >
    {icon}
    <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 500 }}>{label}</span>
  </button>
);

export default StokvelDashboard;
