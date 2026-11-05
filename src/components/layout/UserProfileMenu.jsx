import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, Check, SwitchCamera } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';

export const UserProfileMenu = () => {
  const { user, currentRole, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
    navigate(`/${newRole}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const trigger = (
    <div className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
      <img
        src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
        alt={user?.name || 'User'}
        className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500/20"
      />
      <div className="hidden md:flex flex-col text-left">
        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
          {user?.name || 'Demo User'}
        </span>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
          {user?.role || 'Guest'}
        </span>
      </div>
      <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
    </div>
  );

  const dropdownItems = [
    {
      label: (
        <div className="px-1 py-1">
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
          <div className="mt-2">
            <Badge variant="primary" className="text-[10px]">
              {ROLE_LABELS[currentRole] || currentRole}
            </Badge>
          </div>
        </div>
      ),
      disabled: true,
    },
    { separator: true },
    {
      label: 'Demo: Switch to Student',
      icon: <SwitchCamera className="h-4 w-4 text-blue-600" />,
      badge: currentRole === ROLES.STUDENT ? <Check className="h-3.5 w-3.5 text-blue-600" /> : null,
      onClick: () => handleRoleSwitch(ROLES.STUDENT),
    },
    {
      label: 'Demo: Switch to TPO',
      icon: <SwitchCamera className="h-4 w-4 text-emerald-600" />,
      badge: currentRole === ROLES.TPO ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : null,
      onClick: () => handleRoleSwitch(ROLES.TPO),
    },
    {
      label: 'Demo: Switch to Recruiter',
      icon: <SwitchCamera className="h-4 w-4 text-amber-600" />,
      badge: currentRole === ROLES.RECRUITER ? <Check className="h-3.5 w-3.5 text-amber-600" /> : null,
      onClick: () => handleRoleSwitch(ROLES.RECRUITER),
    },
    {
      label: 'Demo: Switch to Admin',
      icon: <SwitchCamera className="h-4 w-4 text-rose-600" />,
      badge: currentRole === ROLES.ADMIN ? <Check className="h-3.5 w-3.5 text-rose-600" /> : null,
      onClick: () => handleRoleSwitch(ROLES.ADMIN),
    },
    { separator: true },
    {
      label: 'Sign Out (Demo)',
      icon: <LogOut className="h-4 w-4" />,
      destructive: true,
      onClick: handleLogout,
    },
  ];

  return <Dropdown trigger={trigger} items={dropdownItems} align="right" menuClassName="w-64" />;
};

export default UserProfileMenu;
