import React from 'react';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp,
  Clock,
  BookOpen
} from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Overview
          </h1>
          <p className="text-white/50 mt-1">Your academic and financial snapshot at a glance.</p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] flex-1">
        
        {/* Financial Health Widget - Glass Card */}
        <div className="col-span-1 md:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B3E6] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-[#00B3E6]/20 text-[#00B3E6] rounded-xl border border-[#00B3E6]/30">
              <Wallet size={20} />
            </div>
            <h3 className="text-lg font-bold">Financial Health</h3>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            {/* Circular Progress Bar Simulation */}
            <div className="w-32 h-32 rounded-full border-[8px] border-white/5 relative flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
              <div className="absolute inset-0 rounded-full border-[8px] border-[#00B3E6] border-t-transparent border-l-transparent transform -rotate-45" />
              <div className="text-center">
                <span className="text-2xl font-bold text-white">75%</span>
                <span className="block text-[10px] text-white/50 uppercase tracking-widest mt-1">Paid</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Total Tuition</span>
              <span className="font-semibold">UGX 4,200,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Balance Due</span>
              <span className="font-semibold text-red-400">UGX 1,050,000</span>
            </div>
            <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-sm font-semibold py-2.5 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
              <CreditCard size={16} /> Make Payment
            </button>
          </div>
        </div>

        {/* Course Progress Tracker */}
        <div className="col-span-1 md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-bold">Academic Timeline</h3>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6 relative">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/10 rounded-full" />
            
            {/* Timeline Item 1 */}
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircleIcon />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex-1 mt-[-4px]">
                <h4 className="font-bold text-emerald-400 mb-1">Year 1 Completed</h4>
                <p className="text-sm text-white/60">CGPA: 4.2 • 36 Credits Earnt</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#00B3E6]/20 border-2 border-[#00B3E6] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,179,230,0.3)]">
                <Clock size={20} className="text-[#00B3E6]" />
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex-1 mt-[-4px]">
                <h4 className="font-bold text-white mb-1">Year 2, Semester 1 (Current)</h4>
                <p className="text-sm text-white/70 mb-3">14 Credits Registered • Week 6 of 15</p>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00B3E6] w-[40%]" />
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex items-start gap-6 relative z-10 opacity-50">
              <div className="w-12 h-12 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-white/40" />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex-1 mt-[-4px]">
                <h4 className="font-bold text-white/50 mb-1">Year 2, Semester 2</h4>
                <p className="text-sm text-white/40">Not Started</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
