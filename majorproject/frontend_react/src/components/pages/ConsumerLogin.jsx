import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid, Tabs, Tab } from "@mui/material";
import bgImg from "../../img/bg.png";
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth';
const REGISTER_URL = '/addaccount';
const PROFILE_URL = '/addprofile';

export default function ConsumerLogin() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const errRef = useRef();
    const [tabValue, setTabValue] = useState(0);

    // Login state
    const [loginUser, setLoginUser] = useState('');
    const [loginPwd, setLoginPwd] = useState('');
    const [loginErrMsg, setLoginErrMsg] = useState('');

    // Register state
    const [regUser, setRegUser] = useState('');
    const [regPwd, setRegPwd] = useState('');
    const [regName, setRegName] = useState('');
    const [regDescription, setRegDescription] = useState('');
    const [regWebsite, setRegWebsite] = useState('');
    const [regLocation, setRegLocation] = useState('');
    const [regErrMsg, setRegErrMsg] = useState('');

    const handleBack = () => {
        navigate('/login');
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setLoginErrMsg('');
        setRegErrMsg('');
    };

    useEffect(() => {
        setLoginErrMsg('');
    }, [loginUser, loginPwd]);

    useEffect(() => {
        setRegErrMsg('');
    }, [regUser, regPwd, regName]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${LOGIN_URL}/${loginUser}/${loginPwd}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                });

            if (res?.data.length === 0) {
                setLoginErrMsg('Login Failed. Please try again later.');
            } else {
                const role = res?.data[0].role;
                if (role !== 'consumer') {
                    setLoginErrMsg('Access denied. Consumer credentials required.');
                    return;
                }
                setAuth({ user: loginUser, pwd: loginPwd, role });
                setLoginUser('');
                setLoginPwd('');
                navigate('/consumer', { replace: true });
            }
        } catch (err) {
            if (!err?.response) {
                setLoginErrMsg('Server is down. Please try again later.');
            } else if (err.response?.status === 400) {
                setLoginErrMsg('Invalid username or password.');
            } else if (err.response?.status === 401) {
                setLoginErrMsg('Unauthorized access.');
            } else {
                setLoginErrMsg('Login Failed. Please try again later.');
            }
            errRef.current.focus();
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            // Register account
            await axios.post(REGISTER_URL, {
                username: regUser,
                password: regPwd,
                role: 'consumer'
            });

            // Create profile
            await axios.post(PROFILE_URL, {
                username: regUser,
                name: regName,
                description: regDescription,
                website: regWebsite,
                location: regLocation,
                image: '',
                role: 'consumer'
            });

            setRegErrMsg('');
            alert('Account created successfully! Please login.');
            setTabValue(0);
            setRegUser('');
            setRegPwd('');
            setRegName('');
            setRegDescription('');
            setRegWebsite('');
            setRegLocation('');

        } catch (err) {
            if (!err?.response) {
                setRegErrMsg('Server is down. Please try again later.');
            } else {
                setRegErrMsg('Registration Failed. Please try again later.');
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

            <Container component="main" maxWidth="md">
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
                        Consumer Portal
                    </Typography>
                    
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                        <Tab label="Login with Existing Account" />
                        <Tab label="Create New Account" />
                    </Tabs>

                    {tabValue === 0 && (
                        <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                            {loginErrMsg && <Typography component="h1" variant="body2" color="error" ref={errRef} sx={{marginTop: "2rem"}}>  {loginErrMsg} </Typography>}
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="loginUsername"
                                label="Username"
                                name="loginUsername"
                                autoFocus
                                value={loginUser}
                                onChange={(e) => setLoginUser(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="loginPassword"
                                label="Password"
                                type="password"
                                id="loginPassword"
                                value={loginPwd}
                                onChange={(e) => setLoginPwd(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#0F1B4C' }}
                            >
                                Login
                            </Button>
                        </Box>
                    )}

                    {tabValue === 1 && (
                        <Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                            {regErrMsg && <Typography component="h1" variant="body2" color="error" ref={errRef} sx={{marginTop: "2rem"}}>  {regErrMsg} </Typography>}
                            
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="regUsername"
                                        label="Username"
                                        name="regUsername"
                                        value={regUser}
                                        onChange={(e) => setRegUser(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="regPassword"
                                        label="Password"
                                        type="password"
                                        id="regPassword"
                                        value={regPwd}
                                        onChange={(e) => setRegPwd(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="regName"
                                        label="Full Name"
                                        name="regName"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="regDescription"
                                        label="Bio/Description"
                                        name="regDescription"
                                        multiline
                                        rows={3}
                                        value={regDescription}
                                        onChange={(e) => setRegDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="regWebsite"
                                        label="Website (Optional)"
                                        name="regWebsite"
                                        value={regWebsite}
                                        onChange={(e) => setRegWebsite(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="regLocation"
                                        label="Location"
                                        name="regLocation"
                                        value={regLocation}
                                        onChange={(e) => setRegLocation(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#0F1B4C' }}
                            >
                                Create Account
                            </Button>
                        </Box>
                    )}
                    
                    <Button
                        variant="text"
                        onClick={handleBack}
                        sx={{
                            mt: 3,
                            color: '#0F1B4C',
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        BACK
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
