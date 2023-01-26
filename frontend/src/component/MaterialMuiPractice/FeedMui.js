import { Box } from '@mui/material'
import React from 'react'
import CardMuiPract from './CardMuiPract'







const FeedMui = () => {

  return (
    <Box sx={{backgroundColor:"none", flex:2,p:2 , }}>

{/* <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://www.google.com" className="fb-xfbml-parse-ignore">Share</a></div> */}
    <CardMuiPract/>
    <CardMuiPract/>
    <CardMuiPract/>
    <CardMuiPract/>

    

    </Box>
  )
}

export default FeedMui