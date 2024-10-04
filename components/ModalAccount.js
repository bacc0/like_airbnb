import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Login from './Login'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({
    handleCloseAccount, openAccount, isLogin, setIsLogin, setName, name }) {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);


    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={openAccount}
                onClose={handleCloseAccount}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >

                    <h1>Account</h1>
                </Box>
            </Modal>
        </div>
    );
}