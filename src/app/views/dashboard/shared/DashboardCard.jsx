import { AttachMoney, MonetizationOn, ShoppingCart } from "@mui/icons-material";
import { Card, Fab, Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import { dashboardData } from '../../../redux/actions/dashboardAction';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { H5 } from "app/components/Typography";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const FabIcon = styled(Fab)(() => ({
  width: "32px !important",
  height: "32px !important",
  boxShadow: "none !important",
}));

const Heading = styled("h6")(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "700",
  color: theme.palette.primary.main,
}));

const ValueText = styled("h3")(({ theme }) => ({
  margin: 0,
  fontWeight: "bold",
  color: theme.palette.text.secondary,
}));

export default function DashboardCard() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { information } = useSelector((state) => state.dashboardReducer);
  const { user_info } = useSelector((state) => state.auth);
  const isRtl = ["ar", "fa", "ps"].includes(i18n.language);

  useEffect(() => {
    dispatch(dashboardData());
  }, [dispatch]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  const cardItems = [
    { label: 'BALANCE', icon: <AttachMoney />, value: information.balance, color: "#4caf50" },
    { label: 'LOAN_BALANCE', icon: <MonetizationOn />, value: information.loan_balance, color: "#f44336" },
    { label: 'SALE', icon: <ShoppingCart />, value: [{title:'TODAY_SALE',val:information.today_sale}, {title:'TOTAL_SALE',val:information.total_sold_amount}], color: "#9c27b0" },
    { label: 'PROFIT', icon: <AttachMoney />, value: [{title:'TODAY_PROFIT',val:information.today_profit}, {title:'TOTAL_PROFIT',val:information.total_revenue}], color: "#3f51b5" },
  ];

  return (
    <Grid container spacing={1} sx={{ mb: 3 }} dir={isRtl ? 'rtl' : 'ltr'}>
      {cardItems.map((item, index) => (
        <Grid key={index} item xs={6} sm={6} md={6} lg={6} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
          <Card elevation={6} sx={{height:isSmallScreen?'100px':'150px', p: 2, borderRadius: '12px' }}>
            
            {/* Aligns content to start */}
            <ContentBox display="flex" alignItems="center" textAlign="start">
              <FabIcon sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', color: item.color, ml:isRtl?0.5:'' }}>
                {item.icon}
              </FabIcon>
              <H5
                color="textPrimary"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: '12px', sm: '12px', md: '16px', lg: '18px' },
                }}
              >
                {t(item.label)}
              </H5>
            </ContentBox>

            <ContentBox sx={{ flexDirection: 'column', alignItems: 'flex-start', mt: 1 }}>
              {Array.isArray(item.value)
                ? item.value.map((data, idx) => (
                    <ValueText key={idx} sx={{ fontSize: { xs: '12px', sm: '12px', md: '16px', lg: '18px' } }}>
                      {t(data.title)}: {data.val} {user_info.currency_preference_code}
                    </ValueText>
                  ))
                : (
                    <ValueText sx={{ fontSize: { xs: '12px', sm: '12px', md: '16px', lg: '18px' } }}>
                      {item.value} {user_info.currency_preference_code}
                    </ValueText>
                  )
              }
            </ContentBox>

            
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
