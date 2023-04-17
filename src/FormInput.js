import React, { createRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const FormInput = ({ attempts, setAttempts, setLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');

    const recaptchaRef = createRef();

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
            setAttempts(1);
        }
  
        if (username && password && captchaValue) {
            setUsername('');
            setPassword('');
            setLogin(true);
    
            recaptchaRef.current.reset();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className='mb-3'>
                <Col>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
        
            <Form.Group controlId="captcha" className='mb-3'>
                <GoogleReCaptchaProvider
                    ref={recaptchaRef}
                    reCaptchaKey="6Ld_1JAlAAAAAKEWJ1BuWxW1lvj1jD0znwLTzpHt"
                    onChange={(value) => setCaptchaValue(value)}
                />
            </Form.Group>
        
            <Button variant="primary" type="submit" disabled={attempts === 0}>
                Login
            </Button>
        </Form>
    )
}

export default FormInput;
