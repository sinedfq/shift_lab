import './App.css';
import LoginSection from './components/LoginSection'
import VerificationSection from './components/VerificationSection'
import SubmitSection from './components/SubmitSection';
import { useAuthStore } from './store/authStore';

function App() {
  const { currentSection } = useAuthStore();

  return (
    <div className='container'>
      {currentSection === 'login' && <LoginSection />}
      {currentSection === 'verification' && <VerificationSection />}
      {currentSection === 'submit' && <SubmitSection />}
    </div>
  );
}

export default App;
