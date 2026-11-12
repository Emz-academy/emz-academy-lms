import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Video, Users, LogOut, Download, 
  LayoutDashboard, DollarSign, BarChart3, CheckSquare, 
  FileSpreadsheet, HelpCircle, GraduationCap, Headphones, ShieldCheck
} from 'lucide-react';

// Mock Users Database with Detailed Visual Graph Data
const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'EMZ Academy Admin', active: true },
  { 
    username: 'student10', 
    password: 'pass123', 
    role: 'student', 
    grade: '10th', 
    name: 'Ayesha Malik', 
    active: true, 
    attendance: { attended: 15, total: 20 },
    assignedSubjects: ['10-math', '10-phy', '10-eng'], 
    standardFee: 2500,
    studyHours: { daily: 3.5, weekly: 21.0, monthly: 85.5 },
    studyStats: {
      dailyLog: [
        { label: 'Mon', hours: 3.0 },
        { label: 'Tue', hours: 4.5 },
        { label: 'Wed', hours: 2.5 },
        { label: 'Thu', hours: 4.0 },
        { label: 'Fri', hours: 3.5 },
        { label: 'Sat', hours: 2.0 },
        { label: 'Sun', hours: 1.5 },
      ],
      weeklyLog: [
        { label: 'Week 1', hours: 18 },
        { label: 'Week 2', hours: 22 },
        { label: 'Week 3', hours: 24.5 },
        { label: 'Week 4', hours: 21 },
      ],
      monthlyLog: [
        { label: 'Jan', hours: 78 },
        { label: 'Feb', hours: 82 },
        { label: 'Mar', hours: 85.5 },
        { label: 'Apr', hours: 90 },
      ]
    },
    feeRecords: {
      'January 2026': { status: 'Paid', date: '2026-01-05', feeAmount: 2500 },
      'February 2026': { status: 'Paid', date: '2026-02-04', feeAmount: 2500 },
      'March 2026': { status: 'Pending', date: '-', feeAmount: 2500 }
    },
    progress: { '10-math': 85, '10-phy': 60, '10-eng': 90 }
  },
  { 
    username: 'student11', 
    password: 'pass123', 
    role: 'student', 
    grade: '11th', 
    name: 'Bilal Ahmed', 
    active: true,
    attendance: { attended: 15, total: 20 },
    assignedSubjects: ['11-acc', '11-math'], 
    standardFee: 2500,
    studyHours: { daily: 2.8, weekly: 16.4, monthly: 68.0 },
    studyStats: {
      dailyLog: [
        { label: 'Mon', hours: 2.0 },
        { label: 'Tue', hours: 3.0 },
        { label: 'Wed', hours: 2.5 },
        { label: 'Thu', hours: 3.5 },
        { label: 'Fri', hours: 2.8 },
        { label: 'Sat', hours: 1.6 },
        { label: 'Sun', hours: 1.0 },
      ],
      weeklyLog: [
        { label: 'Week 1', hours: 14 },
        { label: 'Week 2', hours: 17 },
        { label: 'Week 3', hours: 20.6 },
        { label: 'Week 4', hours: 16.4 },
      ],
      monthlyLog: [
        { label: 'Jan', hours: 60 },
        { label: 'Feb', hours: 64 },
        { label: 'Mar', hours: 68 },
        { label: 'Apr', hours: 72 },
      ]
    },
    feeRecords: {
      'January 2026': { status: 'Paid', date: '2026-01-10', feeAmount: 2500 },
      'February 2026': { status: 'Pending', date: '-', feeAmount: 2500 },
      'March 2026': { status: 'Pending', date: '-', feeAmount: 2500 }
    },
    progress: { '11-acc': 70, '11-math': 50 }
  },
];

// Verified Curriculum Database (Grades 9 to 12)
const initialCourses = [
  // --- CLASS 9 ---
  { id: '9-eng', title: 'English', grade: '9th', subject: 'Languages', totalLectures: 16, totalHours: '32 Hours' },
  { id: '9-urdu', title: 'Urdu', grade: '9th', subject: 'Languages', totalLectures: 15, totalHours: '30 Hours' },
  { id: '9-islamiat', title: 'Islamiat', grade: '9th', subject: 'Islamic Studies', totalLectures: 12, totalHours: '24 Hours' },
  { id: '9-math', title: 'Mathematics', grade: '9th', subject: 'Mathematics', totalLectures: 24, totalHours: '48 Hours' },
  { id: '9-phy', title: 'Physics', grade: '9th', subject: 'Science', totalLectures: 20, totalHours: '40 Hours' },
  { id: '9-chem', title: 'Chemistry', grade: '9th', subject: 'Science', totalLectures: 22, totalHours: '44 Hours' },
  { id: '9-bio', title: 'Biology', grade: '9th', subject: 'Science', totalLectures: 18, totalHours: '36 Hours' },
  { id: '9-cs', title: 'Computer science', grade: '9th', subject: 'Computer', totalLectures: 20, totalHours: '40 Hours' },

  // --- CLASS 10 ---
  { id: '10-eng', title: 'English', grade: '10th', subject: 'Languages', totalLectures: 16, totalHours: '32 Hours' },
  { id: '10-urdu', title: 'Urdu', grade: '10th', subject: 'Languages', totalLectures: 15, totalHours: '30 Hours' },
  { id: '10-pst', title: 'Pakistan Studies', grade: '10th', subject: 'Social Studies', totalLectures: 14, totalHours: '28 Hours' },
  { id: '10-math', title: 'Mathematics', grade: '10th', subject: 'Mathematics', totalLectures: 24, totalHours: '48 Hours' },
  { id: '10-phy', title: 'Physics', grade: '10th', subject: 'Science', totalLectures: 20, totalHours: '40 Hours' },
  { id: '10-chem', title: 'Chemistry', grade: '10th', subject: 'Science', totalLectures: 22, totalHours: '44 Hours' },
  { id: '10-bio', title: 'Biology', grade: '10th', subject: 'Science', totalLectures: 18, totalHours: '36 Hours' },
  { id: '10-cs', title: 'Computer science', grade: '10th', subject: 'Computer', totalLectures: 20, totalHours: '40 Hours' },

  // --- CLASS 11 ---
  { id: '11-eng', title: 'English', grade: '11th', subject: 'Languages', totalLectures: 18, totalHours: '36 Hours' },
  { id: '11-urdu', title: 'Urdu', grade: '11th', subject: 'Languages', totalLectures: 16, totalHours: '32 Hours' },
  { id: '11-islamiat', title: 'Islamiat', grade: '11th', subject: 'Islamic Studies', totalLectures: 12, totalHours: '24 Hours' },
  { id: '11-phy', title: 'Physics', grade: '11th', subject: 'Science', totalLectures: 25, totalHours: '50 Hours' },
  { id: '11-chem', title: 'Chemistry', grade: '11th', subject: 'Science', totalLectures: 26, totalHours: '52 Hours' },
  { id: '11-bot', title: 'Biology (Botany)', grade: '11th', subject: 'Science', totalLectures: 18, totalHours: '36 Hours' },
  { id: '11-zoo', title: 'Biology (Zoology)', grade: '11th', subject: 'Science', totalLectures: 18, totalHours: '36 Hours' },
  { id: '11-math', title: 'Mathematics', grade: '11th', subject: 'Mathematics', totalLectures: 28, totalHours: '56 Hours' },
  { id: '11-cs', title: 'Computer Science', grade: '11th', subject: 'Computer', totalLectures: 20, totalHours: '40 Hours' },
  { id: '11-acc', title: 'Principles of Accounting', grade: '11th', subject: 'Commerce', totalLectures: 30, totalHours: '60 Hours' },
  { id: '11-com', title: 'Principles of Commerce', grade: '11th', subject: 'Commerce', totalLectures: 20, totalHours: '40 Hours' },
  { id: '11-econ', title: 'Economics', grade: '11th', subject: 'Commerce', totalLectures: 20, totalHours: '40 Hours' },
  { id: '11-bmath', title: 'Business Mathematics', grade: '11th', subject: 'Commerce', totalLectures: 22, totalHours: '44 Hours' },

  // --- CLASS 12 ---
  { id: '12-eng', title: 'English', grade: '12th', subject: 'Languages', totalLectures: 18, totalHours: '36 Hours' },
  { id: '12-urdu', title: 'Urdu', grade: '12th', subject: 'Languages', totalLectures: 16, totalHours: '32 Hours' },
  { id: '12-pst', title: 'Pakistan Studies', grade: '12th', subject: 'Social Studies', totalLectures: 14, totalHours: '28 Hours' },
  { id: '12-phy', title: 'Physics', grade: '12th', subject: 'Science', totalLectures: 25, totalHours: '50 Hours' },
  { id: '12-chem', title: 'Chemistry', grade: '12th', subject: 'Science', totalLectures: 26, totalHours: '52 Hours' },
  { id: '12-bot', title: 'Biology (Botany)', grade: '12th', subject: 'Science', totalLectures: 18, totalHours: '36 Hours' },
  { id: '12-zoo', title: 'Biology (Zoology)', grade: '12th', subject: 'Science', totalLectures: 18, totalHours: '36 Hours' },
  { id: '12-math', title: 'Mathematics', grade: '12th', subject: 'Mathematics', totalLectures: 30, totalHours: '60 Hours' },
  { id: '12-cs', title: 'Computer Science', grade: '12th', subject: 'Computer', totalLectures: 20, totalHours: '40 Hours' },
  { id: '12-acc', title: 'Principles of Accounting', grade: '12th', subject: 'Commerce', totalLectures: 32, totalHours: '64 Hours' },
  { id: '12-com', title: 'Principles of Commerce', grade: '12th', subject: 'Commerce', totalLectures: 22, totalHours: '44 Hours' },
  { id: '12-econ', title: 'Economics', grade: '12th', subject: 'Commerce', totalLectures: 22, totalHours: '44 Hours' },
  { id: '12-bstat', title: 'Business Statistics', grade: '12th', subject: 'Commerce', totalLectures: 20, totalHours: '40 Hours' },
  { id: '12-bank', title: 'Banking', grade: '12th', subject: 'Commerce', totalLectures: 18, totalHours: '36 Hours' },
  { id: '12-cgeo', title: 'Commercial Geography', grade: '12th', subject: 'Commerce', totalLectures: 18, totalHours: '36 Hours' },
];

const monthsList = ['January 2026', 'February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026'];

// Vertical Bar Graph Component
function VerticalBarChart({ title, subtitle, data, maxVal, barColorClass, unit = 'h' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <h4 className="text-sm font-black text-slate-800">{title}</h4>
        <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="mt-6 flex items-end justify-between space-x-2 h-40 pt-4 border-b border-slate-100 pb-2 px-1">
        {data.map((item, idx) => {
          const heightPercent = Math.min(100, Math.round((item.hours / maxVal) * 100));
          return (
            <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
              <span className="text-[10px] font-bold text-slate-600 mb-1.5 group-hover:scale-110 transition-transform">
                {item.hours}{unit}
              </span>
              <div className="w-full max-w-[32px] bg-slate-100 rounded-t-lg h-28 flex items-end overflow-hidden border border-slate-200/60">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-700 ${barColorClass}`}
                  style={{ height: `${heightPercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 mt-2">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [courses] = useState(initialCourses);
  
  // LocalStorage state management
  const [usersList, setUsersList] = useState(() => {
    const savedUsers = localStorage.getItem("emzUsers");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  useEffect(() => {
    localStorage.setItem("emzUsers", JSON.stringify(usersList));
  }, [usersList]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  // Slicer States
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('9th');
  const [selectedMonth, setSelectedMonth] = useState('March 2026');
  const [selectedAdminStudentView, setSelectedAdminStudentView] = useState('student10');

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newGrade, setNewGrade] = useState('9th');
  const [newSelectedSubjects, setNewSelectedSubjects] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Support Form State
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSuccess, setSupportSuccess] = useState('');

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
      studyHours: { daily: 2.0, weekly: 14.0, monthly: 56.0 },
      studyStats: {
        dailyLog: [
          { label: 'Mon', hours: 2.0 },
          { label: 'Tue', hours: 2.5 },
          { label: 'Wed', hours: 1.5 },
          { label: 'Thu', hours: 3.0 },
          { label: 'Fri', hours: 2.0 },
          { label: 'Sat', hours: 1.5 },
          { label: 'Sun', hours: 1.5 },
        ],
        weeklyLog: [
          { label: 'Week 1', hours: 12 },
          { label: 'Week 2', hours: 15 },
          { label: 'Week 3', hours: 14 },
          { label: 'Week 4', hours: 15 },
        ],
        monthlyLog: [
          { label: 'Jan', hours: 48 },
          { label: 'Feb', hours: 52 },
          { label: 'Mar', hours: 56 },
          { label: 'Apr', hours: 60 },
        ]
      },
      feeRecords: {
        'January 2026': { status: 'Pending', date: '-', feeAmount: 2500 },
        'February 2026': { status: 'Pending', date: '-', feeAmount: 2500 },
        'March 2026': { status: 'Pending', date: '-', feeAmount: 2500 }
      },
      attendance: { attended: 0, total: 0 },
      progress: {}
    };

    setUsersList([...usersList, newStudent]);
    setNewName('');
    setNewUsername('');
    setNewPassword('');
    setNewSelectedSubjects([]);
    setSuccessMsg(`اسٹوڈنٹ (${newName}) کامیابی سے رجسٹر ہو گیا!`);
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

  const activeUserRecord = usersList.find(u => u.username === currentUser.username) || currentUser;

  const displayedCourses = activeUserRecord.role === 'admin'
    ? courses.filter(c => c.grade === selectedGradeFilter)
    : courses.filter(c => c.grade === activeUserRecord.grade && (activeUserRecord.assignedSubjects || []).includes(c.id));

  const studentUsers = usersList.filter(u => u.role === 'student');
  const gradeFilteredCourses = courses.filter(c => c.grade === newGrade);
  const totalUploadedLecturesCount = courses.reduce((acc, curr) => acc + curr.totalLectures, 0);

  const defaultStats = {
    dailyLog: [
      { label: 'Mon', hours: 2.5 },
      { label: 'Tue', hours: 3.0 },
      { label: 'Wed', hours: 2.0 },
      { label: 'Thu', hours: 3.5 },
      { label: 'Fri', hours: 2.5 },
      { label: 'Sat', hours: 1.5 },
      { label: 'Sun', hours: 1.0 },
    ],
    weeklyLog: [
      { label: 'Week 1', hours: 14 },
      { label: 'Week 2', hours: 18 },
      { label: 'Week 3', hours: 16 },
      { label: 'Week 4', hours: 20 },
    ],
    monthlyLog: [
      { label: 'Jan', hours: 60 },
      { label: 'Feb', hours: 68 },
      { label: 'Mar', hours: 74 },
      { label: 'Apr', hours: 80 },
    ]
  };

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
            <p className="text-xs font-bold text-slate-800">{activeUserRecord.name}</p>
            <p className="text-[10px] text-cyan-600 uppercase tracking-wider font-semibold">{activeUserRecord.role}</p>
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
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#091530] text-slate-300 p-4 space-y-2 hidden md:block">
          {/* 1. Dashboard */}
          <button 
            onClick={() => { setActiveTab('dashboard'); setSelectedCourse(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'dashboard' && !selectedCourse ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* 2. My Learning */}
          <button 
            onClick={() => { setActiveTab('mylearning'); setSelectedCourse(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'mylearning' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Learning</span>
          </button>

          {/* 3. Exam */}
          <button 
            onClick={() => setActiveTab('exam')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'exam' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Exam & Quizzes</span>
          </button>

          {/* 4. Fee Vouchers */}
          <button 
            onClick={() => setActiveTab('fees')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'fees' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Fee Vouchers</span>
          </button>

          {/* 5. Support */}
          <button 
            onClick={() => setActiveTab('support')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'support' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
          >
            <Headphones className="w-4 h-4" />
            <span>Support</span>
          </button>

          {/* 6. Student Management (Admin Only) */}
          {activeUserRecord.role === 'admin' && (
            <button 
              onClick={() => setActiveTab('admin_students')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'admin_students' ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <Users className="w-4 h-4" />
              <span>Student Management</span>
            </button>
          )}

          {/* 7. Logout */}
          <div className="pt-4 border-t border-white/10 mt-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {selectedCourse ? (
            <div>
              <button 
                onClick={() => { setSelectedCourse(null); }}
                className="text-cyan-600 text-xs font-semibold mb-6 flex items-center space-x-1 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200"
              >
                ← Back
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
              {/* --- 1. DASHBOARD --- */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {activeUserRecord.role === 'admin' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase text-slate-400">Total Enrolled Students</p>
                          <p className="text-3xl font-black text-slate-800 mt-1">{studentUsers.length}</p>
                        </div>
                        <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                          <Users className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase text-slate-400">Total Lectures Available</p>
                          <p className="text-3xl font-black text-slate-800 mt-1">{totalUploadedLecturesCount}+</p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                          <Video className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADMIN OR STUDENT GRAPHS & SUBJECT PROGRESS */}
                  {activeUserRecord.role === 'admin' ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                        <div>
                          <h2 className="text-lg font-black text-slate-800 flex items-center space-x-2">
                            <BarChart3 className="w-5 h-5 text-cyan-600" />
                            <span>Student Performance & Study Graphs</span>
                          </h2>
                          <p className="text-xs text-slate-500">Inspect daily, weekly, and monthly study hour bar graphs for any student.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <label className="text-xs font-bold text-slate-600">Select Student:</label>
                          <select 
                            value={selectedAdminStudentView}
                            onChange={(e) => setSelectedAdminStudentView(e.target.value)}
                            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-cyan-500"
                          >
                            {studentUsers.map(s => (
                              <option key={s.username} value={s.username}>{s.name} (Grade {s.grade})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {studentUsers.length > 0 && (() => {
                        const inspectedStu = studentUsers.find(s => s.username === selectedAdminStudentView) || studentUsers[0];
                        const stuStats = inspectedStu.studyStats || defaultStats;
                        const stuAssignedCourses = courses.filter(c => c.grade === inspectedStu.grade && (inspectedStu.assignedSubjects || []).includes(c.id));

                        return (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                              <VerticalBarChart title="Daily Study Graph (1 Day)" subtitle="Hours studied per day" data={stuStats.dailyLog} maxVal={6} barColorClass="bg-gradient-to-t from-cyan-600 to-cyan-400" />
                              <VerticalBarChart title="Weekly Study Graph (1 Week)" subtitle="Study hours across 4 weeks" data={stuStats.weeklyLog} maxVal={30} barColorClass="bg-gradient-to-t from-emerald-600 to-emerald-400" />
                              <VerticalBarChart title="Monthly Study Graph (1 Month)" subtitle="Total hours per month" data={stuStats.monthlyLog} maxVal={100} barColorClass="bg-gradient-to-t from-indigo-600 to-indigo-400" />
                            </div>

                            {/* Inspected Student Subject Progress Breakdown */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                              <h4 className="text-sm font-black text-slate-800">Subject-wise Completion Percentage ({inspectedStu.name})</h4>
                              {stuAssignedCourses.length === 0 ? (
                                <p className="text-xs text-slate-400">No subjects currently assigned.</p>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {stuAssignedCourses.map(course => {
                                    const progVal = (inspectedStu.progress || {})[course.id] || 70;
                                    return (
                                      <div key={course.id} className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                        <div className="flex justify-between text-xs font-bold text-slate-700">
                                          <span>{course.title}</span>
                                          <span className="text-cyan-600">{progVal}% Completed</span>
                                        </div>
                                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full" style={{ width: `${progVal}%` }}></div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <VerticalBarChart title="Daily Study Hours (1 Day)" subtitle="Your day-by-day study log" data={(activeUserRecord.studyStats || defaultStats).dailyLog} maxVal={6} barColorClass="bg-gradient-to-t from-cyan-600 to-cyan-400" />
                        <VerticalBarChart title="Weekly Study Hours (1 Week)" subtitle="Your week-by-week study hours" data={(activeUserRecord.studyStats || defaultStats).weeklyLog} maxVal={30} barColorClass="bg-gradient-to-t from-emerald-600 to-emerald-400" />
                        <VerticalBarChart title="Monthly Study Hours (1 Month)" subtitle="Your monthly total hours" data={(activeUserRecord.studyStats || defaultStats).monthlyLog} maxVal={100} barColorClass="bg-gradient-to-t from-indigo-600 to-indigo-400" />
                      </div>

                      {/* Student's Own Subject Progress Breakdown */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-black text-slate-800 flex items-center space-x-2">
                          <BarChart3 className="w-5 h-5 text-cyan-600" />
                          <span>Subject-wise Progress Breakdown (कितना पढ़ा गया है)</span>
                        </h3>
                        <p className="text-xs text-slate-500">Your individual subject completion percentages:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {displayedCourses.map(course => {
                            const progVal = (activeUserRecord.progress || {})[course.id] || 75;
                            return (
                              <div key={course.id} className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                  <span>{course.title}</span>
                                  <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full text-[11px]">{progVal}% Completed</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                  <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 h-full rounded-full" style={{ width: `${progVal}%` }}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* --- 2. MY LEARNING --- */}
              {activeTab === 'mylearning' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h1 className="text-xl font-black text-slate-800">My Learning & Enrolled Courses</h1>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {activeUserRecord.role === 'admin' 
                          ? 'Complete curriculum inspection module across grades:' 
                          : 'Your assigned subjects, lecture videos, and progress:'}
                      </p>
                    </div>

                    {activeUserRecord.role === 'admin' && (
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-bold text-slate-600">Select Grade:</label>
                        <select 
                          value={selectedGradeFilter}
                          onChange={(e) => setSelectedGradeFilter(e.target.value)}
                          className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="9th">Grade 9th</option>
                          <option value="10th">Grade 10th</option>
                          <option value="11th">Grade 11th</option>
                          <option value="12th">Grade 12th</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayedCourses.map((course) => {
                      const progVal = (activeUserRecord.progress || {})[course.id] || 75;
                      return (
                        <div 
                          key={course.id}
                          onClick={() => { setSelectedCourse(course); }}
                          className="bg-slate-50 border border-slate-200 hover:border-cyan-400 rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-700 px-2.5 py-0.5 rounded-full">
                                Grade {course.grade}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold">{course.subject}</span>
                            </div>

                            <h3 className="text-base font-bold text-slate-800 mb-3">{course.title}</h3>

                            <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-white p-3 rounded-xl border border-slate-100">
                              <div className="flex justify-between"><span>Total Lectures:</span> <strong className="text-slate-800">{course.totalLectures} Lectures</strong></div>
                              <div className="flex justify-between"><span>Duration:</span> <strong className="text-slate-800">{course.totalHours}</strong></div>
                            </div>

                            {activeUserRecord.role === 'student' && (
                              <div className="space-y-1 mb-4">
                                <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                  <span>Progress Status</span>
                                  <span className="text-cyan-600">{progVal}% Completed</span>
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${progVal}%` }}></div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider flex items-center space-x-1">
                            <span>Open Learning Hub →</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- 3. EXAM & QUIZZES --- */}
              {activeTab === 'exam' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800">Exam & Quizzes Center</h3>
                  <p className="text-xs text-slate-600">Attempt weekly tests, mid-term examinations, and evaluate your conceptual learning.</p>
                  
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mt-4 space-y-3">
                    <span className="text-[10px] uppercase font-bold bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full">Active Assessment</span>
                    <h4 className="text-base font-bold text-slate-800">Weekly Concept Quiz #4</h4>
                    <p className="text-xs text-slate-500">Includes multiple choice and structured numerical problems.</p>
                    <button onClick={() => alert('Starting examination module...')} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm">
                      Start Quiz Now
                    </button>
                  </div>
                </div>
              )}

              {/* --- 4. FEE VOUCHERS --- */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Fee Vouchers & Payment Receipts</h3>
                        <p className="text-xs text-slate-500 mt-0.5">EMZ Academy official fee records and monthly vouchers.</p>
                      </div>

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

                    {activeUserRecord.role === 'student' && (() => {
                      const rec = (activeUserRecord.feeRecords || {})[selectedMonth] || { status: 'Pending', date: '-', feeAmount: 2500 };
                      const isPaid = rec.status === 'Paid';
                      const enrolledSubjectsText = getStudentSubjectNames(activeUserRecord.assignedSubjects);

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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">a) Student Name</span>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">{activeUserRecord.name}</p>
                              </div>

                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">b) Class Enrolled</span>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">Grade {activeUserRecord.grade}</p>
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
                                onClick={() => alert(`Downloading official Fee Receipt PDF for ${activeUserRecord.name} (${selectedMonth})...`)}
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

                    {activeUserRecord.role === 'admin' && (
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

              {/* --- 5. SUPPORT --- */}
              {activeTab === 'support' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">EMZ Academy Support Desk</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Need technical help or academic guidance? Submit your query below.</p>
                  </div>

                  {supportSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl">
                      {supportSuccess}
                    </div>
                  )}

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!supportMsg.trim()) return;
                    setSupportSuccess('آپ کا پیغام کامیابی سے سپورٹ ٹیم کو بھیج دیا گیا ہے۔ جلد رابطہ کیا جائے گا۔');
                    setSupportMsg('');
                    setTimeout(() => setSupportSuccess(''), 5000);
                  }} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Issue:</label>
                      <textarea 
                        rows="4" 
                        value={supportMsg} 
                        onChange={(e) => setSupportMsg(e.target.value)} 
                        placeholder="Write your query here..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" 
                        required 
                      />
                    </div>
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm">
                      Submit Support Ticket
                    </button>
                  </form>
                </div>
              )}

              {/* --- 6. STUDENT MANAGEMENT (ADMIN ONLY) --- */}
              {activeTab === 'admin_students' && activeUserRecord.role === 'admin' && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">New Student Onboard & Credential Generator</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Register new students (Grades 9th to 12th), give them username/password, and select subject permissions.</p>

                    {successMsg && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl">
                        {successMsg}
                      </div>
                    )}

                    <form onSubmit={handleCreateStudent} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Student Full Name</label>
                          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Sara Khan" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" required />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Username ID</label>
                          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="e.g. student9_sara" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" required />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Password</label>
                          <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Initial password" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500" required />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Grade Level</label>
                          <select value={newGrade} onChange={(e) => { setNewGrade(e.target.value); setNewSelectedSubjects([]); }} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500">
                            <option value="9th">Grade 9th</option>
                            <option value="10th">Grade 10th</option>
                            <option value="11th">Grade 11th</option>
                            <option value="12th">Grade 12th</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-cyan-600 mb-2">Select Subjects to Grant Access:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                          {gradeFilteredCourses.map(c => {
                            const isChecked = newSelectedSubjects.includes(c.id);
                            return (
                              <label key={c.id} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer p-1.5 hover:bg-slate-50 rounded">
                                <input type="checkbox" checked={isChecked} onChange={() => {
                                  if (isChecked) {
                                    setNewSelectedSubjects(newSelectedSubjects.filter(id => id !== c.id));
                                  } else {
                                    setNewSelectedSubjects([...newSelectedSubjects, c.id]);
                                  }
                                }} className="rounded border-slate-300 text-cyan-500 focus:ring-0" />
                                <span className="truncate">{c.title}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-sm transition-all">
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
                            <button onClick={() => { setSelectedAdminStudentView(stu.username); setActiveTab('dashboard'); }} className="text-xs font-bold text-cyan-600 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg border border-cyan-200 flex items-center space-x-1">
                              <BarChart3 className="w-3.5 h-3.5" />
                              <span>View Graphs & Progress</span>
                            </button>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">Modify Subject Access:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                              {studentGradeCourses.map(course => {
                                const hasAccess = (stu.assignedSubjects || []).includes(course.id);
                                return (
                                  <label key={course.id} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded transition-colors">
                                    <input type="checkbox" checked={hasAccess} onChange={() => toggleStudentSubject(stu.username, course.id)} className="rounded border-slate-300 text-cyan-500 focus:ring-0" />
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
