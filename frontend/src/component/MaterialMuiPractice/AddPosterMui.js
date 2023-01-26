import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import { Avatar, Box, Button, Stack, TextField, Typography, styled } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';




const StyledModal = styled(Modal)({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",

})

const UserBoxer =styled(Box)({
    display:"flex",
    alignItems:"center",
    gap:"10px",
    mb:5,
    justifyContent:"center"
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
     height:350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:5,
  };
  

const AddPosterMui = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    <Tooltip title="Adder" sx={{position:'fixed' , 
    "&:hover":{backgroundColor:'skyblue', color:"black"},
    
    bottom:20, left:{xs:"calc(50% - 25px)", md:30}, backgroundColor:'blue' ,color:"white"}}>
    <IconButton onClick={handleOpen}>
      <AddCircleOutlineIcon  />
    </IconButton>
  </Tooltip>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Text in a modal
          </Typography>
      <Box sx={{display:"flex", flexDirection:"row" , gap:"10px" , mb:2}}>
      <Avatar alt="walla sanner" src="https://images.pexels.com/photos/7451860/pexels-photo-7451860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sirajudheen haqqqani
          </Typography>
      </Box>
         
         <UserBoxer>
              <TextField rows={4} multiline={true}  fullWidth>

              </TextField>

              
         </UserBoxer>
          <Button color="primary" variant="contained" sx={{mt:2, mb:2}}> Add poster</Button>
          <Stack direction="row" gap={1}>

      <EmojiEmotionsIcon sx={{color:"#21e6ed"}}/>

          </Stack>
        </Box>
      </StyledModal>


  </>
  )
}

export default AddPosterMui