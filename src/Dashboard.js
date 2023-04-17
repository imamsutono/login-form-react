import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

const Dashboard = ({ show = false }) => {
    const [counter, setCounter] = useState(30);

    useEffect(() => {
        const timer = show && counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }, [show, counter]);

    return (
        <Alert show={show} variant="success">
            <Alert.Heading>Login berhasil!</Alert.Heading>
            <p>Selamat datang.</p>
            <hr />

            {counter ?
                <p>Waktu tunggu: {counter} detik</p>
                :
                <Button variant='danger' onClick={() => window.location.reload()}>Stop</Button>
            }
        </Alert>
    );
}

export default Dashboard;
