import React from 'react';
import { useAuthStore } from '../store/authStore';

const SubmitSection: React.FC = () => {
  const { phone } = useAuthStore();

  return (
    <div className="verification-section">
      <h2>Данные о пользователе</h2>
      <input className='in_phone' value={phone} readOnly />
    </div>
  );
};

export default SubmitSection;
