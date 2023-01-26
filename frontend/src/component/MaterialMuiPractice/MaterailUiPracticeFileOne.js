import React, { Fragment, useState } from "react";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import {
  Box,
  Button,
  ButtonBase,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { theme1 } from "./Themere";
import Divider from "@mui/material/Divider";
import SideBarMUIPratice from "./SideBarMUIPratice";
import FeedMui from "./FeedMui";
import RightMuibar from "./RightMuibar";
import NavbarMuiPracct from "./NavbarMuiPracct";
import AddPosterMui from "./AddPosterMui";

const MaterailUiPracticeFileOne = () => {
  const [mode, setmode] = useState("light");

  const darkThemer = createTheme({
    palette: {
      mode: mode,
    },
  });

  //   const BlueButton = styled(Button)(({ theme })=>({
  //     backgroundColor: theme.palette.otherColor,
  //     color: theme.palette.buttonTExtColor,
  //     margin: 5,
  //     "&:hover": {
  //       backgroundColor: theme.palette.secondary.main,
  //     },
  //     "&:disabled": {
  //       backgroundColor: "grey",
  //     },

  //   }));

  return (
    <Fragment>
      {/* <Button
        endIcon={<AcUnitOutlinedIcon />}
        variant="contained"
        size="large"
        color="secondary"
      >
        Contained
      </Button>
      <Typography variant="h1" component="p">
        {" "}
        Hi there
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "skyblue",
          color: "#888",
          margin: 5,
          "&:hover": {
            backgroundColor: "greenyellow",
          },
          "&:disabled": {
            backgroundColor: "grey",
          },
        }}
        // disabled
      >
        my unique button
      </Button>




  <Divider/>
      <ThemeProvider theme={theme1}>
        <Button variant="contained" color="otherColor"> insiden new theme</Button>

        <Divider/>

        <BlueButton variant="contained">this the with theone applued</BlueButton>

      </ThemeProvider> 
      
      
 */}
      <ThemeProvider theme={darkThemer}>
        <Box
          sx={{ mt: "3vh" }} bgcolor={"background.default"} color={"text.primary"}

          //   sx={{backgroundColor:"red"}}
        >
          <NavbarMuiPracct />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <SideBarMUIPratice  mode={mode} setmode={setmode}/>
            <FeedMui />
            <RightMuibar />
          </Stack>

          <AddPosterMui />
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default MaterailUiPracticeFileOne;
