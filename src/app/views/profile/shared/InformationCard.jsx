import { AttachMoney, MonetizationOn, ShoppingCart } from "@mui/icons-material";
import { Card, Fab, Grid, lighten, styled, useTheme } from "@mui/material";
import { dashboardData } from '../../../redux/actions/dashboardAction';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important"
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px"
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary
}));

export default function InformationCard() {
  const { palette } = useTheme();
  const bgError = lighten(palette.error.main, 0.85);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps"; 

  const dispatch = useDispatch();
  const { information } = useSelector((state) => state.dashboardReducer);

  useEffect(() => {
    dispatch(dashboardData());
  }, [dispatch]);

  // Array of card data
  const cardData = [
    { 
      icon: <AttachMoney color="success" />,
      title: t('BALANCE'),
      value: information.balance,
      gradient: "linear-gradient(135deg, #e0f7fa, #b2ebf2)", // Light blue gradient
      color: "#08ad6c",
      bgColor: "rgba(9, 182, 109, 0.15)"
    },
    {
      icon: <MonetizationOn color="error" />,
      title: t('LOAN_BALANCE'),
      value: information.loan_balance,
      gradient: "linear-gradient(135deg, #f8bbd0, #f48fb1)", // Light pink gradient
      color: "error.main",
      bgColor: bgError
    },
    {
      icon: <AttachMoney color="success" />,
      title: t('TOTAL_SOLD_AMOUNT'),
      value: information.total_sold_amount,
      gradient: "linear-gradient(135deg, #e1bee7, #ba68c8)", // Light purple gradient
      color: "#08ad6c",
      bgColor: "rgba(9, 182, 109, 0.15)"
    },
    {
      icon: <AttachMoney color="success" />,
      title: t('TOTAL_REVENUE'),
      value: information.total_revenue,
      gradient: "linear-gradient(135deg, #c8e6c9, #81c784)", // Light green gradient
      color: "inherit",
      bgColor: "rgba(9, 182, 109, 0.15)"
    },
    {
      icon: <ShoppingCart color="success" />,
      title: t('TOTAL_SALE'),
      value: information.today_sale,
      gradient: "linear-gradient(135deg, #ffccbc, #ffab91)", // Light orange gradient
      color: "#08ad6c",
      bgColor: "rgba(9, 182, 109, 0.15)"
    },
    {
      icon: <AttachMoney color="success" />,
      title: t('TOTAL_PROFIT'),
      value: information.today_profit,
      gradient: "linear-gradient(135deg, #fff9c4, #fff59d)", // Light yellow gradient
      color: "inherit",
      bgColor: "rgba(9, 182, 109, 0.15)"
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {cardData.map((card, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={6}
          sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
        >
          <Card
            elevation={3}
            sx={{
              p: 2,
              background: card.gradient // Apply gradient
            }}
          >
            <ContentBox>
              <FabIcon size="medium" sx={{ ml: isRtl ? 1 : '', background: card.bgColor }}>
                {card.icon}
              </FabIcon>
              <H3 color={card.color}>{card.title}</H3>
            </ContentBox>
            <ContentBox sx={{ pt: 2 }}>
              <H1>{card.value}</H1>
            </ContentBox>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
