import { createTheme } from "@mui/material";

export const theme1 = createTheme({
    palette:{
    primary:{
        main:"#fca903",
        light:"skyblue"
    },
secondary:{
    main:"#15a3eb"
}, 
otherColor:{
    main:"#eb0ce3"
},
buttonTExtColor:{
    primary: "#1a1919"
  },
  raisedButton: {
    textColor: '#ffffff', // this should work
    primaryTextColor: '#ffffff' // or this if using `primary` style
  }
    
    },
    

})