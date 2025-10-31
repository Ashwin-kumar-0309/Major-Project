import { Box, styled, Typography, Button, Chip, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import heroImg from "../../img/hero_illustration.png";
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#ffffff",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    animation: `${fadeInUp} 1s ease-out`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "95vh",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        opacity: 0.4,
      }
    }}>
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <CustomBox>
          <Box sx={{ 
            flex: "2",
            animation: `${fadeInUp} 1s ease-out`,
          }}>
            <Chip 
              icon={<SecurityIcon />} 
              label="Enterprise-Grade Security" 
              sx={{ 
                mb: 3,
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                backdropFilter: "blur(10px)",
              }}
            />
            <Title variant="h1">
              Blockchain-Powered<br/>Product Verification
            </Title>
            <Typography
              variant="h5"
              sx={{ 
                fontSize: "24px", 
                color: "rgba(255,255,255,0.95)", 
                my: 4,
                fontWeight: 500,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              🔒 Scan. Verify. Trust.
            </Typography>
            <Typography
              variant="body1"
              sx={{ 
                fontSize: "18px", 
                color: "rgba(255,255,255,0.85)", 
                my: 4,
                lineHeight: 1.8,
                animation: `${fadeInUp} 1s ease-out 0.3s both`,
              }}
            >
              Protect your products and your trust. Our blockchain-based verification 
              system provides an easy and secure way to authenticate every item from 
              source to shelf.
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ 
              mt: 4,
              animation: `${fadeInUp} 1s ease-out 0.4s both`,
              flexWrap: "wrap",
              gap: 2,
            }}>
              <Button 
                variant="contained" 
                size="large"
                href="/login"
                sx={{
                  backgroundColor: "white",
                  color: "#667eea",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  }
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  color: "white",
                  borderColor: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  borderWidth: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                    borderWidth: 2,
                    transform: "translateY(-3px)",
                  }
                }}
              >
                Learn More
              </Button>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mt: 6, flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <VerifiedIcon sx={{ fontSize: 40, color: "white", mb: 1 }} />
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  100% Authentic
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <SecurityIcon sx={{ fontSize: 40, color: "white", mb: 1 }} />
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Blockchain Secured
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <SpeedIcon sx={{ fontSize: 40, color: "white", mb: 1 }} />
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Instant Verification
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ 
            flex: "1.25",
            animation: `${float} 3s ease-in-out infinite`,
          }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ 
                maxWidth: "100%", 
                marginBottom: "2rem",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
              }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
