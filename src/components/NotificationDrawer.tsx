import React from 'react';
import { X, CloudRain, AlertTriangle, TrendingUp, Bug, CheckCircle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: string;
  district: string;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  state,
  district,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'weather',
      title: 'Precipitation Alert (IMD)',
      time: '18 mins ago',
      desc: `Scattered convective rain (8-14mm) predicted across ${district} in the next 36 to 48 hours. Postpone open-furrow irrigation.`,
      icon: CloudRain,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 2,
      type: 'pest',
      title: 'Yellow Rust Early Warning',
      time: '2 hours ago',
      desc: `High atmospheric moisture (>75%) in ${state} elevates stripe rust spore incubation in wheat tillering stages. Inspect flag leaves.`,
      icon: Bug,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 3,
      type: 'mandi',
      title: 'AGMARKNET Mandi Price Surge',
      time: '5 hours ago',
      desc: `${district} Mandi modal price for Wheat HD-2967 increased to ₹2,425/quintal (+₹45 from yesterday).`,
      icon: TrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: 4,
      type: 'state',
      title: 'Inter-State Knowledge Exchange',
      time: 'Yesterday',
      desc: `Punjab DSR (Direct Seeded Rice) water conservation protocol adopted by UP Agricultural Department for eastern districts.`,
      icon: CheckCircle,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#091D14] border-l border-emerald-500/30 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                🔔 Field Advisories & Alerts
              </h3>
              <p className="text-xs text-emerald-300/70">{district}, {state} • Active Monitoring</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="p-3.5 bg-[#0B2519] border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${n.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{n.title}</h4>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-500/20">
          <button
            onClick={onClose}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};
