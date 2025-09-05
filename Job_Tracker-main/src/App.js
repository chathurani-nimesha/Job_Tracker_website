import React, { useState, useEffect } from "react";
import './styles/index.css';
import './App.css';

// Import Pages
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import Dashboard from './components/pages/Dashboard';
import JobSearchPage from './components/pages/JobSearchPage';
import ResumeAnalyzerPage from './components/pages/ResumeAnalyzerPage';
import MockInterviewPage from './components/pages/MockInterviewPage';
import CoverLetterPage from './components/pages/CoverLetterPage';
import Footer from './components/common/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

   useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      switch (currentPage) {
        case 'login':
          return <LoginPage onLogin={handleLogin} onSignup={() => setCurrentPage('signup')} />;
        case 'signup':
          return <SignUpPage onSignUp={handleSignUp} onLogin={() => setCurrentPage('login')} />;
        default:
          return <LandingPage onLogin={() => setCurrentPage('login')} onSignup={() => setCurrentPage('signup')} />;
      }
    }

    switch (currentPage) {
      case 'jobsearch':
        return <JobSearchPage onDashboard={() => setCurrentPage('dashboard')} onLogout={handleLogout} />;
      case 'resume':
        return <ResumeAnalyzerPage onDashboard={() => setCurrentPage('dashboard')} onLogout={handleLogout} />;
      case 'interview':
        return <MockInterviewPage onDashboard={() => setCurrentPage('dashboard')} onLogout={handleLogout} />;
      case 'coverletter':
        return <CoverLetterPage onDashboard={() => setCurrentPage('dashboard')} onLogout={handleLogout} />;
      default:
        return <Dashboard onNavigate={handleNavigation} onDashboard={() => setCurrentPage('dashboard')} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="App">
       <div>
  <h1>Message from Backend:</h1>
  <p>{message}</p>  
</div>

      <div className="app-content">
      {renderPage()}
      </div>
     {(isLoggedIn && ['dashboard', 'jobsearch', 'resume', 'interview', 'coverletter'].includes(currentPage)) &&
      <Footer/>}
    </div>
    
    
  );
}

export default App;