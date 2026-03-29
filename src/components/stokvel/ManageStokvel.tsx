import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Power, Wallet, FileText, ChevronRight } from 'lucide-react';
import type { StokvelPlan } from './StokvelDashboard';

interface ManageProps {
  plan: StokvelPlan;
  onCancel: () => void;
}

const ManageStokvel: React.FC<ManageProps> = ({ plan, onCancel }) => {
  const [showCancelWarning, setShowCancelWarning] = useState(false);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-32 flex flex-col gap-32 relative h-full mb-40"
    >
      <div className="mb-12">
        <h2 className="text-xl">Manage Stokvel</h2>
        <p className="text-sm">Account settings and requests</p>
      </div>

      {/* Plan Details Card */}
      <div className="card p-24 border flex flex-col gap-16" style={{ borderColor: 'var(--grey)' }}>
        <h3 className="font-semibold text-primary mb-8 border-b pb-8" style={{ borderColor: 'var(--grey)' }}>Plan Information</h3>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-light">Plan Type</span>
          <span className="font-medium capitalize">{plan.type} Account</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-light">Status</span>
          <span className="font-medium text-success bg-success-light px-8 py-2 rounded-full text-xs">Active</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-light">Monthly Debit</span>
          <span className="font-semibold">{formatCurrency(plan.monthlyContribution)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-light">Term Length</span>
          <span className="font-medium">{plan.termMonths} Months</span>
        </div>
      </div>

      {/* Settings Menu List */}
      <div className="flex flex-col gap-12">
        <button className="flex justify-between items-center p-16 rounded-xl bg-white border cursor-pointer hover:bg-slate-50 transition-all font-medium text-sm" style={{ borderColor: 'var(--grey)' }}>
          <div className="flex items-center gap-12">
            <Wallet size={20} className="text-primary" />
            Change Funding Source
          </div>
          <ChevronRight size={16} className="text-light" />
        </button>

        <button className="flex justify-between items-center p-16 rounded-xl bg-white border cursor-pointer hover:bg-slate-50 transition-all font-medium text-sm" style={{ borderColor: 'var(--grey)' }}>
          <div className="flex items-center gap-12">
            <FileText size={20} className="text-primary" />
            Download Policy Documents
          </div>
          <ChevronRight size={16} className="text-light" />
        </button>
      </div>

      <div className="mt-8">
        <button 
          className="btn btn-outline border-danger text-danger flex items-center justify-center gap-8 w-full font-semibold"
          onClick={() => setShowCancelWarning(true)}
        >
          <Power size={18} />
          Cancel Plan / Withdraw Early
        </button>
      </div>

      {/* Early Cancellation Warning Modal overlay */}
      <AnimatePresence>
        {showCancelWarning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50 flex flex-col p-24"
            style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}
          >
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="p-24 rounded-full bg-danger-light text-danger mb-24">
                <AlertCircle size={48} />
              </div>
              <h2 className="text-danger mb-16 text-xl">Early Cancellation</h2>
              <p className="text-sm text-light max-w-sm mb-32 leading-relaxed">
                Cancelling your Stokvel plan before the {plan.termMonths}-month maturity date will result in the loss of all accumulated growth and may incur a <strong className="text-dark">10% early withdrawal penalty</strong> on your capital.
              </p>

              <div className="flex flex-col gap-12 w-full">
                <button 
                  className="btn bg-danger text-white border-none w-full font-bold"
                  onClick={() => {
                    alert('Withdrawal request submitted.');
                    onCancel(); 
                  }}
                >
                  Confirm Withdrawal
                </button>
                <button 
                  className="btn btn-outline w-full font-medium"
                  style={{ borderColor: 'var(--grey)', color: 'var(--text-dark)' }}
                  onClick={() => setShowCancelWarning(false)}
                >
                  Keep My Plan Active
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageStokvel;
