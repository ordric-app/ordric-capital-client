import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Save, Calculator } from 'lucide-react';

interface CreatePlanFormProps {
  onPlanCreated: (plan: any) => void;
}

const CreatePlanForm: React.FC<CreatePlanFormProps> = ({ onPlanCreated }) => {
  const [type, setType] = useState<'individual' | 'group'>('individual');
  const [contribution, setContribution] = useState<number>(3000); // Default R3000
  const [term, setTerm] = useState<number>(6); // Default 6 months
  const [groupName, setGroupName] = useState<string>('');
  
  // Real-time calculation logic
  // FV = P * [((1 + r)^n - 1) / r] * (1 + r) for beginning of month contributions
  const projectedValues = useMemo(() => {
    const rate = 0.02; // 2.0% monthly
    const totalContributed = contribution * term;
    
    let futureValue = contribution * (((Math.pow(1 + rate, term) - 1) / rate) * (1 + rate));
    const estimatedReturns = futureValue - totalContributed;

    return {
      totalContributed,
      estimatedReturns,
      futureValue
    };
  }, [contribution, term]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create realistic mock start date (e.g. 2 months ago to show some progress in charts)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 2); 
    
    const newPlan: any = {
      id: `PLAN-${Math.floor(Math.random() * 10000)}`,
      type,
      monthlyContribution: contribution,
      termMonths: term,
      startDate: startDate.toISOString(),
      progressMonths: 2, // Mocking that 2 months have passed
      groupName: type === 'group' ? groupName : null,
    };

    onPlanCreated(newPlan);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col p-32 mb-40"
    >
      <div className="mb-32">
        <h2 className="mb-12">Open Stokvel Account</h2>
        <p>Start your wealth creation journey with Mutual Fund Stokvel.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-24">
        
        {/* Account Type */}
        <div className="flex flex-col gap-12">
          <label className="font-semibold text-primary">Plan Type</label>
          <div className="flex gap-12">
            <button 
              type="button"
              className={`flex-1 p-16 rounded-xl flex flex-col items-center gap-8 border transition-all ${type === 'individual' ? 'border-[var(--primary)] bg-[#fdf4f9]' : 'border-[var(--grey)]'}`}
              onClick={() => setType('individual')}
              style={type === 'individual' ? { borderColor: 'var(--primary)', borderWidth: 2 } : { borderColor: 'var(--grey)' }}
            >
              <User size={24} color={type === 'individual' ? 'var(--primary)' : 'var(--text-light)'} />
              <span className={type === 'individual' ? 'font-bold text-primary' : 'text-light'}>Individual</span>
            </button>
            <button 
              type="button"
              className={`flex-1 p-16 rounded-xl flex flex-col items-center gap-8 border transition-all ${type === 'group' ? 'border-[var(--primary)] bg-[#fdf4f9]' : 'border-[var(--grey)]'}`}
              onClick={() => setType('group')}
              style={type === 'group' ? { borderColor: 'var(--primary)', borderWidth: 2 } : { borderColor: 'var(--grey)' }}
            >
              <Users size={24} color={type === 'group' ? 'var(--primary)' : 'var(--text-light)'} />
              <span className={type === 'group' ? 'font-bold text-primary' : 'text-light'}>Group</span>
            </button>
          </div>
        </div>

        {/* Group Specific Fields */}
        {type === 'group' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-12">
            <label className="font-semibold text-primary">Group Name</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. Dream Home Fund" 
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="p-16 rounded-xl border"
              style={{ borderColor: 'var(--grey)', outline: 'none', width: '100%', fontSize: 16 }}
            />
          </motion.div>
        )}

        {/* Contribution Amount */}
        <div className="flex flex-col gap-12">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-primary">Monthly Contribution</label>
            <span className="font-bold text-xl text-primary">{formatCurrency(contribution)}</span>
          </div>
          <input 
            type="range" 
            min="120" 
            max="100000" 
            step="100"
            value={contribution}
            onChange={(e) => setContribution(Number(e.target.value))}
            style={{ accentColor: 'var(--primary)', width: '100%' }}
          />
          <div className="flex justify-between text-xs text-light">
            <span>R120</span>
            <span>R100,000</span>
          </div>
        </div>

        {/* Savings Term */}
        <div className="flex flex-col gap-12">
          <label className="font-semibold text-primary">Savings Term</label>
          <div className="flex gap-12">
            {[3, 6, 12].map(t => (
              <button
                key={t}
                type="button"
                className="flex-1 p-12 rounded-xl text-center transition-all font-semibold"
                onClick={() => setTerm(t)}
                style={{ 
                  backgroundColor: term === t ? 'var(--primary)' : 'var(--grey)',
                  color: term === t ? 'var(--white)' : 'var(--text-dark)'
                }}
              >
                {t} Months
              </button>
            ))}
          </div>
        </div>

        {/* Projections Card */}
        <div className="card mt-12 bg-white" style={{ borderColor: 'var(--success-light)', borderLeftWidth: 4, borderLeftColor: 'var(--success)' }}>
          <div className="flex items-center gap-8 mb-16">
            <Calculator size={20} color="var(--success)" />
            <h3 className="font-semibold text-success m-0">Projected Returns (2.0% pm)</h3>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="flex justify-between">
              <span className="text-light">Total Contributed:</span>
              <span className="font-medium">{formatCurrency(projectedValues.totalContributed)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light">Estimated Growth:</span>
              <span className="font-medium text-success">+{formatCurrency(projectedValues.estimatedReturns)}</span>
            </div>
            
            <div style={{ height: 1, backgroundColor: 'var(--grey)', margin: '8px 0' }} />
            
            <div className="flex justify-between items-center">
              <span className="font-semibold">Payout at Maturity:</span>
              <span className="font-bold text-xl text-success">{formatCurrency(projectedValues.futureValue)}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-20 mb-40">
          <Save size={20} className="mr-8" />
          Start Stokvel Plan
        </button>

      </form>
    </motion.div>
  );
};

export default CreatePlanForm;
