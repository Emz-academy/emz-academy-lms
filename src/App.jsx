import React, { useState } from 'react';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, 
  Users, LogOut, Award, Play, Download, Plus, Key, 
  LayoutDashboard, DollarSign, BarChart3, CheckSquare, HelpCircle, FileSpreadsheet
} from 'lucide-react';

// Mock Users Database with individual subject access lists
const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'EMZ Academy Admin', active: true },
  { username: 'student10', password: 'pass123', role: 'student', grade: '10th', name: 'Ayesha Malik (Grade 10)', active: true, assignedSubjects: ['10-math', '10-phy', '10-chem', '10-acc'], feePaidMonths: ['January 2026', 'February 2026'], feeStatus: 'Paid' },
  { username: 'student11', password: 'pass123', role: 'student', grade: '11th', name: 'Bilal Ahmed (Grade 11)', active: true, assignedSubjects: ['11-acc', '11-math', '11-econ'], feePaidMonths: ['January 2026'], feeStatus: 'Pending' },
];

// Courses Database
const initialCourses = [
  { id: '10-math', title: 'High School Mathematics', grade: '10th', subject: 'Math', totalLectures: 72, totalHours: '144 Hours', completedLectures: 68, videos: [{ id: 'v1', title: 'Quadratic Equations', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n1', title: 'Math Handouts PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-phy', title: 'High School Physics', grade: '10th', subject: 'Science', totalLectures: 68, totalHours: '136 Hours', completedLectures: 60, videos: [{ id: 'v2', title: 'Simple Harmonic Motion', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n2', title: 'Physics Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-chem', title: 'High School Chemistry', grade: '10th', subject: 'Science', totalLectures: 70, totalHours: '140 Hours', completedLectures: 52, videos: [{ id: 'v3', title: 'Chemical Equilibrium', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n3', title: 'Chemistry Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-acc', title: 'High School Accounting', grade: '10th', subject: 'Commerce', totalLectures: 65, totalHours: '130 Hours', completedLectures: 59, videos: [{ id: 'v4', title: 'Accounting Basics', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n4', title: 'Accounting Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-acc', title: 'Principles of Accounting', grade: '11th', subject: 'Commerce', totalLectures: 30, totalHours: '22 Hours', completedLectures: 15, videos: [{ id: 'v5', title: 'Accounting Basics', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n5', title: 'Accounting Handouts', downloadUrl: 'https://drive.google.com/file/d/1U8DerULpNzXM-OHNke4gBVmeYbzVv7Fi/view?usp=sharing' }] },
  { id: '11-math', title: 'First Year Mathematics', grade: '11th', subject: 'Math', totalLectures: 28, totalHours: '20 Hours', completedLectures: 10, videos: [{ id: 'v6', title: 'Number Systems', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n6', title: 'Math Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-econ', title: 'First Year Economics', grade: '11th', subject: 'Commerce', totalLectures: 20, totalHours: '15 Hours', completedLectures: 5, videos: [{ id: 'v7', title: 'Consumer Behavior', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n7', title: 'Economics Notes PDF', downloadUrl: 'https://drive.google.com' }] },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [courses] = useState(initialCourses);
  const [usersList, setUsersList] = useState(initialUsers);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = usersList.find(u => u.username === usernameInput.trim() && u.password === passwordInput.trim());

    if (foundUser) {
      if (foundUser.role === 'student' && !foundUser.active) {
        setLoginError('آپ کے اکاؤنٹ کی رسائی معطل کر دی گئی ہے۔');
        return;
      }
      setCurrentUser(foundUser);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
      setActiveTab('dashboard');
    } else {
      setLoginError('صحیح یوزر نیم یا پاسورڈ درج کریں۔');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCourse(null);
    setActiveVideo(null);
  };

  // Admin Fee Toggle Action
  const toggleFeeStatus = (username) => {
    setUsersList(usersList.map(u => {
      if (u.username === username) {
        const newStatus = u.feeStatus === 'Paid' ? 'Pending' : 'Paid';
        return { ...u, feeStatus: newStatus };
      }
      return u;
    }));
  };

  // Admin Subject Access Toggle Action
  const toggleStudentSubject = (username, courseId) => {
    setUsersList(usersList.map(u => {
      if (u.username === username) {
        const currentAssigned = u.assignedSubjects || [];
        const isAssigned = currentAssigned.includes(courseId);
        const updatedSubjects = isAssigned 
          ? currentAssigned.filter(id => id !== courseId)
          : [...currentAssigned, courseId];
        return { ...u, assignedSubjects: updatedSubjects };
      }
      return u;
    }));
  };

  // Excel CSV Export Functionality for Admin
  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,Name,Username,Grade,Fee Status,Assigned Subjects\n";
    usersList.filter(u => u.role === 'student').forEach(s => {
      csvContent += `${s.name},${s.username},${s.grade},${s.feeStatus},"${(s.assignedSubjects || []).join(';')}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "EMZ_Academy_Students_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- 1. LOGIN SCREEN INTERFACE ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-block mb-2">
              <div className="flex items-baseline justify-center font-black tracking-tighter text-3xl">
                <span style={{ color: '#0d235c' }}>em</span>
                <span style={{ color: '#00b4d8' }}>z</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 ml-0.5 mb-2"></span>
              </div>
              <div className="text-xs font-bold tracking-widest uppercase mt-[-2px]" style={{ color: '#00b4d8' }}>Academy</div>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mt-2">Portal Sign In</h2>
          </div>

          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs p-3 rounded-xl mb-4 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                required 
              />
            </div>
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Students see only courses matching their grade AND explicitly assigned to them by admin
  const displayedCourses = currentUser.role === 'admin'
    ? courses 
    : courses.filter(c => c.grade === currentUser.grade && (currentUser.assignedSubjects || []).includes(c.id));

  const studentUsers = usersList.filter(u => u.role === 'student');

  // --- 2. AFTER LOGIN DASHBOARD INTERFACE ---
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-baseline font-black tracking-tighter text-xl">
            <span style={{ color: '#0d235c' }}>em</span>
            <span style={{ color: '#00b4d8' }}>z</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 mb-1"></span>
            <span className="text-[10px] uppercase tracking-widest border-l border-slate-200 ml-2 pl-2" style={{ color: '#00b4d8' }}>Academy</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
            <p className="text-[10px] text-cyan-600 uppercase tracking-wider font-semibold">{currentUser.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-500 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container with Sidebar & Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#091530] text-slate-300 p-4 space-y-2 hidden md:block">
          <button 
            onClick={() => { setActiveTab('dashboard'); setSelectedCourse(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'dashboard' && !selectedCourse ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('quizzes')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'quizzes' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Quizzes</span>
          </button>

          <button 
            onClick={() => setActiveTab('fees')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'fees' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Fee Vouchers</span>
          </button>

          {currentUser.role === 'admin' && (
            <button 
              onClick={() => setActiveTab('admin_students')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'admin_students' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <Users className="w-4 h-4" />
              <span>Student Access & Analytics</span>
            </button>
          )}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {/* --- VIEW: LECTURE PLAYER --- */}
          {selectedCourse ? (
            <div>
              <button 
                onClick={() => { setSelectedCourse(null); setActiveVideo(null); }}
                className="text-cyan-600 text-xs font-semibold mb-6 flex items-center space-x-1 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200"
              >
                ← Back to Dashboard
              </button>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full border border-cyan-200">
                  Grade {selectedCourse.grade} • {selectedCourse.subject}
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-3">{selectedCourse.title}</h2>
              </div>

              {activeVideo && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center space-x-2">
                      <Play className="w-4 h-4 text-cyan-500" />
                      <span>Streaming: {activeVideo.title}</span>
                    </h3>
                  </div>
                  <div className="aspect-video w-full bg-black">
                    <iframe 
                      src={activeVideo.embedUrl} 
                      title={activeVideo.title}
                      className="w-full h-full border-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center space-x-2">
                    <Video className="w-4 h-4 text-cyan-500" />
                    <span>Lectures List</span>
                  </h3>
                  {selectedCourse.videos.map((vid) => (
                    <div 
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer flex items-center justify-between mb-2 hover:border-cyan-400"
                    >
                      <span className="text-xs font-semibold text-slate-700">{vid.title}</span>
                      <span className="text-[10px] bg-cyan-500 text-white px-2.5 py-1 rounded font-bold uppercase">Watch</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>Study Handouts & PDFs</span>
                  </h3>
                  {selectedCourse.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">{note.title}</span>
                      <a href={note.downloadUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center space-x-1 shadow-sm">
                        <Download className="w-3 h-3" />
                        <span>Open PDF</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* --- DASHBOARD VIEW --- */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-black text-slate-800">Dashboard</h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedCourses.map((course) => {
                      const progressPercent = Math.round((course.completedLectures / course.totalLectures) * 100);
                      return (
                        <div 
                          key={course.id}
                          onClick={() => { setSelectedCourse(course); setActiveVideo(course.videos[0]); }}
                          className="bg-white border border-slate-200 hover:border-cyan-400 rounded-2xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                                  <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade {course.grade}</span>
                                  <h3 className="text-base font-bold text-slate-800">{course.title}</h3>
                                </div>
                              </div>
                            </div>

                            <p className="text-xs font-semibold text-slate-600 mb-3">{progressPercent}% Complete</p>
                            
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                              <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                            <div className="text-center flex-1 border-r border-slate-100">
                              <p className="font-bold text-slate-800 text-sm">{course.totalLectures}</p>
                              <p className="text-[10px] text-slate-400 uppercase">Lectures</p>
                            </div>
                            <div className="text-center flex-1">
                              <p className="font-bold text-slate-800 text-sm">{course.totalHours.replace(' Hours', '')}</p>
                              <p className="text-[10px] text-slate-400 uppercase">Course Hours</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- QUIZZES TAB --- */}
              {activeTab === 'quizzes' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800">Quizzes & Assessment Center</h3>
                  <p className="text-xs text-slate-600">Attempt weekly tests and evaluate your conceptual learning.</p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Grade {currentUser.grade || '10th'} Weekly Quiz #1</p>
                      <p className="text-xs text-slate-500">20 MCQs • Time Limit: 30 Mins</p>
                    </div>
                    <button className="bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm">Start Quiz</button>
                  </div>
                </div>
              )}

              {/* --- FEE VOUCHERS TAB --- */}
              {activeTab === 'fees' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800">Fee Vouchers & Payment Receipts</h3>
                  <p className="text-xs text-slate-600">Review your payment status and download official academy receipts.</p>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                      <div>
                        <p className="text-sm font-bold text-slate-800">Tuition Fee Voucher - 2026</p>
                        <p className="text-xs text-slate-500">Status: <strong className={currentUser.feeStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}>{currentUser.feeStatus || 'Paid'}</strong></p>
                      </div>
                      <button className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1 shadow-sm">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Receipt PDF</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-600">
                      <span>Paid Months Record: </span>
                      <strong className="text-slate-800">{(currentUser.feePaidMonths || ['January 2026', 'February 2026']).join(', ')}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* --- ADMIN STUDENT ACCESS & FEE CONTROL TAB --- */}
              {activeTab === 'admin_students' && currentUser.role === 'admin' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Student Access Control & Fee Management</h3>
                      <p className="text-xs text-slate-500 mt-1">Manage student subject permissions, fee statuses, and export reports.</p>
                    </div>

                    <button 
                      onClick={exportToExcel}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-md"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Export Excel Report</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {studentUsers.map((stu) => {
                      const studentGradeCourses = courses.filter(c => c.grade === stu.grade);
                      return (
                        <div key={stu.username} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 gap-3">
                            <div>
                              <div className="flex items-center space-x-3">
                                <span className="font-bold text-slate-800 text-sm">{stu.name}</span>
                                <span className="text-xs font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">Grade {stu.grade}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${stu.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                                Fee: {stu.feeStatus || 'Paid'}
                              </span>
                              <button 
                                onClick={() => toggleFeeStatus(stu.username)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${stu.feeStatus === 'Paid' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'}`}
                              >
                                {stu.feeStatus === 'Paid' ? 'Mark Fee Pending' : 'Mark Fee Paid'}
                              </button>
                            </div>
                          </div>

                          {/* Granular Subject Access Checkboxes */}
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">Granted Subject Access (Check/Uncheck to update student permissions):</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                              {studentGradeCourses.map(course => {
                                const hasAccess = (stu.assignedSubjects || []).includes(course.id);
                                return (
                                  <label key={course.id} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded transition-colors">
                                    <input 
                                      type="checkbox"
                                      checked={hasAccess}
                                      onChange={() => toggleStudentSubject(stu.username, course.id)}
                                      className="rounded border-slate-300 text-cyan-500 focus:ring-0"
                                    />
                                    <span className="truncate font-medium">{course.title.replace('High School ', '').replace('First Year ', '')}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
