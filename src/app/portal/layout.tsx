import React from 'react';
import { 
  GraduationCap, 
  Wallet, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

// Roles based on the case study context
export type UserRole = 'Student' | 'Registry' | 'Finance' | 'Lecturer';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: UserRole[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/portal', roles: ['Student', 'Registry', 'Finance', 'Lecturer'] },
  { icon: BookOpen, label: 'Course Registration', href: '/portal/registration', roles: ['Student', 'Registry'] },
  { icon: Wallet, label: 'Financial Health', href: '/portal/finance', roles: ['Student', 'Finance'] },
  { icon: GraduationCap, label: 'Grade Console', href: '/portal/grades', roles: ['Lecturer', 'Registry', 'Student'] },
  { icon: Users, label: 'Student Directory', href: '/portal/directory', roles: ['Registry', 'Lecturer'] },
  { icon: Settings, label: 'Settings', href: '/portal/settings', roles: ['Student', 'Registry', 'Finance', 'Lecturer'] },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simulating a logged-in student for demonstration
  const currentUserRole: UserRole = 'Student';
  
  const visibleItems = SIDEBAR_ITEMS.filter(item => item.roles.includes(currentUserRole));

  return (
    <div className="min-h-screen bg-[#002147] text-white flex overflow-hidden font-sans relative">
      {/* Background ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00B3E6] blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-[#00B3E6] blur-[120px] opacity-10 pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-10">
        <div className="p-8 pb-6 text-center border-b border-white/10">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#00B3E6] to-[#002147] border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,179,230,0.3)] mb-4">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wider">CAVENDISH</h1>
          <p className="text-xs text-[#00B3E6] font-medium tracking-widest mt-1">UNIVERSITY PORTAL</p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {visibleItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${item.href === '/portal' ? 'bg-[#00B3E6]/20 border border-[#00B3E6]/30 text-white shadow-[0_4px_12px_rgba(0,179,230,0.15)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className={`w-5 h-5 transition-colors duration-300 ${item.href === '/portal' ? 'text-[#00B3E6]' : 'group-hover:text-[#00B3E6]'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-4 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden z-10 relative">
        <header className="h-20 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Student Command Center</h2>
            <p className="text-sm text-white/50 mt-1">Welcome back, John Doe</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-[#00B3E6]">BSc. Computer Science</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=00B3E6&color=fff" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
