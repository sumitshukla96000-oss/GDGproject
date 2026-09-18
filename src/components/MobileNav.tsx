import React from 'react';
import { Home, Sprout, Microscope, CloudSun, MoreHorizontal } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMore: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMore,
}) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'agroadvisory', label: 'Advisory', icon: Sprout },
    { id: 'crop-doctor', label: 'Doctor', icon: Microscope },
    { id: 'weather', label: 'Weather', icon: CloudSun },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071911]/95 backdrop-blur-lg border-t border-emerald-500/25 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-all ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
      <button
        onClick={onOpenMore}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold text-slate-400 hover:text-emerald-300"
      >
        <MoreHorizontal className="w-5 h-5 mb-0.5" />
        <span>More</span>
      </button>
    </nav>
  );
};
