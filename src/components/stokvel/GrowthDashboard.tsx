import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import type { StokvelPlan, Transaction } from './StokvelDashboard';

interface GrowthProps {
  plan: StokvelPlan;
  transactions: Transaction[];
}

const GrowthDashboard: React.FC<GrowthProps> = ({ plan, transactions }) => {
  // Process transactions into cumulative month-by-month chart data
  const chartData = useMemo(() => {
    let currentBal = 0;
    
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Group by month
    const groupedByMonth: { [key: string]: number } = {};
    
    sorted.forEach(tx => {
      if (tx.status === 'successful') {
        currentBal += tx.amount; // (withdrawals would technically be negative, but ours are simulated positive only right now)
        const monthKey = format(new Date(tx.date), 'MMM yy');
        groupedByMonth[monthKey] = currentBal;
      }
    });

    return Object.keys(groupedByMonth).map(month => ({
      name: month,
      balance: groupedByMonth[month]
    }));
  }, [transactions]);

  const { totalDeposited, totalEarned } = useMemo(() => {
    let invested = 0;
    let earned = 0;
    transactions.forEach(tx => {
      if (tx.status === 'successful') {
        if (tx.type === 'deposit') invested += tx.amount;
        if (tx.type === 'interest') earned += tx.amount;
      }
    });
    return { totalDeposited: invested, totalEarned: earned };
  }, [transactions]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-40 flex flex-col gap-32 mb-40"
    >
      <div className="flex justify-between items-center mb-16">
        <div>
          <h2 className="text-xl mb-4">Growth Tracker</h2>
          <p className="text-sm">Monitor your balance progression</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="flex gap-12">
        <div className="flex-1 card p-16 flex flex-col gap-8">
          <span className="text-xs text-light font-medium">Total Invested</span>
          <span className="text-lg font-bold text-primary">{formatCurrency(totalDeposited)}</span>
        </div>
        <div className="flex-1 card p-16 flex flex-col gap-8 border-l-4" style={{ borderColor: 'var(--success)' }}>
          <span className="text-xs text-light font-medium flex items-center gap-4">Growth <TrendingUp size={12} className="text-success" /></span>
          <span className="text-lg font-bold text-success">+{formatCurrency(totalEarned)}</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card w-full h-80 pt-24 pb-12 px-0">
        <h3 className="px-24 mb-16 font-semibold">Balance Over Time</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-light)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-light)' }} tickFormatter={(val) => `R${val/1000}k`} />
            <Tooltip 
              formatter={(value: any) => [formatCurrency(value as number), 'Balance']}
              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: 'var(--shadow)' }}
            />
            <Area type="monotone" dataKey="balance" stroke="var(--success)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Goal Projection */}
      <div className="card bg-info-light flex items-start gap-16 mt-8" style={{ color: 'var(--info)' }}>
         <ShieldAlert size={24} className="mt-4" />
         <div className="flex-1">
           <h4 className="font-semibold text-sm mb-4">Stay Consistent</h4>
           <p className="text-xs opacity-90 leading-relaxed mb-12">
             You are on track to earn exactly {formatCurrency(totalDeposited * 0.02)} next month! Maintain your R{plan.monthlyContribution} monthly deposits.
           </p>
         </div>
      </div>
    </motion.div>
  );
};

export default GrowthDashboard;
