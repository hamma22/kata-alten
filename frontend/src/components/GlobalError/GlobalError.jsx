import PropTypes from "prop-types";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HelpCircle } from "lucide-react";

import { GlobalErrorStyles } from "./GlobalErrorStyles";

const StyledTitle = styled(Typography)(GlobalErrorStyles.titleStyle);
const StyledDescription = styled(Typography)(
  GlobalErrorStyles.descriptionStyle
);
const IgnoreButton = styled(Button)(GlobalErrorStyles.ignoreButtonStyle);
const IgnoreText = styled(Typography)(GlobalErrorStyles.ignoreText);
const SupportButton = styled(Button)(GlobalErrorStyles.supportButtonStyle);
const SupportText = styled(Typography)(GlobalErrorStyles.supportText);

const GlobalError = ({ resetErrorBoundary, noLayout }) => {
  return (
    <Grid
      container
      height={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        container
        item
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <StyledTitle>Oups ! </StyledTitle>
        <StyledDescription align="center">
          Une erreur est survenue
        </StyledDescription>
        <Grid container justifyContent={"center"}>
          <IgnoreButton
            variant="contained"
            onClick={() => resetErrorBoundary()}
            startIcon={noLayout && <ArrowBackIcon />}
          >
            <IgnoreText>Ignorer</IgnoreText>
          </IgnoreButton>
          <SupportButton
            variant="outlined"
            onClick={() => {}} // support form
            startIcon={
              <HelpCircle
                style={{ marginRight: 5 }}
                size={20}
                color="#344054"
              />
            }
          >
            <SupportText>Support</SupportText>
          </SupportButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
GlobalError.propTypes = {
  resetErrorBoundary: PropTypes.func.isRequired,
  noLayout: PropTypes.bool,
};
export default GlobalError;
