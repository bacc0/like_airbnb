import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import styles from '../src/styles/main_buttons.module.css';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

export default function MainButtons({ calendarIsVisible, setCalendarIsVisible,
     destination, setDestination
}) {
     // State to store the destination
     //     const [destination, setDestination] = useState('');

     // Function to toggle calendar visibility
     const toggleCalendarVisibility = () => {
          setCalendarIsVisible((prev) => !prev);
     };

     // Function to handle input change in the TextField
     const handleDestinationChange = (event) => {
          setDestination(event.target.value); // Update the destination state with the input value
     };

     return (
          <div style={{ background: '' }}>
               <Box
                    sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         '& > *': {
                              m: 1,
                         },
                    }}
               >
                    <div
                         style={{
                              transform: `scale(${calendarIsVisible ? 0.75 : 1}) translateY(${calendarIsVisible ? '-30px' : '0'})`,
                              transition: 'transform 0.35s ease-in-out', // Add transition for smooth scaling and movement
                         }}
                    >
                         <div
                              className={styles.button_container}
                              style={{
                                   boxShadow: `0 0 ${calendarIsVisible ? 0 : 10}px #00000033`,
                              }}
                         >
                              {/* TextField to capture the destination */}
                              <TextField
                                   className={styles.input_aria}
                                   id="standard-basic"
                                   label="Destination"
                                   variant="standard"
                                   value={destination} // Controlled input: value is tied to the state
                                   onChange={handleDestinationChange} // Update state when the user types
                              />

                              <Button
                                   startIcon={<DateRangeRoundedIcon />}
                                   className={styles.button_check_in}
                                   onClick={toggleCalendarVisibility}
                                   disabled={calendarIsVisible}
                                   key="two"
                              >
                                   Check In
                              </Button>

                              <Button
                                   startIcon={<SearchRoundedIcon />}
                                   className={styles.button_search}
                                   onClick={toggleCalendarVisibility}
                                   style={{
                                        background: calendarIsVisible ? '#000000' : '#FFFFFF',
                                        color: calendarIsVisible ? '#FFFFFF' : '#000000',
                                   }}
                                   key="three"
                              >
                                   Search
                              </Button>
                         </div>
                    </div>
               </Box>
          </div>
     );
}
