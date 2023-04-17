import React, { useState, useEffect, useCallback } from 'react';
import { Container  } from 'react-bootstrap';
import Dashboard from './Dashboard';
import FormInput from './FormInput';

function Login() {
    const [attempts, setAttempts] = useState(3);
    const [isLogin, setLogin] = useState(false);
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
      const timer = countdown > 0 && attempts === 0 && setInterval(() => setCountdown(countdown - 1), 1000);

      if (countdown === 0 && attempts === 0) {
        setCountdown(30);
        setAttempts(3);
      }

      return () => clearInterval(timer);
    }, [attempts, countdown]); 
    
    const setAttempt = useCallback(val => setAttempts(val), []);
  
    return (
      <Container className='p-5'>
        {isLogin ?
          <Dashboard show={isLogin} />
          :
          <FormInput attempts={attempts} setAttempts={setAttempt} setLogin={setLogin} />
        }

        <p>
          {attempts ? null : `Kamu dapat mencoba login kembali dalam: ${countdown} detik`}
        </p>
      </Container>
    );
}
  
export default Login;
