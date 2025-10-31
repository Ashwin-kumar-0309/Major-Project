import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Avatar, keyframes } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Login() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }

    const handleRoleLogin = (role) => {
        navigate(`/login/${role}`);
    };

    const roles = [
        {
            name: 'Admin',
            role: 'admin',
            icon: <AdminPanelSettingsIcon sx={{ fontSize: 50 }} />,
            color: '#667eea',
            description: 'System administration'
        },
        {
            name: 'Manufacturer',
            role: 'manufacturer',
            icon: <BusinessIcon sx={{ fontSize: 50 }} />,
            color: '#764ba2',
            description: 'Product management'
        },
        {
            name: 'Supplier',
            role: 'supplier',
            icon: <LocalShippingIcon sx={{ fontSize: 50 }} />,
            color: '#10b981',
            description: 'Supply chain'
        },
        {
            name: 'Retailer',
            role: 'retailer',
            icon: <StorefrontIcon sx={{ fontSize: 50 }} />,
            color: '#f59e0b',
            description: 'Sales & inventory'
        },
        {
            name: 'Consumer',
            role: 'consumer',
            icon: <PersonIcon sx={{ fontSize: 50 }} />,
            color: '#3b82f6',
            description: 'Product verification'
        },
    ];

    return (
        <Box sx={{
            minHeight: "100vh",
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                opacity: 0.4,
            }
        }}>
            <Container component="main" maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        borderRadius: 4,
                        px: { xs: 3, md: 6 },
                        py: { xs: 4, md: 8 },
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        animation: `${fadeIn} 0.6s ease-out`,
                    }}
                >
                    <Typography component="h1" variant="h3"
                        sx={{
                            textAlign: "center", 
                            marginBottom: 2,
                            fontWeight: "bold",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Welcome to Identeefi
                    </Typography>
                    
                    <Typography variant="body1" sx={{ textAlign: 'center', mb: 5, color: 'text.secondary' }}>
                        Select your role to access the blockchain-powered product verification system
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ width: '100%' }}>
                        {roles.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={item.role}>
                                <Card 
                                    onClick={() => handleRoleLogin(item.role)}
                                    sx={{
                                        height: '100%',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        animation: `${fadeIn} 0.6s ease-out ${index * 0.1}s both`,
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 12px 40px ${item.color}40`,
                                        }
                                    }}
                                >
                                    <CardContent sx={{ 
                                        textAlign: 'center', 
                                        p: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                        <Avatar 
                                            sx={{ 
                                                width: 80, 
                                                height: 80, 
                                                mb: 2,
                                                bgcolor: `${item.color}15`,
                                                color: item.color,
                                            }}
                                        >
                                            {item.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mt: 4,
                            color: '#667eea',
                            borderColor: '#667eea',
                            borderWidth: 2,
                            px: 4,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            '&:hover': {
                                borderColor: '#667eea',
                                borderWidth: 2,
                                backgroundColor: '#667eea10',
                            }
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}