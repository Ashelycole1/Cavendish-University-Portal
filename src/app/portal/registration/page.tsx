'use client';

import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, AlertCircle, BookOpen, Clock, Loader2 } from 'lucide-react';

// --- Domain Interfaces ---
export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  isAvailable: boolean;
}

export interface StudentRecord {
  studentId: string;
  name: string;
  program: string;
  yearOfStudy: number;
  semester: number;
  completedCourses: string[];
}

// Mock Data
const MOCK_STUDENT: StudentRecord = {
  studentId: "CU-2023-08912",
  name: "John Doe",
  program: "BSc. Computer Science",
  yearOfStudy: 2,
  semester: 1,
  completedCourses: ["CS101", "MA101", "PH101"]
};

const AVAILABLE_COURSES: Course[] = [
  { id: '1', code: 'CS201', title: 'Data Structures and Algorithms', credits: 4, prerequisites: ['CS101'], isAvailable: true },
  { id: '2', code: 'CS202', title: 'Database Management Systems', credits: 3, prerequisites: ['CS101'], isAvailable: true },
  { id: '3', code: 'MA201', title: 'Linear Algebra', credits: 3, prerequisites: ['MA101'], isAvailable: true },
  { id: '4', code: 'CS301', title: 'Machine Learning Basics', credits: 4, prerequisites: ['CS201', 'MA201'], isAvailable: false }, // Prereqs not met
];

type WizardStep = 'SELECT_COURSES' | 'REVIEW' | 'CONFIRMATION';

export default function RegistrationWizard() {
  const [step, setStep] = useState<WizardStep>('SELECT_COURSES');
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCourseToggle = (courseId: string) => {
    const nextIds = new Set(selectedCourseIds);
    if (nextIds.has(courseId)) {
      nextIds.delete(courseId);
    } else {
      nextIds.add(courseId);
    }
    setSelectedCourseIds(nextIds);
  };

  const totalCredits = Array.from(selectedCourseIds).reduce((acc, currentId) => {
    const course = AVAILABLE_COURSES.find(c => c.id === currentId);
    return acc + (course?.credits || 0);
  }, 0);

  const simulateSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep('CONFIRMATION');
    showToast('Course Registration Successful!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };



  return (
    <div className="h-full flex flex-col relative w-full pt-4">
      
      {/* Wizard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-2">
          Smart Registration Wizard
        </h1>
        <p className="text-white/50">Select courses for Year {MOCK_STUDENT.yearOfStudy}, Semester {MOCK_STUDENT.semester}</p>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mt-8 max-w-2xl">
          {['SELECT_COURSES', 'REVIEW', 'CONFIRMATION'].map((s, idx) => (
            <div key={s} className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
                  ${step === s ? 'bg-[#00B3E6] text-white shadow-[0_0_15px_rgba(0,179,230,0.5)]' : 
                    ['REVIEW', 'CONFIRMATION'].includes(step) && idx === 0 || step === 'CONFIRMATION' && idx === 1 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/10 text-white/40 border border-white/20'}`}
                >
                  {idx + 1}
                </div>
                <span className={`text-sm font-medium ${step === s ? 'text-white' : 'text-white/40'}`}>
                  {s.replace('_', ' ')}
                </span>
              </div>
              {idx < 2 && <div className="h-[2px] flex-1 bg-white/10 rounded-full" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Area - Glass Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
        
        {/* Step 1: Course Selection */}
        {step === 'SELECT_COURSES' && (
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Available Modules</h2>
                <p className="text-sm text-white/50">Minimum 12 credits required for this semester.</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B3E6]/10 border border-[#00B3E6]/30 rounded-xl">
                  <BookOpen className="w-4 h-4 text-[#00B3E6]" />
                  <span className="font-semibold text-[#00B3E6]">{totalCredits}</span>
                  <span className="text-white/60 text-sm">Credits Selected</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-4">
              {AVAILABLE_COURSES.map(course => {
                const isSelected = selectedCourseIds.has(course.id);
                // Simple logic check: in real app, check subset of completed courses
                const prereqsMet = course.prerequisites.every(p => MOCK_STUDENT.completedCourses.includes(p));
                const canSelect = course.isAvailable && prereqsMet;

                return (
                  <button
                    key={course.id}
                    disabled={!canSelect}
                    onClick={() => handleCourseToggle(course.id)}
                    className={`relative text-left p-6 rounded-2xl border transition-all duration-300 w-full overflow-hidden
                      ${!canSelect 
                        ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed grayscale' 
                        : isSelected
                          ? 'bg-[#00B3E6]/10 border-[#00B3E6]/50 shadow-[0_0_20px_rgba(0,179,230,0.15)] ring-1 ring-[#00B3E6]/20 transform scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-[#00B3E6]">
                        <CheckCircle2 size={24} className="fill-[#00B3E6]/20" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${isSelected ? 'bg-[#00B3E6]/20 text-[#00B3E6]' : 'bg-white/10 text-white/70'}`}>
                        {course.code}
                      </span>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Clock size={12} /> {course.credits} Credits
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{course.title}</h3>

                    {course.prerequisites.length > 0 && (
                      <div className="mt-auto">
                        <p className="text-xs text-white/40 mb-1">Prerequisites:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.prerequisites.map(prereq => (
                            <span key={prereq} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                              {prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {!prereqsMet && (
                      <div className="absolute bottom-0 left-0 w-full bg-red-500/90 text-white text-xs font-medium py-1.5 px-4 flex items-center gap-2 backdrop-blur-md">
                        <AlertCircle size={12} /> Prerequisites not met
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setStep('REVIEW')}
                disabled={selectedCourseIds.size === 0}
                className="bg-[#00B3E6] hover:bg-[#0092bc] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,179,230,0.3)] hover:shadow-[0_0_30px_rgba(0,179,230,0.5)]"
              >
                Review Selection <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 'REVIEW' && (
          <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">Review Your Units</h2>

            <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white/60 p-4 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-medium">Course Code</th>
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium text-right">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Array.from(selectedCourseIds).map(id => {
                    const course = AVAILABLE_COURSES.find(c => c.id === id);
                    return (
                      <tr key={id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-medium text-[#00B3E6]">{course?.code}</td>
                        <td className="p-4 text-white/90">{course?.title}</td>
                        <td className="p-4 text-right font-medium">{course?.credits}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className="bg-[#00B3E6]/10 border-t border-[#00B3E6]/20">
                  <tr>
                    <td colSpan={2} className="p-4 text-right font-bold text-[#00B3E6]">Total Credits</td>
                    <td className="p-4 text-right font-bold text-white text-lg">{totalCredits}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('SELECT_COURSES')}
                className="px-8 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition-all w-1/3"
              >
                Back to Selection
              </button>
              <button
                onClick={simulateSubmit}
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex-1 flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm & Register'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'CONFIRMATION' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Registration Complete!</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              You have successfully registered for {totalCredits} credits. Your invoice has been updated in the Financial Health tab.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">
                Download Schedule
              </button>
              <button 
                onClick={() => window.location.href = '/portal'}
                className="px-6 py-3 rounded-xl font-bold bg-[#00B3E6] hover:bg-[#0092bc] transition-all shadow-[0_0_20px_rgba(0,179,230,0.3)]"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border animate-in slide-in-from-bottom-5
          ${toast.type === 'success' 
            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100' 
            : 'bg-red-500/20 border-red-500/50 text-red-100'}`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-400" /> : <AlertCircle className="text-red-400" />}
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
