import React, { useState } from 'react';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, 
  Users, LogOut, Award, Play, Download, Plus, Key, 
  LayoutDashboard, DollarSign, BarChart3, CheckSquare, HelpCircle, FileSpreadsheet
} from 'lucide-react';

// Mock Users Database
const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'EMZ Academy Admin', active: true },
  { username: 'student10', password: 'pass123', role: 'student', grade: '10th', name: 'Ayesha Malik (Grade 10)', active: true, assignedSubjects: ['10-math', '10-phy', '10-chem', '10-bio', '10-eng'], feePaidMonths: ['January 2026', 'February 2026'], feeStatus: 'Paid' },
  { username: 'student11', password: 'pass123', role: 'student', grade: '11th', name: 'Bilal Ahmed (Grade 11)', active: true, assignedSubjects: ['11-acc', '11-math', '11-econ'], feePaidMonths: ['January 2026'], feeStatus: 'Pending' },
];

// Courses with Coverage Analytics Data
const initialCourses = [
  // --- GRADE 10 SUBJECTS ---
  { id: '10-math', title: 'Mathematics', grade: '10th', subject: 'Math', totalLectures: 24, totalHours: '18 Hours', completedLectures: 12, videos: [{ id: 'v1', title: 'Quadratic Equations', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n1', title: 'Math Handouts PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-phy', title: 'Physics', grade: '10th', subject: 'Science', totalLectures: 20, totalHours: '15 Hours', completedLectures: 8, videos: [{ id: 'v2', title: 'Simple Harmonic Motion', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n2', title: 'Physics Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-chem', title: 'Chemistry', grade: '10th', subject: 'Science', totalLectures: 22, totalHours: '16 Hours', completedLectures: 11, videos: [{ id: 'v3', title: 'Chemical Equilibrium', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n3', title: 'Chemistry Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-bio', title: 'Biology', grade: '10th', subject: 'Science', totalLectures: 18, totalHours: '14 Hours', completedLectures: 9, videos: [{ id: 'v4', title: 'Gaseous Exchange', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n4', title: 'Biology Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-eng', title: 'English', grade: '10th', subject: 'Languages', totalLectures: 16, totalHours: '12 Hours', completedLectures: 14, videos: [{ id: 'v5', title: 'English Prose & Grammar', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n5', title: 'English Handouts PDF', downloadUrl: 'https://drive.google.com' }] },
  
  // --- GRADE 11 SUBJECTS ---
  { id: '11-acc', title: 'Principles of Accounting', grade: '11th', subject: 'Commerce', totalLectures: 30, totalHours: '22 Hours', completedLectures: 15, videos: [{ id: 'v6', title: 'Accounting Basics', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n6', title: 'Accounting Handouts (Google Drive)', downloadUrl: 'https://drive.google.com/file/d/1U8DerULpNzXM-OHNke4gBVmeYbzVv7Fi/view?usp=sharing' }] },
  { id: '11-math', title: 'Mathematics', grade: '11th', subject: 'Math', totalLectures: 28, totalHours: '20 Hours', completedLectures: 10, videos: [{ id: 'v7', title: 'Number Systems', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n7', title: 'Math Notes PDF', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-econ', title: 'Economics', grade: '11th', subject: 'Commerce', totalLectures: 20, totalHours: '15 Hours', completedLectures: 5, videos: [{ id: 'v8', title: 'Consumer Behavior', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n8', title: 'Economics Notes PDF', downloadUrl: 'https://drive.google.com' }] },
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

  // Login View
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-8 shadow-2xl">
          <div className="text-center mb-8">
            {/* EMZ Academy Official Branded Logo Header */}
            <div className="inline-block mb-3">
              <div className="flex items-baseline justify-center font-black tracking-tighter text-3xl">
                <span style={{ color: '#0d235c' }}>em</span>
                <span style={{ color: '#00b4d8' }}>z</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 ml-0.5 mb-2"></span>
              </div>
              <div className="text-cyan-400 font-bold text-xs tracking-widest uppercase mt-[-2px]" style={{ color: '#00b4d8' }}>Academy</div>
            </div>
            <h1 className="text-xl font-bold text-white">LMS Portal Login</h1>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl mb-4 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1">Username</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter Username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
                required 
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1">Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const displayedCourses = currentUser.role === 'admin'
    ? courses 
    : courses.filter(c => c.grade === currentUser.grade && (currentUser.assignedSubjects || []).includes(c.id));

  const studentUsers = usersList.filter(u => u.role === 'student');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar with EMZ Logo Branding */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-baseline font-black tracking-tighter text-lg">
            <span style={{ color: '#ffffff' }}>em</span>
            <span style={{ color: '#00b4d8' }}>z</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 mb-1"></span>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest border-l border-slate-800 ml-2 pl-2" style={{ color: '#00b4d8' }}>Academy</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">{currentUser.name}</p>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider">{currentUser.role} Account</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-900/80 border-b border-slate-800 px-6 py-2 flex items-center space-x-2 text-xs font-medium">
        <button 
          onClick={() => { setActiveTab('dashboard'); setSelectedCourse(null); }}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'dashboard' && !selectedCourse ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard & Coverage</span>
        </button>

        <button 
          onClick={() => setActiveTab('quizzes')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'quizzes' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Quizzes & Tests</span>
        </button>

        <button 
          onClick={() => setActiveTab('fees')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'fees' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Fee Vouchers & Receipts</span>
        </button>

        {currentUser.role === 'admin' && (
          <button 
            onClick={() => setActiveTab('admin_students')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'admin_students' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            <Users className="w-4 h-4" />
            <span>Admin Student & Fee Control</span>
          </button>
        )}
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        
        {/* --- VIEW: LECTURE PLAYER --- */}
        {selectedCourse ? (
          <div>
            <button 
              onClick={() => { setSelectedCourse(null); setActiveVideo(null); }}
              className="text-cyan-400 text-xs font-semibold mb-6 flex items-center space-x-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
            >
              ← Back to Main Dashboard
            </button>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                Grade {selectedCourse.grade} • {selectedCourse.subject}
              </span>
              <h2 className="text-2xl font-black text-white mt-3">{selectedCourse.title}</h2>
            </div>

            {activeVideo && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8 shadow-xl">
                <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                    <Play className="w-4 h-4 text-cyan-400" />
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
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>Lectures List</span>
                </h3>
                {selectedCourse.videos.map((vid) => (
                  <div 
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className="p-3 bg-slate-850 border border-slate-800 rounded-xl cursor-pointer flex items-center justify-between mb-2 hover:border-cyan-500/50"
                  >
                    <span className="text-xs font-semibold text-slate-200">{vid.title}</span>
                    <span className="text-[10px] bg-cyan-600 text-white px-2.5 py-1 rounded font-bold uppercase">Watch</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Study Handouts & PDFs</span>
                </h3>
                {selectedCourse.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{note.title}</span>
                    <a href={note.downloadUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center space-x-1">
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
            {/* --- STUDENT DASHBOARD / SUBJECT COVERAGE --- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-2xl font-black text-white">Subject Coverage & Dashboard</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentUser.role === 'admin' ? 'Master Overview of All Enrolled Subjects' : `Grade ${currentUser.grade} Assigned Subjects & Progress Tracker`}
                  </p>
                </div>

                {/* Subject Cards with Coverage Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedCourses.map((course) => {
                    const progressPercent = Math.round((course.completedLectures / course.totalLectures) * 100);
                    return (
                      <div 
                        key={course.id}
                        onClick={() => { setSelectedCourse(course); setActiveVideo(course.videos[0]); }}
                        className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20">
                              Grade {course.grade}
                            </span>
                            <span className="text-xs font-semibold text-emerald-400">{progressPercent}% Completed</span>
                          </div>

                          <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>

                          <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                            <div className="flex justify-between"><span>Total Lectures:</span> <strong className="text-white">{course.totalLectures} Lectures</strong></div>
                            <div className="flex justify-between"><span>Total Duration:</span> <strong className="text-white">{course.totalHours}</strong></div>
                            <div className="flex justify-between"><span>Covered:</span> <strong className="text-cyan-400">{course.completedLectures} Lectures Done</strong></div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- QUIZZES TAB --- */}
            {activeTab === 'quizzes' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Quizzes & Assessment Center</h3>
                <p className="text-xs text-slate-400">Attempt weekly tests and evaluate your conceptual learning.</p>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Grade {currentUser.grade || '10th'} Weekly Quiz #1</p>
                    <p className="text-xs text-slate-400">20 MCQs • Time Limit: 30 Mins</p>
                  </div>
                  <button className="bg-cyan-600 text-white font-bold text-xs px-4 py-2 rounded-lg">Start Quiz</button>
                </div>
              </div>
            )}

            {/* --- FEE VOUCHERS TAB --- */}
            {activeTab === 'fees' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Fee Vouchers & Payment Receipts</h3>
                <p className="text-xs text-slate-400">Review your payment status and download official academy receipts.</p>

                <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <div>
                      <p className="text-sm font-bold text-white">Tuition Fee Voucher - 2026</p>
                      <p className="text-xs text-slate-400">Status: <strong className={currentUser.feeStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}>{currentUser.feeStatus || 'Paid'}</strong></p>
                    </div>
                    <button className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt PDF</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span>Paid Months Record: </span>
                    <strong className="text-white">{(currentUser.feePaidMonths || ['January 2026', 'February 2026']).join(', ')}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* --- ADMIN STUDENT & FEE CONTROL TAB --- */}
            {activeTab === 'admin_students' && currentUser.role === 'admin' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Admin Student Progress & Fee Controller</h3>
                    <p className="text-xs text-slate-400 mt-1">Manage enrollments, fee statuses, and export student reports.</p>
                  </div>

                  <button 
                    onClick={exportToExcel}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-md"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export Excel Report</span>
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-850 text-slate-400 uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Grade</th>
                          <th className="p-3">Assigned Subjects</th>
                          <th className="p-3">Fee Status</th>
                          <th className="p-3 text-right">Fee Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {studentUsers.map((s) => (
                          <tr key={s.username} className="hover:bg-slate-850/50">
                            <td className="p-3 font-bold text-white">{s.name}</td>
                            <td className="p-3">{s.grade}</td>
                            <td className="p-3 text-cyan-400 font-mono">{(s.assignedSubjects || []).length} Subjects</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${s.feeStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                {s.feeStatus || 'Paid'}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button 
                                onClick={() => toggleFeeStatus(s.username)}
                                className={`px-3 py-1 rounded text-xs font-bold ${s.feeStatus === 'Paid' ? 'bg-amber-600/20 text-amber-400 hover:bg-amber-600/30' : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30'}`}
                              >
                                {s.feeStatus === 'Paid' ? 'Mark Fee Pending' : 'Mark Fee Paid'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
