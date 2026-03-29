import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, ShieldCheck, Filter } from 'lucide-react';
import type { Transaction } from './StokvelDashboard';

interface HistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<HistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'interest'>('all');

  const filteredTxs = transactions.filter(tx => filter === 'all' || tx.type === filter);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(val);

  const getIcon = (type: string) => {
    switch(type) {
      case 'deposit': return <ArrowDownLeft size={20} className="text-primary" />;
      case 'interest': return <ArrowUpRight size={20} className="text-success" />;
      case 'withdrawal': return <ArrowUpRight size={20} className="text-danger" />;
      default: return <ShieldCheck size={20} className="text-light" />;
    }
  };

  const getColor = (type: string) => {
    switch(type) {
      case 'deposit': return '#fdf4f9';
      case 'interest': return 'var(--success-light)';
      case 'withdrawal': return 'var(--danger-light)';
      default: return '#f5f5f5';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-32 flex flex-col gap-32 h-full mb-40"
    >
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-xl">History</h2>
          <p className="text-sm">View recent movements</p>
        </div>
        <button className="btn btn-outline p-8 rounded-xl" style={{ width: 'auto' }}>
          <Filter size={20} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-12 overflow-x-auto pb-8" style={{ scrollbarWidth: 'none' }}>
        {['all', 'deposit', 'interest'].map((tab) => (
          <button
            key={tab}
            className={`px-16 py-8 rounded-full text-sm font-medium transition-all capitalize`}
            onClick={() => setFilter(tab as any)}
            style={{
              backgroundColor: filter === tab ? 'var(--primary)' : 'var(--grey)',
              color: filter === tab ? 'white' : 'var(--text-dark)',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-12 mt-8 pb-40">
        <AnimatePresence>
          {filteredTxs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-light mt-40">
              No transactions match this filter.
            </motion.div>
          ) : (
            filteredTxs.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center p-16 rounded-xl border transition-all hover:bg-slate-50 cursor-pointer"
                style={{ borderColor: 'var(--grey)' }}
              >
                <div className="flex items-center gap-16">
                  <div className="p-12 rounded-full" style={{ backgroundColor: getColor(tx.type) }}>
                    {getIcon(tx.type)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm capitalize">{tx.type}</span>
                    <span className="text-xs text-light font-medium">{format(new Date(tx.date), 'dd MMM yyyy, HH:mm')}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`font-bold ${tx.type === 'interest' ? 'text-success' : 'text-primary'}`}>
                    {tx.type === 'withdrawal' ? '-' : '+'}{formatCurrency(tx.amount)}
                  </span>
                  <span className="text-xs font-medium uppercase mt-4 px-8 py-2 rounded-full" 
                        style={{ backgroundColor: tx.status === 'successful' ? 'var(--success-light)' : 'var(--grey)', 
                                 color: tx.status === 'successful' ? 'var(--success)' : 'var(--text-light)' }}>
                    {tx.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;
