import React from 'react';
import ReactLoading from 'react-loading';

const Example = ({ type, color }) => (
     <div
          style={{
               position: 'absolute',  // Absolute positioning
               top: '50%',            // Center vertically
               left: '50%',           // Center horizontally
               transform: 'translate(-50%, -50%)',  // Adjust position to truly center
               // width: '50%',  
               zIndex: 100,
               background: '#ffffffcc',
               background: `radial-gradient(circle, #ffffff44 36%, #ffffff00 36%)`,
               borderRadius: 500
               // transform: 'scale(2)'       // Control the width of the stack or progress
          }}
     >
          <div
               style={{
                    position: 'absolute',
                    top: 42,
                    left: 28,
                    color: '#FF385C',
                    fontSize: 12
               }}
          >Loading...</div>
          <ReactLoading type={'spinningBubbles'} color={'#FF385C'} height={'100px'} width={'100px'} />
     </div>
);

export default Example;


// import * as React from 'react';
// import { motion } from 'framer-motion'; // Import motion from Framer Motion

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import CircularProgress, {
//      circularProgressClasses,
// } from '@mui/material/CircularProgress';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';



// // From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221

// function BorderLinearProgress() {
//      return (
//           <React.Fragment>

//                <svg width={0} height={0}>
//                     <defs>
//                          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                               <stop offset="0%" stopColor="#FF385C" />
//                               <stop offset="90%" stopColor="#FF385C" />
//                          </linearGradient>
//                     </defs>
//                </svg>
//                <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
//           </React.Fragment>
//      );
// }
// export default function CustomizedProgressBars() {
//      return (
//           <motion.div
//                initial={{
//                     opacity: 1,
//                     translateY: 0,
//                     translateX: 0,
//                     scale: 1
//                }} // Initial state
//                animate={{
//                     opacity: 0.9,
//                     translateY: 0,
//                     translateX: 1,
//                     scale: 1
//                }} // Animate to visible state
//                transition={{ duration: 0.4, delay: 0, }}

//                style={{
//                     position: 'absolute',  // Absolute positioning
//                     top: '50%',            // Center vertically
//                     left: '50%',           // Center horizontally
//                     transform: 'translate(-50%, -50%)',  // Adjust position to truly center
//                     // width: '50%',  
//                     zIndex: 100,
//                     // transform: 'scale(2)'       // Control the width of the stack or progress
//                }}
//           >
//                <Stack spacing={2} sx={{ flexGrow: 1 }}

//                >
//                     <BorderLinearProgress />

//                     <h4
//                          style={{
//                               fontSize: 12, 
//                               fontWeight: 100,
//                               marginLeft: -4
//                          }}
//                     > Loading...</h4>
//                </Stack>
//           </motion.div >
//      );
// }
