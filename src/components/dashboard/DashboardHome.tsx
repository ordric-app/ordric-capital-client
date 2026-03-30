import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  TrendingUp, 
  ArrowRight, 
  Plus, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Shield, 
  Briefcase,
  Heart,
  Scale,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface DashboardHomeProps {
  userName: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ userName }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col pb-40"
    >
      {/* Header */}
      <header className="dashboard-header">
        <div className="flex items-center gap-12">
          <div className="avatar">
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-xs text-light font-medium">{getGreeting()},</p>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-dark)' }}>{userName}</h3>
          </div>
        </div>
        <button className="notification-bell" style={{ border: 'none', cursor: 'pointer' }}>
          <Bell size={20} />
          <div className="notification-dot" />
        </button>
      </header>

      {/* Summary Cards */}
      <div className="summary-cards-container">
        {/* Stokvel Card */}
        <div className="summary-card stokvel">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold opacity-80 uppercase tracking-wider">Stokvel Savings</span>
            <TrendingUp size={18} className="opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'white' }}>{formatCurrency(12450.50)}</h2>
            <p className="text-xs opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>R1,500 contribution due in 4 days</p>
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-xs mb-4 opacity-90">
              <span>Maturity Progress</span>
              <span>65%</span>
            </div>
            <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3 }}>
              <div style={{ width: '65%', height: '100%', background: 'white', borderRadius: 3 }} />
            </div>
          </div>
        </div>

        {/* Loan Card */}
        <div className="summary-card loans">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold opacity-80 uppercase tracking-wider">Active Loan</span>
            <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>Active</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{formatCurrency(8200.00)}</h2>
            <p className="text-xs opacity-90">Balance: R8,200.00 / R15,000</p>
          </div>
          <div className="flex justify-between items-end mt-8">
            <div>
              <p className="text-xs opacity-70">Next payment</p>
              <p className="text-sm font-semibold">15 Apr 2026</p>
            </div>
            <ArrowRight size={20} className="opacity-80" />
          </div>
        </div>

        {/* Debt Recovery Card */}
        <div className="summary-card recovery">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold opacity-80 uppercase tracking-wider">Debt Recovery</span>
            <div className="badge badge-pending">2 Cases</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{formatCurrency(45300.00)}</h2>
            <p className="text-xs opacity-90">Estimated recovery value</p>
          </div>
          <div className="flex justify-between items-center mt-8">
            <span className="text-xs opacity-90">Status: In Progress</span>
            <div className="flex" style={{ gap: '-8px' }}>
              {[1, 2].map(i => (
                <div key={i} className="w-20 h-20 rounded-full border-2" style={{ borderColor: '#1e293b', background: '#475569', width: 20, height: 20 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-title">
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions-grid">
        <button className="action-item" style={{ border: 'none' }}>
          <Plus size={24} />
          <span>New Stokvel</span>
        </button>
        <button className="action-item" style={{ border: 'none' }}>
          <Zap size={24} />
          <span>Apply Loan</span>
        </button>
        <button className="action-item" style={{ border: 'none' }}>
          <Shield size={24} />
          <span>Debt Case</span>
        </button>
        <button className="action-item" style={{ border: 'none' }}>
          <FileText size={24} />
          <span>Upload Docs</span>
        </button>
        <button className="action-item" style={{ border: 'none' }}>
          <MessageSquare size={24} />
          <span>Support</span>
        </button>
        <button className="action-item" style={{ border: 'none' }}>
          <HelpCircle size={24} />
          <span>Info Center</span>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="section-title">
        <h3>Recent Activity</h3>
        <span className="view-all">View all</span>
      </div>
      <div className="activity-list">
        <div className="activity-card">
          <div className="activity-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-sm font-bold" style={{ color: 'var(--text-dark)' }}>Contribution Received</p>
            <p className="text-xs text-light">Stokvel Plan #4082 • 28 Mar</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-success">+R1,500</p>
            <p className="text-xs text-light">Completed</p>
          </div>
        </div>
        
        <div className="activity-card">
          <div className="activity-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}>
            <Clock size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-sm font-bold" style={{ color: 'var(--text-dark)' }}>Loan repayment</p>
            <p className="text-xs text-light">Standard Loan • 25 Mar</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold" style={{ color: 'var(--text-dark)' }}>-R850</p>
            <p className="text-xs text-light">Pending</p>
          </div>
        </div>
      </div>

      {/* Financial Tips */}
      <div className="tip-card">
        <Zap size={20} color="#fab005" style={{ marginTop: 4 }} />
        <div>
          <p className="text-sm font-bold" style={{ color: '#856404', marginBottom: 4 }}>Did you know?</p>
          <p className="text-xs" style={{ color: '#856404', lineHeight: 1.4 }}>
            Increasing your monthly stokvel contribution by just R200 can reduce your maturity time by 4 months.
          </p>
        </div>
      </div>

      {/* Services Shortcuts */}
      <div className="section-title">
        <h3>Our Services</h3>
      </div>
      <div className="px-24">
        <div className="grid grid-cols-2 gap-12">
            {[
                { title: 'Insurance', icon: <Heart size={20} />, color: '#ef4444' },
                { title: 'Wellness', icon: <Zap size={20} />, color: '#3b82f6' },
                { title: 'Compliance', icon: <Scale size={20} />, color: '#10b981' },
                { title: 'Business', icon: <Briefcase size={20} />, color: '#8b5cf6' }
            ].map((s, idx) => (
                <div key={idx} className="card p-12 flex items-center gap-12 cursor-pointer">
                    <div className="p-8 rounded-lg" style={{ background: `${s.color}15`, color: s.color }}>
                        {s.icon}
                    </div>
                    <span className="text-sm font-bold">{s.title}</span>
                </div>
            ))}
        </div>
      </div>
      
      <div style={{ height: 20 }} />
    </motion.div>
  );
};

export default DashboardHome;
