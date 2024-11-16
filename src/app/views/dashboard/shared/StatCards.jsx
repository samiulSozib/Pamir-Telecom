import { Box, Card, Grid, styled } from "@mui/material";
import { Small } from "app/components/Typography";
import { serviceCategories } from '../../../redux/actions/serviceCategoriesAction';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { categorizeServices } from '../../../utils/utils';
import { useNavigate } from "react-router-dom";

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "8px", // reduced padding to make the card smaller
  background: theme.palette.background.paper,
  cursor:"pointer"
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .icon": {
    width: "40px", // reduced size for smaller appearance
    height: "40px",
    borderRadius: "50%",
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px", // reduced margin for smaller spacing
  },
  "& small": { color: theme.palette.text.secondary, fontSize: "0.75rem" }, // smaller font size for the text
}));



export default function StatCards() {
  const dispatch = useDispatch();
  const { serviceCategoryList } = useSelector((state) => state.serviceCategoriesReducer);
  const [categorizedServices, setCategorizedServices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(serviceCategories());
  }, [dispatch]);

  useEffect(() => {
    if (serviceCategoryList) {
      const categorized = categorizeServices(serviceCategoryList);
      //console.log(categorized);
      setCategorizedServices(categorized);
    }
  }, [serviceCategoryList]);

  const handleCategoryClick=(type,countryId,categoryId,companyId)=>{
    if(type=='nonsocial'){
      navigate(`/recharge/default?type=${type}&countryId=${countryId}&categoryId=${categoryId}`);
    }else{
      navigate(`/recharge/default?type=${type}&countryId=${countryId}&categoryId=${categoryId}&companyId=${companyId}`);
    }
  }

  return (
    <Box sx={{ marginTop: "24px" }}>
      {/* Render Non-Social Services */}
        {Object.keys(categorizedServices.nonsocial || {}).map((country) => (
          <Box key={country} sx={{ marginBottom: "16px" }}>
            <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
              {country} Network
            </h6>
            <Grid container spacing={2}>
              {categorizedServices.nonsocial[country].categories.map((category, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  
                  <StyledCard elevation={3} onClick={() => handleCategoryClick('nonsocial',categorizedServices.nonsocial[country].country_id,category.categoryId)}>
                    <ContentBox>
                      <Box className="icon">
                        <img
                          src={categorizedServices.nonsocial[country].countryImage}
                          alt={country}
                          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        />
                      </Box>
                      <Small>{category.categoryName}</Small>
                    </ContentBox>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

      {/* Render Social Services */}
        {Object.keys(categorizedServices.social || {}).map((categoryName) => (
          <Box key={categoryName} sx={{ marginBottom: "16px" }}>
            <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
              {categoryName}
            </h6>
            <Grid container spacing={2}>
              {categorizedServices.social[categoryName].companies.map((company, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <StyledCard elevation={3} onClick={() => handleCategoryClick('social',company.countryId,company.categoryId,company.companyId)}>
                    <ContentBox>
                      <Box className="icon">
                        <img
                          src={company.companyLogo}
                          alt={company.companyName}
                          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        />
                      </Box>
                      <Small>{company.companyName}</Small>
                    </ContentBox>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
    </Box>
  );
}
