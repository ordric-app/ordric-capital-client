import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths } from 'date-fns';
import { ArrowUpRight, TrendingUp, Calendar, ShieldCheck, Download } from 'lucide-react';
import type { StokvelPlan, Transaction } from './StokvelDashboard';

interface OverviewProps {
  plan: StokvelPlan;
  transactions: Transaction[];
}

const OverviewScreen: React.FC<OverviewProps> = ({ plan, transactions }) => {
  const { currentBalance, totalDeposits, totalGrowth } = useMemo(() => {
    let deposits = 0;
    let growth = 0;
    transactions.forEach(tx => {
      if (tx.status === 'successful') {
        if (tx.type === 'deposit') deposits += tx.amount;
        if (tx.type === 'interest') growth += tx.amount;
      }
    });
    return {
      currentBalance: deposits + growth,
      totalDeposits: deposits,
      totalGrowth: growth
    };
  }, [transactions]);

  // Projections
  const rate = 0.02;
  const futureValue = plan.monthlyContribution * (((Math.pow(1 + rate, plan.termMonths) - 1) / rate) * (1 + rate));

  const startDate = new Date(plan.startDate);
  const maturityDate = addMonths(startDate, plan.termMonths);
  const nextDebitDate = addMonths(startDate, plan.progressMonths); // simplified

  const progressPercent = Math.min(100, Math.round((plan.progressMonths / plan.termMonths) * 100));

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-32 flex flex-col gap-32 mb-40"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl mb-4">Dashboard</h2>
          <p className="text-sm">Welcome back, {plan.type === 'group' ? plan.groupName || 'Group' : 'Investor'}</p>
        </div>
        <div className="p-8 rounded-full bg-success-light text-success">
          <ShieldCheck size={24} />
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white', border: 'none' }}>
        <p style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm font-medium mb-8">Total Balance</p>
        <h1 style={{ color: 'white', fontSize: 36, marginBottom: 16 }}>{formatCurrency(currentBalance)}</h1>
        
        <div className="flex justify-between items-center text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
          <div className="flex flex-col">
            <span>Deposits</span>
            <span className="font-semibold">{formatCurrency(totalDeposits)}</span>
          </div>
          <div className="flex flex-col text-right">
            <span>Earned Growth</span>
            <span className="font-semibold text-success-light">+{formatCurrency(totalGrowth)}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-12">
        <button className="flex-1 btn btn-primary flex flex-col items-center gap-4 p-12 text-sm" style={{ padding: '12px 8px' }}>
          <ArrowUpRight size={20} />
          Contribute
        </button>
        <button className="flex-1 btn btn-outline flex flex-col items-center gap-4 p-12 text-sm" style={{ padding: '12px 8px', borderColor: 'var(--grey)' }}>
          <Download size={20} />
          Statement
        </button>
      </div>

      {/* Progress Section */}
      <div className="card flex flex-col gap-16">
        <div className="flex justify-between items-center border-b pb-12" style={{ borderColor: 'var(--grey)' }}>
          <div className="flex items-center gap-8">
            <TrendingUp size={20} className="text-primary" />
            <span className="font-semibold">Plan Progress</span>
          </div>
          <span className="font-bold text-primary">{progressPercent}%</span>
        </div>
        
        <div>
          <div style={{ width: '100%', height: 8, backgroundColor: 'var(--grey)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--success)', transition: 'width 1s ease-out' }} />
          </div>
          <p className="text-xs text-light mt-8 text-right">{plan.progressMonths} of {plan.termMonths} Months</p>
        </div>
        
        <div className="flex flex-col gap-12 pt-12 border-t" style={{ borderColor: 'var(--grey)' }}>
          <div className="flex justify-between text-sm">
            <span className="text-light flex items-center gap-4"><Calendar size={14} /> Next Auto-Debit</span>
            <span className="font-medium">{format(nextDebitDate, 'dd MMM yyyy')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-light flex items-center gap-4"><Calendar size={14} /> Maturity Date</span>
            <span className="font-medium text-success">{format(maturityDate, 'dd MMM yyyy')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-light">Est. Payout</span>
            <span className="font-semibold text-primary">{formatCurrency(futureValue)}</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default OverviewScreen;
