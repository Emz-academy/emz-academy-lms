import React, { useState } from 'react';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, 
  Users, Shield, LogOut, Award, Play, Download, Plus, Key 
} from 'lucide-react';

// Mock Users Database
const initialUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Academy Admin' },
  { username: 'student9', password: 'pass123', role: 'student', grade: '9th', name: 'Class 9 Student' },
  { username: 'student10', password: 'pass123', role: 'student', grade: '10th', name: 'Class 10 Student' },
  { username: 'student11', password: 'pass123', role: 'student', grade: '11th', name: 'Class 11 Student' },
  { username: 'student12', password: 'pass123', role: 'student', grade: '12th', name: 'Class 12 Student' },
];

// Complete Syllabus Database mapped from your curriculum table
const initialCourses = [
  // --- CLASS 9 ---
  { id: '9-eng', title: 'English', grade: '9th', subject: 'Languages', videos: [{ id: 'v1', title: 'Class 9 English Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n1', title: 'Class 9 English Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-urdu', title: 'Urdu', grade: '9th', subject: 'Languages', videos: [{ id: 'v2', title: 'Class 9 Urdu Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n2', title: 'Class 9 Urdu Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-islamiat', title: 'Islamiat', grade: '9th', subject: 'Islamic Studies', videos: [{ id: 'v3', title: 'Class 9 Islamiat Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n3', title: 'Class 9 Islamiat Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-math', title: 'Mathematics', grade: '9th', subject: 'Mathematics', videos: [{ id: 'v4', title: 'Class 9 Mathematics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n4', title: 'Class 9 Mathematics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-phy', title: 'Physics', grade: '9th', subject: 'Science', videos: [{ id: 'v5', title: 'Class 9 Physics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n5', title: 'Class 9 Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-chem', title: 'Chemistry', grade: '9th', subject: 'Science', videos: [{ id: 'v6', title: 'Class 9 Chemistry Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n6', title: 'Class 9 Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-bio', title: 'Biology', grade: '9th', subject: 'Science', videos: [{ id: 'v7', title: 'Class 9 Biology Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n7', title: 'Class 9 Biology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '9-cs', title: 'Computer Science', grade: '9th', subject: 'Computer', videos: [{ id: 'v8', title: 'Class 9 Computer Science Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n8', title: 'Class 9 Computer Science Notes', downloadUrl: 'https://drive.google.com' }] },

  // --- CLASS 10 ---
  { id: '10-eng', title: 'English', grade: '10th', subject: 'Languages', videos: [{ id: 'v9', title: 'Class 10 English Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n9', title: 'Class 10 English Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-urdu', title: 'Urdu', grade: '10th', subject: 'Languages', videos: [{ id: 'v10', title: 'Class 10 Urdu Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n10', title: 'Class 10 Urdu Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-pst', title: 'Pakistan Studies', grade: '10th', subject: 'Social Studies', videos: [{ id: 'v11', title: 'Class 10 Pakistan Studies Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n11', title: 'Class 10 Pakistan Studies Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-math', title: 'Mathematics', grade: '10th', subject: 'Mathematics', videos: [{ id: 'v12', title: 'Class 10 Mathematics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n12', title: 'Class 10 Mathematics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-phy', title: 'Physics', grade: '10th', subject: 'Science', videos: [{ id: 'v13', title: 'Class 10 Physics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n13', title: 'Class 10 Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-chem', title: 'Chemistry', grade: '10th', subject: 'Science', videos: [{ id: 'v14', title: 'Class 10 Chemistry Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n14', title: 'Class 10 Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-bio', title: 'Biology', grade: '10th', subject: 'Science', videos: [{ id: 'v15', title: 'Class 10 Biology Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n15', title: 'Class 10 Biology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '10-cs', title: 'Computer Science', grade: '10th', subject: 'Computer', videos: [{ id: 'v16', title: 'Class 10 Computer Science Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n16', title: 'Class 10 Computer Science Notes', downloadUrl: 'https://drive.google.com' }] },

  // --- CLASS 11 ---
  { id: '11-eng', title: 'English', grade: '11th', subject: 'Languages', videos: [{ id: 'v17', title: 'Class 11 English Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n17', title: 'Class 11 English Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-urdu', title: 'Urdu', grade: '11th', subject: 'Languages', videos: [{ id: 'v18', title: 'Class 11 Urdu Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n18', title: 'Class 11 Urdu Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-islamiat', title: 'Islamiat', grade: '11th', subject: 'Islamic Studies', videos: [{ id: 'v19', title: 'Class 11 Islamiat Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n19', title: 'Class 11 Islamiat Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-phy', title: 'Physics', grade: '11th', subject: 'Science', videos: [{ id: 'v20', title: 'Class 11 Physics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n20', title: 'Class 11 Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-chem', title: 'Chemistry', grade: '11th', subject: 'Science', videos: [{ id: 'v21', title: 'Class 11 Chemistry Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n21', title: 'Class 11 Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-bot', title: 'Biology (Botany)', grade: '11th', subject: 'Science', videos: [{ id: 'v22', title: 'Class 11 Botany Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n22', title: 'Class 11 Botany Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-zoo', title: 'Biology (Zoology)', grade: '11th', subject: 'Science', videos: [{ id: 'v23', title: 'Class 11 Zoology Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n23', title: 'Class 11 Zoology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-math', title: 'Mathematics', grade: '11th', subject: 'Mathematics', videos: [{ id: 'v24', title: 'Class 11 Mathematics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n24', title: 'Class 11 Mathematics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-cs', title: 'Computer Science', grade: '11th', subject: 'Computer', videos: [{ id: 'v25', title: 'Class 11 Computer Science Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n25', title: 'Class 11 Computer Science Notes', downloadUrl: 'https://drive.google.com' }] },
  { 
    id: '11-acc', 
    title: 'Principles of Accounting', 
    grade: '11th', 
    subject: 'Commerce', 
    videos: [{ id: 'acc-v1', title: 'Lecture 1: Introduction to Accounting & Basic Concepts', duration: '45 mins', embedUrl: 'https://drive.google.com/file/d/1U8DerULpNzXM-OHNke4gBVmeYbzVv7Fi/preview' }], 
    notes: [{ id: 'acc-n1', title: 'Class 11 Accounting Study Material & Handouts (PDF)', downloadUrl: 'https://drive.google.com/file/d/1U8DerULpNzXM-OHNke4gBVmeYbzVv7Fi/view?usp=sharing' }] 
  },
  { id: '11-com', title: 'Principles of Commerce', grade: '11th', subject: 'Commerce', videos: [{ id: 'v26', title: 'Class 11 Commerce Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n26', title: 'Class 11 Commerce Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-econ', title: 'Economics', grade: '11th', subject: 'Commerce/Arts', videos: [{ id: 'v27', title: 'Class 11 Economics Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n27', title: 'Class 11 Economics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '11-bmath', title: 'Business Mathematics', grade: '11th', subject: 'Commerce', videos: [{ id: 'v28', title: 'Class 11 Business Math Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n28', title: 'Class 11 Business Math Notes', downloadUrl: 'https://drive.google.com' }] },

  // --- CLASS 12 ---
  { id: '12-eng', title: 'English', grade: '12th', subject: 'Languages', videos: [{ id: 'v29', title: 'Class 12 English Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n29', title: 'Class 12 English Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-urdu', title: 'Urdu', grade: '12th', subject: 'Languages', videos: [{ id: 'v30', title: 'Class 12 Urdu Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n30', title: 'Class 12 Urdu Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-pst', title: 'Pakistan Studies', grade: '12th', subject: 'Social Studies', videos: [{ id: 'v31', title: 'Class 12 Pakistan Studies Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n31', title: 'Class 12 Pakistan Studies Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-phy', title: 'Physics', grade: '12th', subject: 'Science', videos: [{ id: 'v32', title: 'Class 12 Physics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n32', title: 'Class 12 Physics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-chem', title: 'Chemistry', grade: '12th', subject: 'Science', videos: [{ id: 'v33', title: 'Class 12 Chemistry Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n33', title: 'Class 12 Chemistry Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-bot', title: 'Biology (Botany)', grade: '12th', subject: 'Science', videos: [{ id: 'v34', title: 'Class 12 Botany Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n34', title: 'Class 12 Botany Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-zoo', title: 'Biology (Zoology)', grade: '12th', subject: 'Science', videos: [{ id: 'v35', title: 'Class 12 Zoology Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n35', title: 'Class 12 Zoology Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-math', title: 'Mathematics', grade: '12th', subject: 'Mathematics', videos: [{ id: 'v36', title: 'Class 12 Mathematics Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n36', title: 'Class 12 Mathematics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-cs', title: 'Computer Science', grade: '12th', subject: 'Computer', videos: [{ id: 'v37', title: 'Class 12 Computer Science Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n37', title: 'Class 12 Computer Science Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-acc', title: 'Principles of Accounting', grade: '12th', subject: 'Commerce', videos: [{ id: 'v38', title: 'Class 12 Accounting Lecture 1', duration: '45 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n38', title: 'Class 12 Accounting Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-com', title: 'Principles of Commerce', grade: '12th', subject: 'Commerce', videos: [{ id: 'v39', title: 'Class 12 Commerce Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n39', title: 'Class 12 Commerce Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-econ', title: 'Economics', grade: '12th', subject: 'Commerce/Arts', videos: [{ id: 'v40', title: 'Class 12 Economics Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n40', title: 'Class 12 Economics Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-bstat', title: 'Business Statistics', grade: '12th', subject: 'Commerce', videos: [{ id: 'v41', title: 'Class 12 Business Stats Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n41', title: 'Class 12 Business Stats Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-bank', title: 'Banking', grade: '12th', subject: 'Commerce', videos: [{ id: 'v42', title: 'Class 12 Banking Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n42', title: 'Class 12 Banking Notes', downloadUrl: 'https://drive.google.com' }] },
  { id: '12-geom', title: 'Commercial Geography', grade: '12th', subject: 'Commerce', videos: [{ id: 'v43', title: 'Class 12 Commercial Geography Lecture 1', duration: '40 mins', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }], notes: [{ id: 'n43', title: 'Class 12 Commercial Geography Notes', downloadUrl: 'https://drive.google.com' }] },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = initialUsers.find(
      u => u.username === usernameInput.trim() && u.password === passwordInput.trim()
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('Invalid credentials. Try admin / admin123 or student11 / pass123');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCourse(null);
    setActiveVideo(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">EMZ Virtual Academy</h1>
            <p className="text-slate-400 text-sm mt-1">9th to 12th Grade Professional Coaching</p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm p-3 rounded-xl mb-6 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Username</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. admin or student11"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required 
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 mt-2"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="mt-8 border-t border-slate-700/60 pt-4 text-xs text-slate-400 text-center space-y-1">
            <p>Admin Login: <code className="text-blue-400 font-mono">admin</code> / <code className="text-blue-400 font-mono">admin123</code></p>
            <p>Student Login: <code className="text-blue-400 font-mono">student11</code> / <code className="text-blue-400 font-mono">pass123</code></p>
          </div>
        </div>
      </div>
    );
  }

  const displayedCourses = currentUser.role === 'admin' 
    ? courses 
    : courses.filter(c => c.grade === currentUser.grade);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight">EMZ Virtual Academy</h1>
            <p className="text-xs text-slate-400">Welcome, {currentUser.name} ({currentUser.role.toUpperCase()})</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 px-4 py-2 rounded-xl border border-slate-700 transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {selectedCourse ? (
          <div>
            <button 
              onClick={() => { setSelectedCourse(null); setActiveVideo(null); }}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-6 flex items-center space-x-1"
            >
              ← Back to All Subjects
            </button>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                Grade {selectedCourse.grade} • {selectedCourse.subject}
              </span>
              <h2 className="text-3xl font-bold text-white mt-3">{selectedCourse.title}</h2>
            </div>

            {activeVideo && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8 shadow-xl">
                <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-semibold text-white flex items-center space-x-2">
                    <Play className="w-4 h-4 text-blue-400" />
                    <span>Now Playing: {activeVideo.title}</span>
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeVideo.duration}</span>
                  </span>
                </div>
                <div className="aspect-video w-full bg-black">
                  <iframe 
                    src={activeVideo.embedUrl} 
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-400" />
                  <span>Video Lectures</span>
                </h3>
                <div className="space-y-3">
                  {selectedCourse.videos.map((vid) => (
                    <div 
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        activeVideo?.id === vid.id 
                          ? 'bg-blue-600/10 border-blue-500 text-white' 
                          : 'bg-slate-850 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
                          <Play className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{vid.title}</p>
                          <span className="text-xs text-slate-400">{vid.duration}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium">Watch</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Study Material & Handouts</span>
                </h3>
                <div className="space-y-3">
                  {selectedCourse.notes.map((note) => (
                    <div 
                      key={note.id}
                      className="p-4 bg-slate-850 border border-slate-800 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-slate-200">{note.title}</p>
                          <span className="text-xs text-slate-400">Google Drive Document</span>
                        </div>
                      </div>
                      <a 
                        href={note.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Open PDF</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {currentUser.role === 'admin' ? 'All Academy Subjects (Admin View)' : `Grade ${currentUser.grade} Curriculum`}
                </h2>
                <p className="text-slate-400 text-sm mt-1">Select any subject below to view lectures and download handouts.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => { setSelectedCourse(course); setActiveVideo(course.videos[0]); }}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-blue-500/5 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                        Grade {course.grade}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{course.subject}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Video className="w-3.5 h-3.5 text-blue-400" />
                      <span>{course.videos.length} Lecture</span>
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
      </main>
    </div>
  );
}
