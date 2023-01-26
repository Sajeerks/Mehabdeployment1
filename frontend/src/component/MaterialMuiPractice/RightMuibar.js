
import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { AvatarGroup } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {Link} from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];

const RightMuibar = () => {
  const cliking=(url)=>{
    //  window.location.href =url
    //  console.log({url})
  }
  return (
    <Box sx={{backgroundColor:"none",width:300,flex:1, p:2,display:{xs:"none", sm:"block"}}}>

      <Box position="fixed" >
     <Typography variant='h6' fontWeight={100} >
    Online Friends
     </Typography>
     <Box backgroundColor="none">
  <AvatarGroup max={4} sx={{display:"flex", justifyContent:"center"}}>
  <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/7166374/pexels-photo-7166374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
  <Avatar alt="Travis Howard" src="https://images.pexels.com/photos/5182393/pexels-photo-5182393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
  <Avatar alt="Cindy Baker" src="https://images.pexels.com/photos/7296680/pexels-photo-7296680.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
  <Avatar alt="Agnes Walker" src="https://images.pexels.com/photos/4541411/pexels-photo-4541411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
  <Avatar alt="walla sanner" src="https://images.pexels.com/photos/7451860/pexels-photo-7451860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
  </AvatarGroup>
  </Box>
  <Typography variant='h6' fontWeight={100}>
     Images List
     </Typography>


     
     <ImageList
      sx={{ width: 300, height: 300 }}
      variant="quilted"
      cols={2}
      rowHeight={121}
      gap={2}
    >
      {itemData.map((item) => (
      
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
           <a href={item.img}>
          <img onClick={cliking(item.img)}
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
       </a>
        </ImageListItem>
      
      ))}
    </ImageList>
    <Typography variant='h6'>Latest Conversion</Typography>

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/7451860/pexels-photo-7451860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="https://images.pexels.com/photos/7451860/pexels-photo-7451860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis munna" src="https://images.pexels.com/photos/7451860/pexels-photo-7451860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />

        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>


      </Box>


    </Box>
  )
}

export default RightMuibar