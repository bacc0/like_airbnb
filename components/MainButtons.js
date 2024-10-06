import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import styles from '../src/styles/main_buttons.module.css';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

export default function MainButtons({
    calendarIsVisible,
    setCalendarIsVisible,
    destination,
    setDestination,
    handleSearchResultsOpen,
    handleSearchResultsClose,
    handle_NOT_ShowAll,
    searchResults
}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const toggleCalendarVisibility = () => {
        setCalendarIsVisible((prev) => !prev);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value); // Update the destination state with the input value
    };

    const goHome = () => {
        if (searchResults) {
            handleSearchResultsClose(true);
        }
    };

    // Add useEffect to listen to the Enter key press
    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if "Enter" is pressed and there is text in the destination field
            if (event.key === 'Enter' && destination.trim().length > 0) {
                handleSearchResultsOpen(); // Call the function when 'Enter' is pressed
                setCalendarIsVisible(false); // Close the calendar
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleSearchResultsOpen, destination, setCalendarIsVisible]);

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
                    onClick={handle_NOT_ShowAll}
                    style={{
                        transform: `scale(${calendarIsVisible ? 0.75 : 1}) translateY(${calendarIsVisible ? '-30px' : '0'})`,
                        transition: 'transform 0.35s ease-in-out',
                    }}
                >
                    <div
                        className={styles.button_container}
                        style={{
                            boxShadow: `0 0 ${calendarIsVisible || isHovered ? 0 : 10}px #00000033`,
                            transition: 'box-shadow 0.3s ease',
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <TextField
                            className={styles.input_aria}
                            id="standard-basic"
                            label="Destination"
                            variant="standard"
                            value={destination}
                            onChange={handleDestinationChange}
                        />

                        <Button
                            startIcon={<DateRangeRoundedIcon />}
                            className={styles.button_check_in}
                            onClick={() => {
                                goHome();
                                if (!searchResults) {
                                    toggleCalendarVisibility();
                                }
                            }}
                            disabled={calendarIsVisible}
                            key="two"
                        >
                            Check In
                        </Button>

                        <Button
                            startIcon={<SearchRoundedIcon />}
                            className={styles.button_search}
                            onClick={() => {
                                toggleCalendarVisibility();
                                handleSearchResultsOpen();
                                setCalendarIsVisible(false); // Close the calendar when the button is clicked
                            }}
                            style={{
                                background: calendarIsVisible ? '#000000' : '#f5f5f5',
                                color: calendarIsVisible ? '#FFFFFF' : '#ccc',
                                textTransform: 'capitalize',
                            }}
                            key="three"
                            disabled={!calendarIsVisible}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
    );
}
