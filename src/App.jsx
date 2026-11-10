import React, { useState } from 'react';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, 
  Users, Shield, LogOut, Award, Play, Download, Plus, Key, 
  LayoutDashboard, Calendar, DollarSign, HelpCircle, Bell, Search, Settings, Building2, UserPlus, BarChart3, CheckSquare, Check
} from 'lucide-react';

// Mock Users Database with individual subject access lists
const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'EMZ Academy Administrator', active: true },
  { username: 'student9', password: 'pass123', role: 'student', grade: '9th', name: 'Ali Khan (Grade 9)', active: true, assignedSubjects: ['9-math', '9-phy', '9-eng'] },
  { username: 'student10', password: 'pass123', role: 'student', grade: '10th', name: 'Ayesha Malik (Grade 10)', active: true, assignedSubjects: ['10-math', '10-chem', '10-bio'] },
  { username: 'student11', password: 'pass123', role: 'student', grade: '11th', name: 'Bilal Ahmed (Grade 11)', active: true, assignedSubjects: ['11-acc', '11-math', '11-econ'] },
  { username: 'student12', password: 'pass123', role: 'student', grade: '12th', name: 'Fatima Noor (Grade 12)', active: true, assignedSubjects: ['12-acc', '12-econ', '12-bank'] },
];

// Complete Curriculum Database (Grades 9 to 12) including Class 11 Accounting Google Drive integration
const initialCourses = [
  // --- GRADE 9 ---
  { id: '9-eng', title: 'English', grade: '9th', subject: 'Languages', videos: [{ id: 'v1', title: 'Class 9 English - Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n1', title: 'Class 9 English Handouts (PDF)', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-urdu', title: 'Urdu', grade: '9th', subject: 'Languages', videos: [{ id: 'v2', title: 'Class 9 Urdu - Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n2', title: 'Class 9 Urdu Handouts (PDF)', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-islamiat', title: 'Islamiat', grade: '9th', subject: 'Islamic Studies', videos: [{ id: 'v3', title: 'Class 9 Islamiat - Lecture 1', duration: '35 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n3', title: 'Class 9 Islamiat Notes (PDF)', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-math', title: 'Mathematics', grade: '9th', subject: 'Mathematics', videos: [{ id: 'v4', title: 'Chapter 1: Matrices & Determinants', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n4', title: 'Math Chapter 1 Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-phy', title: 'Physics', grade: '9th', subject: 'Science', videos: [{ id: 'v5', title: 'Physics - Physical Quantities', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n5', title: 'Physics Chapter 1 Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-chem', title: 'Chemistry', grade: '9th', subject: 'Science', videos: [{ id: 'v6', title: 'Chemistry - Fundamentals', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n6', title: 'Chemistry Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-bio', title: 'Biology', grade: '9th', subject: 'Science', videos: [{ id: 'v7', title: 'Biology - Introduction to Life', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n7', title: 'Biology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-cs', title: 'Computer Science', grade: '9th', subject: 'Computer', videos: [{ id: 'v8', title: 'Computer - Fundamentals', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n8', title: 'Computer Notes', downloadUrl: 'https://drive.google.com' }] },

  // --- GRADE 10 ---
  { id: '10-eng', title: 'English', grade: '10th', subject: 'Languages', videos: [{ id: 'v9', title: 'Class 10 English - Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n9', title: 'English Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-urdu', title: 'Urdu', grade: '10th', subject: 'Languages', videos: [{ id: 'v10', title: 'Class 10 Urdu - Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n10', title: 'Urdu Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-pst', title: 'Pakistan Studies', grade: '10th', subject: 'Social Studies', videos: [{ id: 'v11', title: 'Pak Studies - Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n11', title: 'Pak Studies Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-math', title: 'Mathematics', grade: '10th', subject: 'Mathematics', videos: [{ id: 'v12', title: 'Maths - Quadratic Equations', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n12', title: 'Math Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-phy', title: 'Physics', grade: '10th', subject: 'Science', videos: [{ id: 'v13', title: 'Physics - Simple Harmonic Motion', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n13', title: 'Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-chem', title: 'Chemistry', grade: '10th', subject: 'Science', videos: [{ id: 'v14', title: 'Chemistry - Chemical Equilibrium', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n14', title: 'Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-bio', title: 'Biology', grade: '10th', subject: 'Science', videos: [{ id: 'v15', title: 'Biology - Gaseous Exchange', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n15', title: 'Biology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-cs', title: 'Computer Science', grade: '10th', subject: 'Computer', videos: [{ id: 'v16', title: 'Computer - Programming in C', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n16', title: 'Computer Notes', downloadUrl: 'https://drive.google.com' }] },

  // --- GRADE 11 ---
  { id: '11-eng', title: 'English', grade: '11th', subject: 'Languages', videos: [{ id: 'v17', title: 'First Year English - Prose', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n17', title: 'English Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-urdu', title: 'Urdu', grade: '11th', subject: 'Languages', videos: [{ id: 'v18', title: 'First Year Urdu - Nazm & Ghazal', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n18', title: 'Urdu Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-islamiat', title: 'Islamiat', grade: '11th', subject: 'Islamic Studies', videos: [{ id: 'v19', title: 'First Year Islamiat - Lectures', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n19', title: 'Islamiat Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-phy', title: 'Physics', grade: '11th', subject: 'Science', videos: [{ id: 'v20', title: 'First Year Physics - Vectors & Equilibrium', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n20', title: 'Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-chem', title: 'Chemistry', grade: '11th', subject: 'Science', videos: [{ id: 'v21', title: 'First Year Chemistry - Stoichiometry', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n21', title: 'Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-bot', title: 'Biology (Botany)', grade: '11th', subject: 'Science', videos: [{ id: 'v22', title: 'Botany - Cell Structure', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n22', title: 'Botany Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-zoo', title: 'Biology (Zoology)', grade: '11th', subject: 'Science', videos: [{ id: 'v23', title: 'Zoology - Diversity Among Animals', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n23', title: 'Zoology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-math', title: 'Mathematics', grade: '11th', subject: 'Mathematics', videos: [{ id: 'v24', title: 'First Year Math - Number Systems', duration: '55 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n24', title: 'Math Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-cs', title: 'Computer Science', grade: '11th', subject: 'Computer', videos: [{ id: 'v25', title: 'First Year Computer - Information Technology', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n25', title: 'Computer Notes', downloadUrl: 'https://drive.google.com' }] },
  { 
    id: '11-acc', 
    title: 'Principles of Accounting', 
    grade: '11th', 
    subject: 'Commerce', 
    videos: [{ id: 'acc-v1', title: 'Lecture 1: Introduction to Accounting & Basic Concepts', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], 
    notes: [{ id: 'acc-n1', title: 'Class 11 Accounting Study Material & Handouts (PDF)', downloadUrl: 'https://drive.google.com/file/d/1U8DerULpNzXM-OHNke4gBVmeYbzVv7Fi/view?usp=sharing' }] 
  },
  { id: '11-com', title: 'Principles of Commerce', grade: '11th', subject: 'Commerce', videos: [{ id: 'v26', title: 'Commerce - Business Organizations', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n26', title: 'Commerce Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-econ', title: 'Economics', grade: '11th', subject: 'Commerce/Arts', videos: [{ id: 'v27', title: 'Economics - Consumer Behavior', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n27', title: 'Economics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-bmath', title: 'Business Mathematics', grade: '11th', subject: 'Commerce', videos: [{ id: 'v28', title: 'Business Math - Equations & Interest', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n28', title: 'Business Math Notes', downloadUrl: 'https://drive.google.com' }] },

  // --- GRADE 12 ---
  { id: '12-eng', title: 'English', grade: '12th', subject: 'Languages', videos: [{ id: 'v29', title: 'Second Year English - Modern Prose & Heroes', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n29', title: 'English Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-urdu', title: 'Urdu', grade: '12th', subject: 'Languages', videos: [{ id: 'v30', title: 'Second Year Urdu - Qaseeda, Marsiya', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n30', title: 'Urdu Handouts', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-pst', title: 'Pakistan Studies', grade: '12th', subject: 'Social Studies', videos: [{ id: 'v31', title: 'Pak Studies 2nd Year - Ideology of Pakistan', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n31', title: 'Pak Studies Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-phy', title: 'Physics', grade: '12th', subject: 'Science', videos: [{ id: 'v32', title: 'Second Year Physics - Electrostatics', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n32', title: 'Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-chem', title: 'Chemistry', grade: '12th', subject: 'Science', videos: [{ id: 'v33', title: 'Second Year Chemistry - Transition Elements', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n33', title: 'Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-bot', title: 'Biology (Botany)', grade: '12th', subject: 'Science', videos: [{ id: 'v34', title: 'Botany - Plant Physiology & Reproduction', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n34', title: 'Botany Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-zoo', title: 'Biology (Zoology)', grade: '12th', subject: 'Science', videos: [{ id: 'v35', title: 'Zoology - Homeostasis & Support', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n35', title: 'Zoology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-math', title: 'Mathematics', grade: '12th', subject: 'Mathematics', videos: [{ id: 'v36', title: 'Second Year Math - Calculus & Integration', duration: '55 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n36', title: 'Math Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-cs', title: 'Computer Science', grade: '12th', subject: 'Computer', videos: [{ id: 'v37', title: 'Second Year Computer - Database Systems', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n37', title: 'Computer Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-acc', title: 'Principles of Accounting', grade: '12th', subject: 'Commerce', videos: [{ id: 'v38', title: 'Accounting 2nd Year - Partnership & Companies', duration: '50 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n38', title: 'Accounting Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-com', title: 'Principles of Commerce', grade: '12th', subject: 'Commerce', videos: [{ id: 'v39', title: 'Commerce 2nd Year - International Trade', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n39', title: 'Commerce Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-econ', title: 'Economics', grade: '12th', subject: 'Commerce/Arts', videos: [{ id: 'v40', title: 'Economics 2nd Year - National Income', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n40', title: 'Economics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-bstat', title: 'Business Statistics', grade: '12th', subject: 'Commerce', videos: [{ id: 'v41', title: 'Business Statistics - Index Numbers', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n41', title: 'Business Stats Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-bank', title: 'Banking', grade: '12th', subject: 'Commerce', videos: [{ id: 'v42', title: 'Banking - Central Bank & Commercial Banks', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n42', title: 'Banking Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-geom', title: 'Commercial Geography', grade: '12th', subject: 'Commerce', videos: [{ id: 'v43', title: 'Commercial Geography - Agricultural Resources', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/-iYKNnhOKww' }], notes: [{ id: 'n43', title: 'Geography Notes', downloadUrl: 'https://drive.google.com' }] },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [courses, setCourses] = useState(initialCourses);
  const [usersList, setUsersList] = useState(initialUsers);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // New Student Generation form state
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentUser, setNewStudentUser] = useState('');
  const [newStudentPass, setNewStudentPass] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('9th');
  const [selectedNewSubjects, setSelectedNewSubjects] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Support Ticket state
  const [tickets, setTickets] = useState([
    { id: 1, student: 'Ali Khan', subject: 'Math Lecture Playback', status: 'Resolved', date: '2026-03-25' }
  ]);
  const [newTicketMsg, setNewTicketMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = usersList.find(
      u => u.username === usernameInput.trim() && u.password === passwordInput.trim()
    );

    if (foundUser) {
      if (foundUser.role === 'student' && foundUser.active === false) {
        setLoginError('Your student account access is currently disabled by admin.');
        return;
      }
      setCurrentUser(foundUser);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
      setActiveTab('dashboard');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCourse(null);
    setActiveVideo(null);
    setActiveTab('dashboard');
  };

  // Admin action: Create new student credentials with assigned subjects
  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudentName || !newStudentUser || !newStudentPass) return;
    
    const newStudent = {
      username: newStudentUser.trim(),
      password: newStudentPass.trim(),
      role: 'student',
      grade: newStudentGrade,
      name: newStudentName.trim(),
      active: true,
      assignedSubjects: selectedNewSubjects
    };

    setUsersList([...usersList, newStudent]);
    setNewStudentName('');
    setNewStudentUser('');
    setNewStudentPass('');
    setSelectedNewSubjects([]);
    setSuccessMsg(`Successfully generated credentials and subject access for ${newStudent.name}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Admin action: Toggle student access status
  const toggleStudentAccess = (username) => {
    setUsersList(usersList.map(u => {
      if (u.username === username) {
        return { ...u, active: !u.active };
      }
      return u;
    }));
  };

  // Admin action: Toggle specific subject assignment for a student
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

  // If not logged in, show Professional EMZ Academy Portal Login with Official Logo
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          <div className="text-center mb-8">
            {/* Official EMZ Academy Logo */}
            <div className="bg-white/5 border border-slate-800 rounded-2xl p-4 inline-block mb-4 shadow-inner">
              <div className="flex items-baseline justify-center font-black tracking-tighter text-3xl">
                <span className="text-blue-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" style={{ color: '#0d235c' }}>em</span>
                <span className="text-cyan-500" style={{ color: '#00b4d8' }}>z</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 ml-0.5 mb-2.5"></span>
              </div>
              <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase mt-[-4px]" style={{ color: '#00b4d8' }}>
                Academy
              </div>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">EMZ Academy</h1>
            <p className="text-slate-400 text-xs mt-1">LMS Portal</p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl mb-6 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Username ID</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                required 
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm mt-2"
            >
              Sign In to Portal
            </button>
          </form>
        </div>

        <p className="text-slate-600 text-xs mt-6 text-center">
          Powered by EMZ Academy • Secure Cloud Infrastructure
        </p>
      </div>
    );
  }

  // Filter courses: Admins see all; Students see only courses matching their grade AND explicitly assigned to them by admin
  const displayedCourses = currentUser.role === 'admin' 
    ? courses 
    : courses.filter(c => c.grade === currentUser.grade && (currentUser.assignedSubjects || []).includes(c.id));

  const studentUsers = usersList.filter(u => u.role === 'student');
  const gradeFilteredCourses = courses.filter(c => c.grade === newStudentGrade);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar with Official EMZ Logo Branding */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 border border-slate-800 px-3 py-1 rounded-xl flex items-center space-x-2">
            <div className="flex items-baseline font-black tracking-tighter text-lg">
              <span style={{ color: '#ffffff' }}>em</span>
              <span style={{ color: '#00b4d8' }}>z</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 mb-1.5"></span>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-l border-slate-800 pl-2">Academy</span>
          </div>
          <div className="hidden md:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-850 px-3 py-1 rounded-full border border-slate-800">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>LMS Portal</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">{currentUser.name}</p>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">{currentUser.role} Account</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-700 transition-all text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Secondary Module Navigation Bar */}
      <nav className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-2 flex items-center space-x-2 overflow-x-auto text-xs font-medium">
        <button 
          onClick={() => { setActiveTab('dashboard'); setSelectedCourse(null); }}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'dashboard' && !selectedCourse ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button 
          onClick={() => { setActiveTab('courses'); setSelectedCourse(null); }}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'courses' || selectedCourse ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Syllabus & Lectures</span>
        </button>

        {currentUser.role === 'admin' && (
          <button 
            onClick={() => { setActiveTab('students'); setSelectedCourse(null); }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'students' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Student Management & Access</span>
          </button>
        )}

        {currentUser.role === 'admin' && (
          <button 
            onClick={() => { setActiveTab('stats'); setSelectedCourse(null); }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Summary Sheets & Stats</span>
          </button>
        )}

        <button 
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'schedule' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>AI Time Table</span>
        </button>

        <button 
          onClick={() => setActiveTab('fees')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'fees' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Fee & Accounts</span>
        </button>

        <button 
          onClick={() => setActiveTab('support')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all ${activeTab === 'support' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support Tickets</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        
        {/* --- COURSE LECTURE PLAYER VIEW --- */}
        {selectedCourse ? (
          <div>
            <button 
              onClick={() => { setSelectedCourse(null); setActiveVideo(null); }}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold mb-6 flex items-center space-x-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 w-max"
            >
              <span>← Back to Curriculum List</span>
            </button>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                  Grade {selectedCourse.grade} • {selectedCourse.subject}
                </span>
                <span className="text-xs text-slate-400 font-mono">Module ID: {selectedCourse.id}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-3">{selectedCourse.title}</h2>
            </div>

            {activeVideo && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8 shadow-xl">
                <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                    <Play className="w-4 h-4 text-cyan-400" />
                    <span>Now Streaming: {activeVideo.title}</span>
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center space-x-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{activeVideo.duration}</span>
                  </span>
                </div>
                <div className="aspect-video w-full bg-black">
                  <iframe 
                    src={activeVideo.embedUrl} 
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2 uppercase tracking-wider">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>Video Lectures</span>
                </h3>
                <div className="space-y-3">
                  {selectedCourse.videos.map((vid) => (
                    <div 
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        activeVideo?.id === vid.id 
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md' 
                          : 'bg-slate-850 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">
                          <Play className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-xs">{vid.title}</p>
                          <span className="text-[10px] text-slate-400">{vid.duration}</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-cyan-600 text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">Watch</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Study Materials & Handouts</span>
                </h3>
                <div className="space-y-3">
                  {selectedCourse.notes.map((note) => (
                    <div 
                      key={note.id}
                      className="p-3.5 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-xs text-slate-200">{note.title}</p>
                          <span className="text-[10px] text-emerald-400 font-mono">Google Drive Secure Link</span>
                        </div>
                      </div>
                      <a 
                        href={note.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-3 py-2 rounded-lg transition-all shadow-md uppercase tracking-wider"
                      >
                        <Download className="w-3 h-3" />
                        <span>Open PDF</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="max-w-2xl relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                      EMZ Academy • LMS Portal
                    </span>
                    <h2 className="text-3xl font-black text-white mt-4">Welcome back, {currentUser.name}</h2>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Manage student credentials, grant specific subject access, and review academic statistics seamlessly from your EMZ coaching workspace.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between text-slate-400 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider">Assigned Subjects</span>
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-2xl font-black text-white">{displayedCourses.length}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Available for your account</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between text-slate-400 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider">Enrolled Students</span>
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-black text-white">{studentUsers.length}</p>
                    <p className="text-[10px] text-blue-400 mt-1">Active database records</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between text-slate-400 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider">Attendance Status</span>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-2xl font-black text-white">98.4%</p>
                    <p className="text-[10px] text-emerald-400 mt-1">Verified attendance rate</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between text-slate-400 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider">Support Tickets</span>
                      <HelpCircle className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-2xl font-black text-white">{tickets.length}</p>
                    <p className="text-[10px] text-slate-500 mt-1">In-portal queries</p>
                  </div>
                </div>
              </div>
            )}

            {/* --- COURSES / SYLLABUS TAB --- */}
            {(activeTab === 'courses' || activeTab === 'dashboard') && (
              <div className="mt-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {currentUser.role === 'admin' ? 'All Academy Curriculum (Grades 9–12)' : `Grade ${currentUser.grade} Assigned Subjects`}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">Select a subject card to launch video lectures and Google Drive study materials.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedCourses.map((course) => (
                    <div 
                      key={course.id}
                      onClick={() => { setSelectedCourse(course); setActiveVideo(course.videos[0]); }}
                      className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl hover:shadow-cyan-500/5 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20">
                            Grade {course.grade}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{course.subject}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {course.title}
                        </h4>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Video className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{course.videos.length} Video</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{course.notes.length} PDF Note</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- STUDENT MANAGEMENT & SUBJECT ACCESS TAB (ADMIN ONLY) --- */}
            {activeTab === 'students' && currentUser.role === 'admin' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Student Enrollment & Subject Access Control</h3>
                  <p className="text-slate-400 text-xs mb-6">Create new student accounts, assign grade levels, and check specific subject permissions.</p>

                  {successMsg && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl mb-6">
                      {successMsg}
                    </div>
                  )}

                  <form onSubmit={handleCreateStudent} className="bg-slate-850 p-5 rounded-xl border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          placeholder="e.g. Sara Khan"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Username ID</label>
                        <input 
                          type="text" 
                          value={newStudentUser}
                          onChange={(e) => setNewStudentUser(e.target.value)}
                          placeholder="e.g. student11_sara"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                        <input 
                          type="text" 
                          value={newStudentPass}
                          onChange={(e) => setNewStudentPass(e.target.value)}
                          placeholder="Initial password"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Grade Level</label>
                        <select 
                          value={newStudentGrade}
                          onChange={(e) => {
                            setNewStudentGrade(e.target.value);
                            setSelectedNewSubjects([]); // reset subject selection on grade change
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="9th">Grade 9th</option>
                          <option value="10th">Grade 10th</option>
                          <option value="11th">Grade 11th</option>
                          <option value="12th">Grade 12th</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject checkboxes for new student */}
                    <div>
                      <label className="block text-xs font-semibold text-cyan-400 mb-2">Select Initial Subject Access for Grade {newStudentGrade}:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                        {gradeFilteredCourses.map(c => {
                          const isChecked = selectedNewSubjects.includes(c.id);
                          return (
                            <label key={c.id} className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer p-1.5 hover:bg-slate-850 rounded">
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setSelectedNewSubjects(selectedNewSubjects.filter(id => id !== c.id));
                                  } else {
                                    setSelectedNewSubjects([...selectedNewSubjects, c.id]);
                                  }
                                }}
                                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                              />
                              <span className="truncate">{c.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all shadow-md"
                    >
                      Generate Student Account & Permissions
                    </button>
                  </form>
                </div>

                {/* Enrolled Students Table with Granular Subject Access Toggles */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Enrolled Students & Granular Subject Permissions</h4>
                  
                  {studentUsers.map((stu) => {
                    const studentGradeCourses = courses.filter(c => c.grade === stu.grade);
                    return (
                      <div key={stu.username} className="bg-slate-850 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-sm">{stu.name}</span>
                              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{stu.username}</span>
                              <span className="text-xs text-slate-400">Grade {stu.grade}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${stu.active !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                              {stu.active !== false ? 'Portal Access Active' : 'Portal Access Revoked'}
                            </span>
                            <button 
                              onClick={() => toggleStudentAccess(stu.username)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${stu.active !== false ? 'bg-rose-600/20 text-rose-400 hover:bg-rose-600/30' : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30'}`}
                            >
                              {stu.active !== false ? 'Revoke Portal' : 'Grant Portal'}
                            </button>
                          </div>
                        </div>

                        {/* Subject Checkboxes Grid for existing student */}
                        <div>
                          <p className="text-xs font-semibold text-slate-300 mb-2">Granted Subject Access (Check/Uncheck to update in real-time):</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                            {studentGradeCourses.map(course => {
                              const hasAccess = (stu.assignedSubjects || []).includes(course.id);
                              return (
                                <label key={course.id} className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer p-1.5 hover:bg-slate-800/60 rounded">
                                  <input 
                                    type="checkbox"
                                    checked={hasAccess}
                                    onChange={() => toggleStudentSubject(stu.username, course.id)}
                                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                                  />
                                  <span className="truncate">{course.title}</span>
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

            {/* --- SUMMARY SHEETS & STATS TAB (ADMIN ONLY) --- */}
            {activeTab === 'stats' && currentUser.role === 'admin' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Summary Sheets & Academy Analytics</h3>
                  <p className="text-slate-400 text-xs mb-6">Comprehensive statistical reports and enrollment breakdowns across all grade levels.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Grade-Wise Enrollment</p>
                      <ul className="mt-4 space-y-2 text-xs text-slate-300">
                        <li className="flex justify-between"><span>Grade 9th:</span> <strong className="text-white">12 Students</strong></li>
                        <li className="flex justify-between"><span>Grade 10th:</span> <strong className="text-white">15 Students</strong></li>
                        <li className="flex justify-between"><span>Grade 11th (Science/Commerce):</span> <strong className="text-white">22 Students</strong></li>
                        <li className="flex justify-between"><span>Grade 12th:</span> <strong className="text-white">18 Students</strong></li>
                      </ul>
                    </div>

                    <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fee Collection Summary</p>
                      <ul className="mt-4 space-y-2 text-xs text-slate-300">
                        <li className="flex justify-between"><span>Total Vouchers Generated:</span> <strong className="text-white">67</strong></li>
                        <li className="flex justify-between"><span>Paid & Verified:</span> <strong className="text-emerald-400">62</strong></li>
                        <li className="flex justify-between"><span>Pending / Defaulters:</span> <strong className="text-amber-400">5</strong></li>
                        <li className="flex justify-between"><span>Collection Rate:</span> <strong className="text-white">92.5%</strong></li>
                      </ul>
                    </div>

                    <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Academic Resources</p>
                      <ul className="mt-4 space-y-2 text-xs text-slate-300">
                        <li className="flex justify-between"><span>Total Subjects:</span> <strong className="text-white">43 Modules</strong></li>
                        <li className="flex justify-between"><span>Video Lectures Uploaded:</span> <strong className="text-white">43+</strong></li>
                        <li className="flex justify-between"><span>Google Drive Handouts:</span> <strong className="text-white">Active</strong></li>
                        <li className="flex justify-between"><span>System Status:</span> <strong className="text-emerald-400">Optimal</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- AI TIME TABLE TAB --- */}
            {activeTab === 'schedule' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">AI Time Table & Daily Schedule Manager</h3>
                  <p className="text-slate-400 text-xs mt-1">Automated conflict-free scheduling generated for EMZ coaching classes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-cyan-400 uppercase">Morning Shift (08:00 AM - 11:00 AM)</p>
                    <p className="text-sm font-bold text-white mt-2">Class 11 & 12 Science/Commerce Coaching</p>
                    <p className="text-xs text-slate-400 mt-1">Includes Principles of Accounting & Mathematics</p>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-cyan-400 uppercase">Evening Shift (03:00 PM - 06:00 PM)</p>
                    <p className="text-sm font-bold text-white mt-2">Class 9th & 10th Matriculation Coaching</p>
                    <p className="text-xs text-slate-400 mt-1">Core Science, Computer, and Language Groups</p>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-cyan-400 uppercase">Assessment Slot</p>
                    <p className="text-sm font-bold text-white mt-2">Weekly Quiz & Mock Examination</p>
                    <p className="text-xs text-slate-400 mt-1">Automated result publishing enabled</p>
                  </div>
                </div>
              </div>
            )}

            {/* --- FEE & ACCOUNTS TAB --- */}
            {activeTab === 'fees' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Fee Manager & Accounts Voucher System</h3>
                  <p className="text-slate-400 text-xs mt-1">Live fee collection summaries and financial ledger records.</p>
                </div>
                <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">Monthly Tuition Fee Voucher - 2026</p>
                    <p className="text-xs text-slate-400 mt-0.5">Status: <span className="text-emerald-400 font-bold">Paid / Verified</span></p>
                  </div>
                  <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md">
                    Download Voucher PDF
                  </button>
                </div>
              </div>
            )}

            {/* --- SUPPORT TICKETS TAB --- */}
            {activeTab === 'support' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">In-Portal Support Ticket Generation</h3>
                  <p className="text-slate-400 text-xs mt-1">Raise inquiries regarding lecture links, study materials, or account access.</p>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTicketMsg}
                    onChange={(e) => setNewTicketMsg(e.target.value)}
                    placeholder="Describe your issue or request..." 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button 
                    onClick={() => {
                      if(!newTicketMsg) return;
                      setTickets([...tickets, { id: tickets.length + 1, student: currentUser.name, subject: newTicketMsg, status: 'Open', date: 'Today' }]);
                      setNewTicketMsg('');
                    }}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
                  >
                    Submit Ticket
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {tickets.map(t => (
                    <div key={t.id} className="bg-slate-850 border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{t.subject}</p>
                        <p className="text-slate-400 text-[10px] mt-0.5">Raised by: {t.student} • {t.date}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
