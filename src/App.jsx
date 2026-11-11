import React, {
  useState,
  useEffect
} from 'react';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, 
  Users, LogOut, Award, Play, Download, Plus, Key, 
  LayoutDashboard, DollarSign, BarChart3, CheckSquare, HelpCircle, FileSpreadsheet, Printer
} from 'lucide-react';

// Mock Users Database with Dynamic Fee Voucher Records
const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'EMZ Academy Admin', active: true },
  { 
    username: 'student10', 
    password: 'pass123', 
    role: 'student', 
    grade: '10th', 
    name: 'Ayesha Malik', 
    active: true, 
    assignedSubjects: ['10-math', '10-phy', '10-eng'], 
    standardFee: 2500,
    feeRecords: {
      'January 2026': { status: 'Paid', date: '2026-01-05', feeAmount: 2500 },
      'February 2026': { status: 'Paid', date: '2026-02-04', feeAmount: 2500 },
      'March 2026': { status: 'Pending', date: '-', feeAmount: 2500 }
    },
    progress: { '10-math': 12, '10-phy': 8, '10-eng': 14 }
  },
  { 
    username: 'student11', 
    password: 'pass123', 
    role: 'student', 
    grade: '11th', 
    name: 'Bilal Ahmed', 
    active: true, 
    assignedSubjects: ['11-acc', '11-math'], 
    standardFee: 2500,
    feeRecords: {
      'January 2026': { status: 'Paid', date: '2026-01-10', feeAmount: 2500 },
      'February 2026': { status: 'Pending', date: '-', feeAmount: 2500 },
      'March 2026': { status: 'Pending', date: '-', feeAmount: 2500 }
    },
    progress: { '11-acc': 15, '11-math': 10 }
  },
];

const initialCourses = [
  { id: '10-math', title: 'Mathematics', grade: '10th', subject: 'Math', totalLectures: 24, totalHours: '48 Hours' },
  { id: '10-phy', title: 'Physics', grade: '10th', subject: 'Science', totalLectures: 20, totalHours: '40 Hours' },
  { id: '10-eng', title: 'English', grade: '10th', subject: 'Languages', totalLectures: 16, totalHours: '32 Hours' },
  { id: '11-acc', title: 'Principles of Accounting', grade: '11th', subject: 'Commerce', totalLectures: 30, totalHours: '60 Hours' },
  { id: '11-math', title: 'Mathematics', grade: '11th', subject: 'Math', totalLectures: 28, totalHours: '56 Hours' },
];

const monthsList = ['January 2026', 'February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026'];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [courses] = useState(initialCourses);
  const [usersList, setUsersList] = useState(() => {

  const savedUsers =
    localStorage.getItem("emzUsers");

  return savedUsers
    ? JSON.parse(savedUsers)
    : initialUsers;

});
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Month Slicer State
  const [selectedMonth, setSelectedMonth] = useState('March 2026');

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newGrade, setNewGrade] = useState('10th');
  const [newSelectedSubjects, setNewSelectedSubjects] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

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
  };

  // Toggle Fee status for a specific student and month (Captures exact date & 2500 fee amount)
  const toggleStudentMonthFee = (username, month) => {
    const currentDateStr = new Date().toISOString().split('T')[0];
    setUsersList(usersList.map(u => {
      if (u.username === username) {
        const records = { ...(u.feeRecords || {}) };
        const currentRec = records[month] || { status: 'Pending', date: '-', feeAmount: 2500 };
        const newStatus = currentRec.status === 'Paid' ? 'Pending' : 'Paid';
        records[month] = {
          status: newStatus,
          date: newStatus === 'Paid' ? currentDateStr : '-',
          feeAmount: 2500
        };
        return { ...u, feeRecords: records };
      }
      return u;
    }));
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newName || !newUsername || !newPassword) return;

    const newStudent = {
      username: newUsername.trim(),
      password: newPassword.trim(),
      role: 'student',
      grade: newGrade,
      name: newName.trim(),
      active: true,
      assignedSubjects: newSelectedSubjects,
      standardFee: 2500,
      feeRecords: {
        'January 2026': { status: 'Pending', date: '-', feeAmount: 2500 },
        'February 2026': { status: 'Pending', date: '-', feeAmount: 2500 },
        'March 2026': { status: 'Pending', date: '-', feeAmount: 2500 }
      },
      progress: {}
    };

    setUsersList([...usersList, newStudent]);
    setNewName('');
    setNewUsername('');
    setNewPassword('');
    setNewSelectedSubjects([]);
    setSuccessMsg('اسٹوڈنٹ کامیابی سے رجسٹر ہو گیا!');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

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

  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,Student Name,Username,Grade,Month,Date Marked,Fee Status,Amount\n";
    usersList.filter(u => u.role === 'student').forEach(s => {
      const rec = (s.feeRecords || {})[selectedMonth] || { status: 'Pending', date: '-' };
      csvContent += `${s.name},${s.username},${s.grade},${selectedMonth},${rec.date},${rec.status},2500\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EMZ_Academy_Fee_Report_${selectedMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to get titles of assigned subjects for a student
  const getStudentSubjectNames = (assignedIds) => {
    if (!assignedIds || assignedIds.length === 0) return 'No Subjects Enrolled';
    return courses
      .filter(c => assignedIds.includes(c.id))
      .map(c => c.title)
      .join(', ');
  };

  // --- 1. LOGIN SCREEN ---
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
                placeholder="Username (admin or student10)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-cyan-500"
                required 
              />
            </div>
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-cyan-500"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-cyan-500/20"
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
  const gradeFilteredCourses = courses.filter(c => c.grade === newGrade);

  // --- 2. AFTER LOGIN INTERFACE ---
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
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-500 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
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
              <span>Student Management</span>
            </button>
          )}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {selectedCourse ? (
            <div>
              <button 
                onClick={() => { setSelectedCourse(null); }}
                className="text-cyan-600 text-xs font-semibold mb-6 flex items-center space-x-1 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200"
              >
                ← Back to Dashboard
              </button>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full border border-cyan-200">
                  Grade {selectedCourse.grade} • {selectedCourse.subject}
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-3">{selectedCourse.title}</h2>
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Google Drive Material & Lecture Link</p>
                    <p className="text-[10px] text-slate-500">Zero-cost hosting integration</p>
                  </div>
                  <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                    Open Material
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* --- DASHBOARD --- */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-black text-slate-800">Dashboard & Subject Coverage</h1>
                  <p className="text-xs text-slate-500">Your assigned subjects and lecture completion progress:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedCourses.map((course) => {
                      return (
                        <div 
                          key={course.id}
                          onClick={() => { setSelectedCourse(course); }}
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

                            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                              <div className="flex justify-between"><span>Total Lectures:</span> <strong className="text-slate-800">{course.totalLectures} Lectures</strong></div>
                              <div className="flex justify-between"><span>Duration:</span> <strong className="text-slate-800">{course.totalHours}</strong></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- QUIZZES --- */}
              {activeTab === 'quizzes' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800">Quizzes & Assessment Center</h3>
                  <p className="text-xs text-slate-600">Attempt weekly tests and evaluate your conceptual learning.</p>
                </div>
              )}

              {/* --- FEE VOUCHERS (AUTOMATED DYNAMIC VOUCHER GENERATOR) --- */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Fee Vouchers & Payment Receipts</h3>
                        <p className="text-xs text-slate-500 mt-0.5">EMZ Academy official fee records and monthly vouchers.</p>
                      </div>

                      {/* Month Slicer Dropdown */}
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-bold text-slate-600">Select Month:</label>
                        <select 
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                        >
                          {monthsList.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* --- STUDENT CREDENTIAL / LOGIN AREA FEE VOUCHER --- */}
                    {currentUser.role === 'student' && (() => {
                      const rec = (currentUser.feeRecords || {})[selectedMonth] || { status: 'Pending', date: '-', feeAmount: 2500 };
                      const isPaid = rec.status === 'Paid';
                      const enrolledSubjectsText = getStudentSubjectNames(currentUser.assignedSubjects);

                      return (
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                                EMZ Academy Official Fee Receipt
                              </span>
                              <h4 className="text-lg font-black text-slate-800 mt-2">Billing Month: {selectedMonth}</h4>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                                Status: {rec.status}
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">Payment Date: {rec.date}</p>
                            </div>
                          </div>

                          {/* Dynamic PDF/Printable Voucher Layout matching requested particulars */}
                          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                              <div className="flex items-baseline font-black tracking-tighter text-2xl">
                                <span style={{ color: '#0d235c' }}>em</span>
                                <span style={{ color: '#00b4d8' }}>z</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 mb-1"></span>
                                <span className="text-[10px] uppercase tracking-widest border-l border-slate-200 ml-2 pl-2" style={{ color: '#00b4d8' }}>Academy</span>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-bold text-slate-800">TUITION FEE RECEIPT</p>
                                <p className="text-[10px] text-slate-400">Standard Rate: Rs. 2,500/month</p>
                              </div>
                            </div>

                            {/* Particulars Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">a) Student Name</span>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">{currentUser.name}</p>
                              </div>

                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">b) Class Enrolled</span>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">Grade {currentUser.grade}</p>
                              </div>

                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">c) Billing Month</span>
                                <p className="font-bold text-cyan-600 text-sm mt-0.5">{selectedMonth}</p>
                              </div>

                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">d) Payment / Marked Date</span>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">{rec.date}</p>
                              </div>

                              <div className="md:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">e) Subjects Enrolled</span>
                                <p className="font-semibold text-slate-700 text-xs mt-0.5">{enrolledSubjectsText}</p>
                              </div>

                              <div className="md:col-span-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-center justify-between">
                                <div>
                                  <span className="text-[10px] text-emerald-700 font-bold uppercase">f) Total Fee Amount</span>
                                  <p className="font-black text-emerald-800 text-lg">Rs. 2,500 PK</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPaid ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                                  {isPaid ? 'PAID & VERIFIED' : 'PENDING PAYMENT'}
                                </span>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                              <p className="text-[10px] text-slate-400">Generated automatically via EMZ Academy LMS Portal</p>
                              <button 
                                onClick={() => alert(`Downloading official Fee Receipt PDF for ${currentUser.name} (${selectedMonth})...`)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm ${isPaid ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-200 text-slate-600 cursor-not-allowed'}`}
                                disabled={!isPaid}
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>{isPaid ? 'Download Fee Receipt PDF' : 'Voucher Locked (Pending)'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* --- ADMIN MODE: STUDENT FEE MANAGEMENT TABLE --- */}
                    {currentUser.role === 'admin' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                            Fee Status & Voucher Trigger for <span className="text-cyan-600">{selectedMonth}</span>
                          </h4>
                          <button 
                            onClick={exportToExcel}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>Export Month Report</span>
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-700">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                              <tr>
                                <th className="p-3">Student Name</th>
                                <th className="p-3">Class Enrolled</th>
                                <th className="p-3">Enrolled Subjects</th>
                                <th className="p-3">Standard Fee</th>
                                <th className="p-3">Date Marked</th>
                                <th className="p-3">Status ({selectedMonth})</th>
                                <th className="p-3 text-right">Admin Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {studentUsers.map((stu) => {
                                const rec = (stu.feeRecords || {})[selectedMonth] || { status: 'Pending', date: '-', feeAmount: 2500 };
                                const isPaid = rec.status === 'Paid';
                                const subNames = getStudentSubjectNames(stu.assignedSubjects);
                                return (
                                  <tr key={stu.username} className="hover:bg-slate-50/50">
                                    <td className="p-3 font-bold text-slate-800">{stu.name}</td>
                                    <td className="p-3">Grade {stu.grade}</td>
                                    <td className="p-3 text-slate-600 max-w-xs truncate">{subNames}</td>
                                    <td className="p-3 font-mono font-bold text-slate-800">Rs. 2,500</td>
                                    <td className="p-3 font-mono text-slate-500">{rec.date}</td>
                                    <td className="p-3">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                                        {rec.status}
                                      </span>
                                    </td>
                                    <td className="p-3 text-right">
                                      <button 
                                        onClick={() => toggleStudentMonthFee(stu.username, selectedMonth)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isPaid ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'}`}
                                      >
                                        {isPaid ? 'Mark Fee Pending' : 'Mark Fee Paid'}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- ADMIN STUDENT MANAGEMENT & ACCESS CONTROL --- */}
              {activeTab === 'admin_students' && currentUser.role === 'admin' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">New Student Onboard & Credential Generator</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Register new students, give them username/password, and select initial subject permissions.</p>

                    {successMsg && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl">
                        {successMsg}
                      </div>
                    )}

                    <form onSubmit={handleCreateStudent} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Student Full Name</label>
                          <input 
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                            placeholder="e.g. Sara Khan" 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Username ID</label>
                          <input 
                            type="text" 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)} 
                            placeholder="e.g. student10_sara" 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Password</label>
                          <input 
                            type="text" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="Initial password" 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Grade Level</label>
                          <select 
                            value={newGrade} 
                            onChange={(e) => {
                              setNewGrade(e.target.value);
                              setNewSelectedSubjects([]);
                            }} 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                          >
                            <option value="9th">Grade 9th</option>
                            <option value="10th">Grade 10th</option>
                            <option value="11th">Grade 11th</option>
                            <option value="12th">Grade 12th</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-cyan-600 mb-2">Select Subjects to Grant Access:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-slate-200">
                          {gradeFilteredCourses.map(c => {
                            const isChecked = newSelectedSubjects.includes(c.id);
                            return (
                              <label key={c.id} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer p-1.5 hover:bg-slate-50 rounded">
                                <input 
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setNewSelectedSubjects(newSelectedSubjects.filter(id => id !== c.id));
                                    } else {
                                      setNewSelectedSubjects([...newSelectedSubjects, c.id]);
                                    }
                                  }}
                                  className="rounded border-slate-300 text-cyan-500 focus:ring-0"
                                />
                                <span className="truncate">{c.title}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-sm transition-all"
                      >
                        Generate Credentials & Grant Access
                      </button>
                    </form>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Enrolled Students & Subject Permissions</h4>
                    
                    {studentUsers.map((stu) => {
                      const studentGradeCourses = courses.filter(c => c.grade === stu.grade);
                      return (
                        <div key={stu.username} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 gap-3">
                            <div>
                              <div className="flex items-center space-x-3">
                                <span className="font-bold text-slate-800 text-sm">{stu.name}</span>
                                <span className="text-xs font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">{stu.username}</span>
                                <span className="text-xs text-slate-500">Grade {stu.grade}</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-600">Standard Fee: Rs. 2,500</span>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">Modify Subject Access (Check to Grant, Uncheck to Revoke):</p>
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
                                    <span className="truncate font-medium">{course.title}</span>
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
