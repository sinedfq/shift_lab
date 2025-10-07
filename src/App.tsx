import { useState, type ChangeEvent, useEffect } from 'react'
import { formatCode, formatPhoneNumber } from './scripts/formatPhoneNumber';
import axios from 'axios';
import './App.css'

function App() {
  const [phone, setPhone] = useState<string>('');
  const [otpCode, setotpCode] = useState<string>('');
  const [currentSection, setCurrentSection] = useState<'login' | 'verification'>('login');
  const [showButton, setShowButton] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const urlApi = "https://shift-intensive.ru/api/"

  useEffect(() => {
    if (currentSection === "verification") {
      setShowButton(false);
      setSecondsLeft(60);

      const timerId = setTimeout(() => {
        setShowButton(true);
      }, 60000);

      const intervalId = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timerId);
        clearInterval(intervalId);
      };
    } else {
      setShowButton(false);
      setSecondsLeft(60);
    }
  }, [currentSection]);


  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const formattedPhone = formatPhoneNumber(event.target.value);
    setPhone(formattedPhone);
  };

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const formattedCode = formatCode(event.target.value);
    setotpCode(formattedCode);
  };


  const handleContinue = (): void => {
    if (phone.replace(/\D/g, '').length >= 11) {
      setCurrentSection('verification');
      // axios.post(`${urlApi}auth/otp`, {
      //   phone: phone.replace(/\D/g, '')
      // })
    } else {
      alert("Неправильно введен номер телефона");
    }
  };

  const handleSubmit = (): void => {
    try {
      // axios.post(`${urlApi}users/signin`, {
      //   phone: phone.replace(/\D/g, ''),
      //   code: 
      // })

    } catch {

    }
  };

  return (
    <>
      <div className='container'>
        {currentSection === "login" && (
          <div>
            <h2>Вход</h2>
            <p className='p_instruction'>
              Введите номер телефона для входа <span>в личный кабинет</span>
            </p>
            <input
              className='in_phone'
              placeholder='Телефон'
              type='tel' value={phone}
              onChange={handlePhoneChange}
            />
            <button className='btn_next' onClick={handleContinue}><span>Продолжить</span></button>
          </div>
        )}
        {currentSection === 'verification' && (
          <div className="verification-section">
            <h2>Вход</h2>
            <p className='p_instruction'>
              Введите проверочный код для входа <span> в личный кабинет</span>
            </p>

            <input
              className='in_phone'
              value={phone}
              readOnly
            />

            <input
              className='in_phone'
              placeholder='Проверочный код'
              type='tel'
              maxLength={6}
              onChange={handleCodeChange}
            />
            <div className="buttons-container">
              <button className='btn_next' onClick={handleSubmit}>
                <span>Подтвердить</span>
              </button>
            </div>
            {!showButton && <p className='p_timer'>Запросить код повторно можно через {secondsLeft} секунд</p>}
            <div className='tm_container'>

              {showButton && <button className='btn_resend'>Запросить код ещё раз</button>}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
