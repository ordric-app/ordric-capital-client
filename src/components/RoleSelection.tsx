import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Users, UserCog, UserPlus, LogIn } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: string) => void;
  onLogin: () => void;
  onCreateAccount: () => void;
}

const roles = [
  { id: 'individual', title: 'Individual client', icon: <User size={24} /> },
  { id: 'business', title: 'Business client', icon: <Briefcase size={24} /> },
  { id: 'staff', title: 'Staff member', icon: <Users size={24} /> },
  { id: 'agent', title: 'Agent or consultant', icon: <UserCog size={24} /> }
];

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onLogin, onCreateAccount }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col p-24 bg-white"
      style={{ overflow: 'hidden' }}
    >
      <div className="mt-12 mb-20">
        <h2 className="mb-12">Who are you?</h2>
        <p>Please select your account type to proceed with the best experience.</p>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
        <div className="flex flex-col gap-12">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.02, backgroundColor: '#f5f5f5' }}
              whileTap={{ scale: 0.98 }}
              className="card flex items-center gap-16 cursor-pointer"
              onClick={() => onSelect(role.id)}
            >
              <div 
                className="p-12 rounded-xl"
                style={{ backgroundColor: '#fdf4f9', color: '#832267' }}
              >
                {role.icon}
              </div>
              <span className="font-semibold">{role.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-12 mt-20">
        <button className="btn btn-primary" onClick={onCreateAccount}>
          <UserPlus size={20} className="mr-8" />
          Create Account
        </button>
        <button className="btn btn-outline" onClick={onLogin}>
          <LogIn size={20} className="mr-8" />
          Login to Existing Account
        </button>
      </div>
    </motion.div>
  );
};

export default RoleSelection;
