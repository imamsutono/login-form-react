import React, { useState, useEffect, createRef } from 'react';
import { Alert, Button, Container, Card, Form  } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [attempts, setAttempts] = useState(3);
    const [countdown, setCountdown] = useState(30);
    const [counter, setCounter] = useState(30);
    const [captchaValue, setCaptchaValue] = useState('');
    const [status, setStatus] = useState(false);

    const recaptchaRef = createRef();

    useEffect(() => {
      const timer = countdown > 0 && attempts === 0 && setInterval(() => setCountdown(countdown - 1), 1000);

      if (countdown === 0 && attempts === 0) {
        setCountdown(30);
        setAttempts(3);
      }

      return () => clearInterval(timer);
    }, [attempts, countdown]);

    useEffect(() => {
      const timer = status && counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [status, counter]);

    const handleSubmit = (event) => {
      event.preventDefault();

      if (!username) {
        alert('Username belum diisi.');
        return;
      }
      if (!password) {
        alert('Password belum diisi.');
        return;
      }
      if (!captchaValue) {
        alert('Centang captcha terlebih dahulu!');
        return;
      }

      if (!username || !password || !captchaValue) {
        setAttempts(attempts - 1);
      }

      if (username && password && captchaValue) {
        setUsername('');
        setPassword('');
        setStatus(true);

        recaptchaRef.current.reset();
      }
    };
  
    return (
      <Container className='p-5'>
        {status ? 
          (
            <Alert show={status} variant="success">
              <Alert.Heading>Login berhasil!</Alert.Heading>
              <p>Selamat datang.</p>
              <hr />

              {counter ?
                <p>Waktu tunggu: {counter} detik</p>
                :
                <Button variant='danger' onClick={() => window.location.reload()}>Stop</Button>
              }
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Card body>
                <Card.Title>Form Login</Card.Title>

                <Form.Group controlId="username" className='my-3'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password" className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
      
                <Form.Group controlId="captcha" className='mb-3'>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Ld_1JAlAAAAAKEWJ1BuWxW1lvj1jD0znwLTzpHt"
                    onChange={(value) => setCaptchaValue(value)}
                  />
                </Form.Group>

                <p>
                  {attempts ? null : `Sudah tiga kali salah, kamu dapat mencoba login kembali dalam: ${countdown} detik`}
                </p>
          
                <Button variant="primary" type="submit" disabled={attempts === 0}>
                  Login
                </Button>
              </Card>
            </Form>
          )
        }
      </Container>
    );
}
  
export default Login;
