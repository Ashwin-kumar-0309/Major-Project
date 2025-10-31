import '../../css/Role.css'
import { Link, useNavigate } from 'react-router-dom';
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
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    LinearProgress,
    Tooltip,
    IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WalletIcon from '@mui/icons-material/Wallet';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InsightsIcon from '@mui/icons-material/Insights';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import RefreshIcon from '@mui/icons-material/Refresh';
import useAuth from '../../hooks/useAuth';


const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

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

const Retailer = () => {

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
            title: 'Live Inventory Value',
            value: '$1.8M',
            changeLabel: '+5.6% vs last cycle',
            gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
            icon: <Inventory2Icon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Verified Scans',
            value: '3,482',
            changeLabel: 'Trust index at 99.2%',
            gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
            icon: <InsightsIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Inbound Shipments',
            value: '14 today',
            changeLabel: '7 awaiting confirmation',
            gradient: 'linear-gradient(135deg, #facc15 0%, #a855f7 100%)',
            icon: <LocalShippingIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Loyalty Uptake',
            value: '87%',
            changeLabel: 'Consumer retention week-over-week',
            gradient: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)',
            icon: <LoyaltyIcon sx={{ fontSize: 34 }} />
        }
    ];

    const customerSignals = [
        {
            primary: 'Early adopter sale event driving 240% QR verifications',
            secondary: 'Campaign Horizon • 9 minutes ago',
            chip: 'Trending'
        },
        {
            primary: 'High-demand SKU restock confirmation required',
            secondary: 'Supplier Optima Logistics • 32 minutes ago',
            chip: 'Action'
        },
        {
            primary: 'Consumer trust score uplift recorded for Wellness line',
            secondary: 'Net Promoter Score +0.8 week/week',
            chip: 'Success'
        }
    ];

    const actionBoard = [
        {
            title: 'Confirm inbound pallet: NX-304',
            progress: 64,
            eta: 'Inspection window closes in 2h'
        },
        {
            title: 'Publish authenticity certificates to marketplace',
            progress: 46,
            eta: 'Due tonight'
        },
        {
            title: 'Sync inventory with ERP + blockchain',
            progress: 28,
            eta: 'Scheduled for midnight'
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
            title: "Scan & Update Product",
            icon: <QrCodeScannerIcon sx={{ fontSize: 40 }} />,
            link: "/scanner",
            color: "#f59e0b",
            description: "Scan QR codes to update"
        },
        {
            title: "View My Products",
            icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
            link: "/retailer-products",
            color: "#1e88e5",
            description: "Manage your inventory"
        },
    ];

    return ( 
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
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
                        color: '#f59e0b',
                        fontSize: 28,
                        fontWeight: 'bold'
                    }}>
                        R
                    </Avatar>
                    <Box>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                            Welcome, Retailer
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Manage products and sales
                        </Typography>
                    </Box>
                </Box>
                <Btn 
                    endIcon={<LogoutIcon />}
                    variant="contained"
                    sx={{
                        bgcolor: 'white',
                        color: '#f59e0b',
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

            {/* Commerce Intelligence */}
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
                            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.16, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.85), transparent 55%)' }} />
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
                                        bgcolor: 'rgba(255,255,255,0.22)',
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
                    <WalletIcon sx={{ fontSize: 40, color: '#f59e0b' }} />
                    {currentAccount ? (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
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
                                    bgcolor: '#f59e0b',
                                    '&:hover': { bgcolor: '#d97706' }
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
                                            boxShadow: '0 20px 48px rgba(0,0,0,0.22)',
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
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#161616' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(22,22,22,0.7)' }}>
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
                                    Customer Signals
                                </Typography>
                                <Tooltip title="Refresh insights">
                                    <IconButton size="small" sx={{ color: '#f97316' }}>
                                        <RefreshIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Divider sx={{ mb: 2 }} />
                            <List disablePadding>
                                {customerSignals.map((item) => (
                                    <ListItem key={item.primary} alignItems="flex-start" sx={{ px: 0, mb: 1.5 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#f59e0b15', color: '#f59e0b' }}>
                                                <ShoppingCartIcon />
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
                                            sx={{ bgcolor: '#f59e0b10', color: '#d97706', fontWeight: 600 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'rgba(249,115,22,0.92)',
                                color: 'white',
                                boxShadow: '0 16px 40px rgba(217,119,6,0.35)'
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <AssessmentIcon />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Action Playbook
                                </Typography>
                            </Stack>
                            <Stack spacing={2}>
                                {actionBoard.map((task) => (
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
                                                    backgroundColor: '#fde68a'
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
}
 
export default Retailer;