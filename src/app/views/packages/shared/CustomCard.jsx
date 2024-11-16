import { alpha, Box, Card, styled } from "@mui/material";
import { H3,H5 } from "app/components/Typography";
import React from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "2rem 1.5rem",
  display: "flex",
  alignItems: "center",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
    flexDirection: "column",
    justifyContent: "center",
    "& .MuiBox-root": {
      marginRight: 0,
      textAlign: "center",
    },
  },
}));

const CustomCard = ({ card }) => {
  const { color } = card;

  return (
    <StyledCard>
      <Box
        sx={{
          width: 60,
          height: 60,
          marginRight: 2,
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: alpha(color, 0.2),
        }}
      >
      </Box>
      <Box mt={{ xs: "1rem", sm: 0 }}>
        <H5 color="text.disabled">fdfd</H5>
        <H3>$545</H3>
      </Box>
    </StyledCard>
  );
};

export default CustomCard;
