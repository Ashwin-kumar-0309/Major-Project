import '../../css/Role.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
    Box, 
    Button as Btn, 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Avatar,
    Chip,
    Stack,
    Paper,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WalletIcon from '@mui/icons-material/Wallet';
import VerifiedIcon from '@mui/icons-material/Verified';
import InsightsIcon from '@mui/icons-material/Insights';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TimelineIcon from '@mui/icons-material/Timeline';
import ScienceIcon from '@mui/icons-material/Science';
import EngineeringIcon from '@mui/icons-material/Engineering';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RefreshIcon from '@mui/icons-material/Refresh';
import useAuth from '../../hooks/useAuth';

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        /*
         * First make sure we have access to the Ethereum object.
         */
        if (!ethereum) {
            console.error("Make sure you have Metamask!");
            return null;
        }

        console.log("We have the Ethereum object", ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;
        } else {
            console.error("No authorized account found");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Manufacturer = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const { clearAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });
    }, []);

    const metrics = [
        {
            title: 'Production Output',
            value: '48k units',
            changeLabel: '+8.2% QoQ uplift',
            gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
            icon: <PrecisionManufacturingIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Blockchain Sync',
            value: '99.4%',
            changeLabel: 'Ledger parity maintained',
            gradient: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
            icon: <TimelineIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'QA Pass Rate',
            value: '96.1%',
            changeLabel: '3 batches under review',
            gradient: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
            icon: <ScienceIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Innovation Queue',
            value: '12 pilots',
            changeLabel: 'R&D pipeline funded',
            gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            icon: <RocketLaunchIcon sx={{ fontSize: 34 }} />
        }
    ];

    const operationsFeed = [
        {
            primary: 'Batch MFG-221 verified and sealed for export',
            secondary: 'Smart contract audit complete • 12 minutes ago',
            chip: 'Minted'
        },
        {
            primary: 'Predictive maintenance triggered for Line 03',
            secondary: 'Anomaly detected by sensor cluster • 38 minutes ago',
            chip: 'Scheduled'
        },
        {
            primary: 'Retail feedback loop closed for SKU RX-204',
            secondary: 'Customer satisfaction score +11%',
            chip: 'Improved'
        }
    ];

    const projectBurndown = [
        {
            title: 'Deploy traceability labels to Plant Delta',
            progress: 72,
            eta: 'ETA 2 days'
        },
        {
            title: 'Certify sustainable materials program',
            progress: 48,
            eta: 'Audit booked for Friday'
        },
        {
            title: 'Launch rapid prototyping sprint',
            progress: 31,
            eta: 'Kickoff tomorrow'
        }
    ];

    const connectWallet = async () => {
        try {
            const ethereum = getEthereumObject();
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        clearAuth();
        navigate('/login', { replace: true });
    };

    const menuItems = [
        {
            title: "Check Profile",
            icon: <AccountCircleIcon sx={{ fontSize: 40 }} />,
            link: "/profile",
            color: "#667eea",
            description: "View and edit your profile"
        },
        {
            title: "Add Product",
            icon: <AddBoxIcon sx={{ fontSize: 40 }} />,
            link: "/add-product",
            color: "#43a047",
            description: "Register new products"
        },
        {
            title: "View Products",
            icon: <InventoryIcon sx={{ fontSize: 40 }} />,
            link: "/view-products",
            color: "#1e88e5",
            description: "Manage your inventory"
        },
        {
            title: "View Complaints",
            icon: <ReportProblemIcon sx={{ fontSize: 40 }} />,
            link: "/manufacturer-complaints",
            color: "#e53935",
            description: "Handle customer issues"
        },
    ];

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            p: 4
        }}>
            {/* Header */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4 
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'white',
                        color: '#667eea',
                        fontSize: 28,
                        fontWeight: 'bold'
                    }}>
                        M
                    </Avatar>
                    <Box>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                            Welcome, Manufacturer
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Manage your products and supply chain
                        </Typography>
                    </Box>
                </Box>
                <Btn 
                    endIcon={<LogoutIcon />}
                    variant="contained"
                    sx={{
                        bgcolor: 'white',
                        color: '#667eea',
                        fontWeight: 'bold',
                        px: 3,
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)',
                        }
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Btn>
            </Box>

            {/* Strategic Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {metrics.map((metric) => (
                    <Grid item xs={12} sm={6} md={3} key={metric.title}>
                        <Paper
                            sx={{
                                background: metric.gradient,
                                borderRadius: 3,
                                color: 'white',
                                p: 3,
                                height: '100%',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.16, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), transparent 55%)' }} />
                            <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                                <Avatar
                                    sx={{
                                        width: 54,
                                        height: 54,
                                        bgcolor: 'rgba(255,255,255,0.18)',
                                        border: '2px solid rgba(255,255,255,0.35)'
                                    }}
                                >
                                    {metric.icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                        {metric.value}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
                                        {metric.title}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={metric.changeLabel}
                                    sx={{
                                        alignSelf: 'flex-start',
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Wallet Status */}
            <Paper sx={{ 
                p: 3, 
                mb: 4, 
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <WalletIcon sx={{ fontSize: 40, color: '#667eea' }} />
                    {currentAccount ? (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                                    Wallet Connected
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                                    {currentAccount.substring(0, 6)}...{currentAccount.substring(38)}
                                </Typography>
                            </Box>
                            <Chip 
                                icon={<VerifiedIcon />} 
                                label="Connected" 
                                color="success" 
                                sx={{ fontWeight: 'bold' }}
                            />
                        </>
                    ) : (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Connect Your Wallet
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Connect MetaMask to interact with blockchain
                                </Typography>
                            </Box>
                            <Btn 
                                variant="contained" 
                                onClick={connectWallet}
                                sx={{
                                    bgcolor: '#667eea',
                                    '&:hover': { bgcolor: '#5568d3' }
                                }}
                            >
                                Connect Wallet
                            </Btn>
                        </>
                    )}
                </Stack>
            </Paper>

            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={3}>
                        {menuItems.map((item) => (
                            <Grid item xs={12} sm={6} key={item.title}>
                                <Card 
                                    component={Link}
                                    to={item.link}
                                    sx={{ 
                                        height: '100%',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255,255,255,0.95)',
                                        borderRadius: 3,
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            background: `radial-gradient(circle at top, ${item.color}20, transparent 55%)`
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 48px rgba(0,0,0,0.2)',
                                        }
                                    }}
                                >
                                    <CardContent sx={{ 
                                        p: 4, 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        <Avatar sx={{ 
                                            width: 80, 
                                            height: 80, 
                                            bgcolor: `${item.color}15`,
                                            color: item.color,
                                            mb: 2
                                        }}>
                                            {item.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#111827' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(17,24,39,0.72)' }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Stack spacing={3}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'rgba(255,255,255,0.95)',
                                boxShadow: '0 12px 36px rgba(0,0,0,0.14)'
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                                    Operations Feed
                                </Typography>
                                <Tooltip title="Refresh production feed">
                                    <IconButton size="small" sx={{ color: '#4f46e5' }}>
                                        <RefreshIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Divider sx={{ mb: 2 }} />
                            <List disablePadding>
                                {operationsFeed.map((item) => (
                                    <ListItem key={item.primary} alignItems="flex-start" sx={{ px: 0, mb: 1.5 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#4338ca15', color: '#4338ca' }}>
                                                <InsightsIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
                                                    {item.primary}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                                    {item.secondary}
                                                </Typography>
                                            }
                                        />
                                        <Chip
                                            label={item.chip}
                                            size="small"
                                            sx={{ bgcolor: '#4338ca10', color: '#4338ca', fontWeight: 600 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'rgba(79,70,229,0.92)',
                                color: 'white',
                                boxShadow: '0 16px 40px rgba(59,50,185,0.35)'
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <EngineeringIcon />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Strategic Initiatives
                                </Typography>
                            </Stack>
                            <Stack spacing={2}>
                                {projectBurndown.map((task) => (
                                    <Box key={task.title}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {task.title}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                                                {task.eta}
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={task.progress}
                                            sx={{
                                                mt: 1,
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'rgba(255,255,255,0.25)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#c4b5fd'
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Manufacturer;