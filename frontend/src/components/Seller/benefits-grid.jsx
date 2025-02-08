import React from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import {
  LocalShipping,
  Percent,
  SupervisorAccount,
  KeyboardReturn,
  Calculate,
  Headset,
  AccountBalance,
  PhoneAndroid,
} from "@mui/icons-material";

const benefits = [
  {
    icon: LocalShipping,
    title: "Sell Across India",
    description: "Reach over 50 crore+ customers across 27000+ pincodes",
  },
  {
    icon: Percent,
    title: "Higher Profits",
    description: "With 0% commission*, you take 100% profits with you",
  },
  {
    icon: SupervisorAccount,
    title: "Account Management",
    description: "Our Dedicated managers will help your business on Flipkart",
  },
  {
    icon: KeyboardReturn,
    title: "Lower Return Charges",
    description: "With our flat and low return charges, ship your products stress-free",
  },
  {
    icon: Calculate,
    title: "Simple Pricing Calculator",
    description: "Use our simple pricing calculator to decide the best and competitive selling price for your product",
  },
  {
    icon: Headset,
    title: "24×7 Seller Support",
    description: "All your queries and issues are answered by our dedicated Seller Support Team",
  },
  {
    icon: AccountBalance,
    title: "Fast & Regular Payments",
    description: "Get payments as fast as 7-10 days from the date of dispatch",
  },
  {
    icon: PhoneAndroid,
    title: "Business on the go",
    description: "Download our Flipkart Seller App to manage your business anywhere, anytime",
  },
];

export function BenefitsGrid() {
  return (
    <Box sx={{ bgcolor: "rgb(235, 243, 251)", py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="primary">
          Why Sell on Flipkart?
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "all 0.3s ease-in-out",
                  '&:hover': {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box sx={{ bgcolor: "#E3F2FD", borderRadius: "50%", p: 2, mb: 2, display: "flex", justifyContent: "center", alignItems: "center", width: 70, height: 70 }}>
                  <benefit.icon sx={{ color: "#1976D2", fontSize: 40 }} />
                </Box>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}