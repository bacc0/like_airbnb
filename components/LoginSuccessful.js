import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import { BorderRight, Height } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginSuccessful() {
     const [open, setOpen] = React.useState(false);




     React.useEffect(() => {
          setOpen(true);
          setTimeout(() => {
               setOpen(false);
          }, 3000);
     }, []);


     return (
          <Stack spacing={2} sx={{ width: '100%' }}>

               {open &&
                    <div
                         style={{
                              position: 'absolute',
                              top: 32,
                              left: '50%', // Move to the center of the container
                              transform: 'translateX(-50%)',
                         }}
                    >
                         <Alert
                              everity="success"
                              style={{
                                   width: '50vw',
                                   height: '80px',
                                   background: '#FF385C',
                                   color: '#ffffff',
                                   fontSize: 22,
                                   borderRadius: 8,
                                   display: 'flex', // Use flexbox
                                   justifyContent: 'center', // Center horizontally
                                   alignItems: 'center', // Center vertically
                                   textAlign: 'center', // Ensure the text is centered
                              }}>
                              Login Successful!
                         </Alert>
                    </div>
               }

          </Stack>
     );
}
