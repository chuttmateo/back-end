import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import Galeria from './Galeria';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  heigth:'100%',
  backgroundColor:"#111", 
  border: '1px solid #1E1E1E',

};

export default function BotonGaleria(props) {
  const images = props.images
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ver Mas</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Galeria images={images}/>
        </Box>
      </Modal>
    </div>
  );
}