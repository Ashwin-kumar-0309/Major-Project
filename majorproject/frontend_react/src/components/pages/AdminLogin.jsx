import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import bgImg from "../../img/bg.png";
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth';

export default function AdminLogin() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleBack = () => {
        navigate('/login');
    }

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${LOGIN_URL}/${user}/${pwd}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                });

            if (res?.data.length === 0) {
                setErrMsg('Login Failed. Please try again later.');
            } else {
                const role = res?.data[0].role;
                if (role !== 'admin') {
                    setErrMsg('Access denied. Admin credentials required.');
                    return;
                }
                setAuth({ user, pwd, role });
                setUser('');
                setPwd('');
                navigate('/admin', { replace: true });
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Server is down. Please try again later.');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized access.');
            } else {
                setErrMsg('Login Failed. Please try again later.');
            }
            errRef.current.focus();
        }
    };

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            zIndex: -2,
        }}>

            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 8,
                        backgroundColor: '#e3eefc',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        align: "center",
                    }}
                >
                    <Typography component="h1" variant="h4"
                        sx={{
                            textAlign: "center", 
                            marginBottom: "3%", 
                            marginTop: "3%",
                            fontFamily: 'Gambetta', 
                            fontWeight: "bold", 
                            fontSize: "2.5rem"
                        }}
                    >
                        Admin Login
                    </Typography>
                    
                    {errMsg && <Typography component="h1" variant="body2" color="error" ref={errRef} sx={{marginTop: "2rem"}}>  {errMsg} </Typography>}
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#0F1B4C' }}
                        >
                            Login
                        </Button>
                        
                        <Button
                            variant="text"
                            onClick={handleBack}
                            sx={{
                                color: '#0F1B4C',
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            BACK
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
