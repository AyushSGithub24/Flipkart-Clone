import { Card, CardContent, Typography, Avatar, Box } from "@mui/material"

export function TestimonialCard() {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={
             'https://img1a.flixcart.com/fk-sp-static/images/onboarding_logo_RajuImg.svg'
            }
            alt="Seller"
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="body1" component="p">
              Starting with 1, Flipkart helped me expand to 6 categories with 5x growth year on year!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Raju Lunawath, Amazestore
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

