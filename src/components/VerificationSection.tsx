import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { formatCode } from '../scripts/formatPhoneNumber';
import { urlApi } from '../store/api_url';
import axios from 'axios';

const VerificationSection: React.FC = () => {
    const {
        phone,
        otpCode,
        hasError,
        secondsLeft,
        showButton,
        setOtpCode,
        setHasError,
        setCurrentSection,
        setSecondsLeft,
        setShowButton,
    } = useAuthStore();

    const startTimer = () => {
        setShowButton(false);
        setSecondsLeft(60);

        const timerId = setTimeout(() => setShowButton(true), 60000);
        let currentSeconds = 60;

        const intervalId = setInterval(() => {
            currentSeconds = Math.max(currentSeconds - 1, 0);
            useAuthStore.setState({ secondsLeft: currentSeconds });

            if (currentSeconds === 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return { timerId, intervalId };
    };

    useEffect(() => {
        const { timerId, intervalId } = startTimer();

        return () => {
            clearTimeout(timerId);
            clearInterval(intervalId);
        };
    }, [setSecondsLeft, setShowButton]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtpCode(formatCode(e.target.value));
    };

    const handleSubmit = async () => {
        if (otpCode.length === 6) {
            try {
                // await axios.post(`${urlApi}users/signin`, {
                //     phone: phone.replace(/\D/g, ''),
                //     code: otpCode,
                // });
                setHasError(false);
                setCurrentSection('submit');
            } catch (error) {
                console.error("Ошибка:", error);
            }
        } else {
            setHasError(true);
        }
    };

    const handleResend = async () => {
        console.log(phone);
        try {
            // await axios.post(`${urlApi}auth/otp/`, { 
            //    phone: phone.replace(/\D/g, '') 
            // });
            startTimer();
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="verification-section">
            <h2>Вход</h2>
            <p className='p_instruction'>
                Введите проверочный код для входа <span>в личный кабинет</span>
            </p>

            <input className='in_phone' value={phone} readOnly />

            <input
                className={`in_phone ${hasError ? 'input-error' : ''}`}
                placeholder='Проверочный код'
                type='tel'
                maxLength={6}
                value={otpCode}
                onChange={handleCodeChange}
            />
            {hasError && <div className="error-message">Код должен содержать 6 цифр</div>}

            <div className="buttons-container">
                <button className='btn_next' onClick={handleSubmit}>
                    <span>Подтвердить</span>
                </button>
            </div>

            {!showButton && <p className='p_timer'>Запросить код повторно можно через {secondsLeft} секунд</p>}
            <div className='tm_container'>
                {showButton && <button className='btn_resend' onClick={handleResend}>Запросить код ещё раз</button>}
            </div>
        </div>
    );
};

export default VerificationSection;
