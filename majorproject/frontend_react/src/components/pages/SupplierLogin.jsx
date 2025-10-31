import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    Tab,
    Tabs,
    TextField,
    Typography,
    Paper,
    Stack,
    Chip
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Shield';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = '/auth';
const REGISTER_URL = '/addaccount';
const PROFILE_URL = '/addprofile';

const glowGradient = 'radial-gradient(circle at top left, #34d39933, transparent 55%), radial-gradient(circle at bottom right, #10b98133, transparent 45%)';

export default function SupplierLogin() {
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
    };

    const handleTabChange = (_event, newValue) => {
        setTabValue(newValue);
        setLoginErrMsg('');
        setRegErrMsg('');
    };

    useEffect(() => {
        setLoginErrMsg('');
    }, [loginUser, loginPwd]);

    useEffect(() => {
        setRegErrMsg('');
    }, [regUser, regPwd, regName, regDescription, regWebsite, regLocation]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${LOGIN_URL}/${loginUser}/${loginPwd}`);
            if (!res?.data?.length) {
                setLoginErrMsg('Login failed. Please verify your credentials.');
                return;
            }

            const role = res.data[0].role;
            if (role !== 'supplier') {
                setLoginErrMsg('Access denied. Supplier credentials required.');
                return;
            }

            setAuth({ user: loginUser, pwd: loginPwd, role });
            setLoginUser('');
            setLoginPwd('');
            navigate('/supplier', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setLoginErrMsg('Unable to reach server. Please try again later.');
            } else if (err.response?.status === 400) {
                setLoginErrMsg('Invalid username or password.');
            } else if (err.response?.status === 401) {
                setLoginErrMsg('Unauthorized access.');
            } else {
                setLoginErrMsg('Login failed. Please try again later.');
            }
            errRef.current?.focus();
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(REGISTER_URL, {
                username: regUser,
                password: regPwd,
                role: 'supplier'
            });

            await axios.post(PROFILE_URL, {
                username: regUser,
                name: regName,
                description: regDescription,
                website: regWebsite,
                location: regLocation,
                image: '',
                role: 'supplier'
            });

            setRegErrMsg('');
            navigate('/login/supplier');
            alert('Supplier account created successfully! Please login.');
            setTabValue(0);
            setRegUser('');
            setRegPwd('');
            setRegName('');
            setRegDescription('');
            setRegWebsite('');
            setRegLocation('');
        } catch (err) {
            if (!err?.response) {
                setRegErrMsg('Unable to reach server. Please try again later.');
            } else {
                setRegErrMsg('Registration failed. Please try again later.');
            }
            errRef.current?.focus();
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #031b1d 40%, #052e16 100%)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: glowGradient,
                    opacity: 0.9,
                    pointerEvents: 'none'
                }}
            />

            <Container component="main" maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="stretch">
                    <Grid item xs={12} md={5}>
                        <Paper
                            elevation={8}
                            sx={{
                                height: '100%',
                                p: 5,
                                borderRadius: 4,
                                background: 'linear-gradient(160deg, rgba(13,148,136,0.9) 0%, rgba(16,185,129,0.85) 100%)',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Stack spacing={3}>
                                <Chip
                                    icon={<SparklesIcon />}
                                    label="Supplier-first Experience"
                                    sx={{
                                        alignSelf: 'flex-start',
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                />
                                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                                    Orchestrate Your Intelligent Supply Network
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                                    Seamlessly track manufacturer requests, confirm deliveries, and update blockchain-protected product data from one polished workspace.
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={2}>
                                        <LocalShippingIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 700 }}>Real-time logistics dashboard</Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                Monitor handoffs, shipment progress, and action queues instantly.
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <ShieldIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 700 }}>Blockchain-grade trust</Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                Every update is anchored to Identeefi’s verification layer for tamper-proof records.
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Paper
                            elevation={6}
                            sx={{
                                borderRadius: 4,
                                p: { xs: 3, md: 5 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backdropFilter: 'blur(14px)',
                                background: 'rgba(15,23,42,0.78)',
                                color: 'white'
                            }}
                        >
                            <Stack spacing={1} mb={4}>
                                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                    Supplier Access
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                    Sign in or onboard your supply operations team.
                                </Typography>
                            </Stack>

                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                textColor="inherit"
                                indicatorColor="secondary"
                                sx={{ mb: 4, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
                            >
                                <Tab label="Login" />
                                <Tab label="Create Supplier Account" />
                            </Tabs>

                            {tabValue === 0 && (
                                <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                                    {loginErrMsg && (
                                        <Typography
                                            ref={errRef}
                                            variant="body2"
                                            sx={{
                                                color: '#fca5a5',
                                                mb: 2,
                                                fontWeight: 600
                                            }}
                                        >
                                            {loginErrMsg}
                                        </Typography>
                                    )}

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="loginUsername"
                                        label="Supplier Username"
                                        name="loginUsername"
                                        autoComplete="username"
                                        autoFocus
                                        value={loginUser}
                                        onChange={(e) => setLoginUser(e.target.value)}
                                        InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                        InputProps={{ sx: { color: 'white' } }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="loginPassword"
                                        label="Password"
                                        type="password"
                                        id="loginPassword"
                                        autoComplete="current-password"
                                        value={loginPwd}
                                        onChange={(e) => setLoginPwd(e.target.value)}
                                        InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                        InputProps={{ sx: { color: 'white' } }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            py: 1.5,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                                            }
                                        }}
                                    >
                                        Access Dashboard
                                    </Button>
                                </Box>
                            )}

                            {tabValue === 1 && (
                                <Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mt: 1 }}>
                                    {regErrMsg && (
                                        <Typography
                                            ref={errRef}
                                            variant="body2"
                                            sx={{ color: '#fca5a5', mb: 2, fontWeight: 600 }}
                                        >
                                            {regErrMsg}
                                        </Typography>
                                    )}

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="regUsername"
                                                label="Supplier Username"
                                                name="regUsername"
                                                value={regUser}
                                                onChange={(e) => setRegUser(e.target.value)}
                                                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                                InputProps={{ sx: { color: 'white' } }}
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
                                                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                                InputProps={{ sx: { color: 'white' } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="regName"
                                                label="Organization Name"
                                                name="regName"
                                                value={regName}
                                                onChange={(e) => setRegName(e.target.value)}
                                                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                                InputProps={{ sx: { color: 'white' } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                id="regDescription"
                                                label="What do you manage in the supply chain?"
                                                name="regDescription"
                                                value={regDescription}
                                                onChange={(e) => setRegDescription(e.target.value)}
                                                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                                InputProps={{ sx: { color: 'white' } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="regWebsite"
                                                label="Website"
                                                name="regWebsite"
                                                value={regWebsite}
                                                onChange={(e) => setRegWebsite(e.target.value)}
                                                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                                InputProps={{ sx: { color: 'white' } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="regLocation"
                                                label="Headquarters"
                                                name="regLocation"
                                                value={regLocation}
                                                onChange={(e) => setRegLocation(e.target.value)}
                                                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                                                InputProps={{ sx: { color: 'white' } }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 4,
                                            py: 1.5,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #0284c7 0%, #0891b2 100%)'
                                            }
                                        }}
                                    >
                                        Create Supplier Workspace
                                    </Button>
                                </Box>
                            )}

                            <Button
                                variant="text"
                                onClick={handleBack}
                                sx={{
                                    mt: 'auto',
                                    alignSelf: 'flex-start',
                                    color: 'rgba(255,255,255,0.65)',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                Back to role selection
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
