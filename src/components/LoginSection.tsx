import React from 'react';
import { useAuthStore } from '../store/authStore';
import { formatPhoneNumber } from '../scripts/formatPhoneNumber';
import { urlApi } from '../store/api_url';
import axios from 'axios';

const LoginSection: React.FC = () => {
  const {
    phone, hasError, setPhone, setHasError, setCurrentSection,
  } = useAuthStore();


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleContinue = async () => {
    if (phone.replace(/\D/g, '').length >= 11) {
      try {
        const response = await axios.post(`${urlApi}auth/otp/`, {
          phone: phone.replace(/\D/g, '')
        });
        setHasError(false);
        setCurrentSection('verification');
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } else {
      setHasError(true);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <p className='p_instruction'>
        Введите номер телефона для входа <span>в личный кабинет</span>
      </p>
      <input
        className={`in_phone ${hasError ? 'input-error' : ''}`}
        placeholder='Телефон'
        type='tel'
        value={phone}
        onChange={handlePhoneChange}
      />
      {hasError && <div className="error-message">Поле является обязательным</div>}
      <button className='btn_next' onClick={handleContinue}>
        <span>Продолжить</span>
      </button>
    </div>
  );
};

export default LoginSection;
