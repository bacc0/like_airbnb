
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../src/styles/index.module.css'; // Import as a CSS module
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from Framer Motion
import Image from 'next/image';

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from 'next/link'; // Make sure to use Next.js Link
import CardAdver from '../components/CardAdver';
import MainButtons from '../components/MainButtons';

import ButtonLogin from '../components/ModalLogin';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeIcon from '@mui/icons-material/AddHome';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import BorderLinearProgress from '../components/BorderLinearProgress';
import ModalLogin from '../components/ModalLogin';
import ModalAccount from '../components/ModalAccount';
import LoginSuccessful from '../components/LoginSuccessful';
import InspirationImages from '../components/InspirationImages';

export default function Index() {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState(''); // State for user's name
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [destination, setDestination] = useState('');
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [lengthOfNights, setLengthOfNights] = useState(0);
    const [calendarIsVisible, setCalendarIsVisible] = useState(false);
    const [BorderLinearProgress_Visible, setBorderLinearProgress_Visible] = useState(true);
    const [open, setOpen] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);

    const router = useRouter(); // For redirection if needed

    const openMyAccount = () => {
        router.push('/myAccount'); // Navigate to the home page ("/")
    };


    useEffect(() => {
        if (isLogin) {
            handleClose();
        }
    }, [isLogin]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenAccount = () => setOpenAccount(true);
    const handleCloseAccount = () => setOpenAccount(false);

    const handleLogOut = () => {
        setIsLogin(false);
        setName(''); // Clear the user's name on logout
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setDateRange([start, end]); // Update both start and end dates

        if (start && end) {
            setFormattedStartDate(start.toLocaleDateString());
            setFormattedEndDate(end.toLocaleDateString());

            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setLengthOfNights(nights);
        } else {
            setFormattedStartDate('');
            setFormattedEndDate('');
            setLengthOfNights(0);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setBorderLinearProgress_Visible(false);
        }, 800);
    }, []);



    return (
        <div
            style={{
                backgroundSize: 'cover',
                minHeight: 480
            }}
        >

            {BorderLinearProgress_Visible && <BorderLinearProgress />}

            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{
                    background: '#ffffff',
                    boxShadow: '0 0 0',
                    height: 100
                }}
                    position="static"
                >
                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 43, translateX: 33, scale: 1 }}
                        animate={{ opacity: 1, translateY: 43, translateX: 33, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0 }}
                        style={{ top: 45, left: 45 }}
                    >
                        <Image
                            src="/alibmb2.svg"
                            width={130}
                            height={60}
                            alt="Logo"
                        />
                    </motion.div>


                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: -66, scale: 0.6 }}
                        animate={{ opacity: 1, translateY: -66, scale: 1 }}
                        transition={{ duration: 0.35, delay: 1.1, type: "spring", stiffness: 200 }}
                        style={{ position: "relative", top: 36 }}
                    >
                        <MainButtons
                            calendarIsVisible={calendarIsVisible}
                            setCalendarIsVisible={setCalendarIsVisible}
                            destination={destination}
                            setDestination={setDestination}
                            isLogin={isLogin}
                        />
                    </motion.div>

                    <AnimatePresence>
                        {isLogin && (

                            <motion.div
                                initial={{ opacity: 0, translateY: 43, translateX: 33, scale: 0 }}
                                animate={{ opacity: 1, translateY: 43, translateX: 33, scale: 1 }}
                                transition={{ duration: 0.3, delay: .5, type: "spring", stiffness: 200 }}
                                exit={{ opacity: 0, scale: 0 }}

                                style={{
                                    position: 'absolute', top: 12, left: 140,
                                    cursor: 'pointer',
                                }}

                            >
                                <Button
                                    onClick={handleOpenAccount}
                                    className={styles.button_my_account}>
                                    My account
                                </Button>
                            </motion.div>

                        )}
                    </AnimatePresence>

                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 0, scale: 1 }}
                        animate={{ opacity: 1, translateY: 0, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0 }}
                        style={{
                            position: "absolute",
                            top: 46,
                            right: 45,
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 0 10px #bdbdbd',
                            borderRadius: 36
                        }}
                    >
                        <div
                            className={styles.button_list_item}
                            style={{
                                // position: 'relative',
                                // top: -11,
                            }}
                        >
                            <Image

                                src="/rentout.svg"
                                width={80}
                                height={36}
                                alt="Rent out button"
                            />
                        </div>
                        <Button
                            onClick={isLogin ? handleLogOut : handleOpen}
                            className={styles.button_account}
                            // style={{ marginLeft: 20 }}
                            variant="outlined" startIcon={<PersonIcon />}
                        >
                            <div>{isLogin ? 'Log Out' : 'My Account'}</div>
                            <div
                                style={{
                                    fontSize: 10,
                                    width: isLogin ? 40 : 0,
                                    marginLeft: 6,
                                    overflow: 'hidden',         // Hide any overflowed content
                                    textOverflow: 'ellipsis',   // Show "..." if the text is too long
                                    whiteSpace: 'nowrap'        // Prevent the text from wrapping to the next line
                                }}
                            >
                                {isLogin ? `${name}` : ''}
                            </div>
                        </Button>
                    </motion.div>
                </AppBar>
            </Box>
            {isLogin && <LoginSuccessful />}
            <ModalLogin
                handleClose={handleClose}
                open={open}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                name={name} // Pass the setName function to ModalLogin
                setName={setName} // Pass the setName function to ModalLogin
            />
            <ModalAccount
                handleCloseAccount={handleCloseAccount}
                openAccount={openAccount}
                // isLogin={isLogin}
                // setIsLogin={setIsLogin}
                name={name} // Pass the setName function to ModalLogin
            // setName={setName} // Pass the setName function to ModalLogin
            />


            {
                calendarIsVisible && (
                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 46, scale: 1 }}
                        animate={{ opacity: 1, translateY: 68, scale: 1.3 }}
                        exit={{ opacity: 0, translateY: -30 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                    >
                        <div className={styles.custom_date_picker}>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                inline
                                minDate={new Date()}
                                maxDate={new Date().setDate(new Date().getDate() + 180)}
                                monthsShown={2}
                                calendarClassName={styles.custom_calendar}
                            />
                        </div>
                    </motion.div>
                )
            }
            <InspirationImages
                calendarIsVisible={calendarIsVisible}
                destination={destination}
                formattedStartDate={formattedStartDate}
                formattedEndDate={formattedEndDate}
                lengthOfNights={lengthOfNights}
            />

        </div >
    );
}


