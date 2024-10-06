
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../src/styles/index.module.css'; // Import as a CSS module
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from Framer Motion
import Image from 'next/image';

import Button from "@mui/material/Button";
import MainButtons from '../components/MainButtons';

import PersonIcon from '@mui/icons-material/Person';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';


// import BorderLinearProgress from '../components/BorderLinearProgress';
import LoginSuccessful from '../components/LoginSuccessful';
import InspirationImages from '../components/InspirationImages';
import PropertySearchList from '../components/PropertySearchList';

import ModalLogin from '../components/ModalLogin';
import ModalUserBookings from '../components/ModalUserBookings';
import ModalOwnerBookings from '../components/ModalOwnerBookings';



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
    // const [BorderLinearProgress_Visible, setBorderLinearProgress_Visible] = useState(true);
    const [open, setOpen] = useState(false);

    const [openAccount, setOpenAccount] = useState(false);
    const [openOwnerAccount, setOpenOwnerAccount] = useState(false);

    const [searchResults, setSearchResults] = useState(false);
    const [showAll, setShowAll] = useState(false); // Track whether "show all" is clicked
    const [email, setEmail] = React.useState('');

    const [isHovered_My_bookings, setIsHovered_My_bookings] = useState(false);
    const [isHovered_Login, setIsHovered_Login] = useState(false);



    const router = useRouter(); // For redirection if needed

    const openMyAccount = () => {
        router.push('/myAccount'); // Navigate to the home page ("/")
    };

    useEffect(() => {
        if (isLogin) { handleClose(); }
    }, [isLogin]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenAccount = () => setOpenAccount(true);
    const handleCloseAccount = () => setOpenAccount(false);

    const handleOpenOwner = () => {
        if (isLogin) {
            setOpenOwnerAccount(true)
        }
    };
    const handleCloseOwner = () => setOpenOwnerAccount(false);

    const handleSearchResultsOpen = () => setSearchResults(true);
    const handleSearchResultsClose = () => setSearchResults(false);

    const handleLogOut = () => {
        setIsLogin(false);
        setName(''); // Clear the user's name on logout
    };

    const handleShowAll = (e) => {
        e.preventDefault(); // Prevent the link from refreshing the page
        setShowAll(true); // Trigger showing all properties
    };
    const handle_NOT_ShowAll = () => {
        setShowAll(false); // Trigger showing all properties
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

    // useEffect(() => {
    //     setTimeout(() => {
    //         setBorderLinearProgress_Visible(false);
    //     }, 800);
    // }, []);

    const handleMouseEnter_My_bookings = () => {
        setIsHovered_My_bookings(true);
    };
    const handleMouseLeave_My_bookings = () => {
        setIsHovered_My_bookings(false);
    };

    const handleMouseEnter_Login = () => {
        setIsHovered_Login(true);
    };
    const handleMouseLeave_Login = () => {
        setIsHovered_Login(false);
    };

    return (
        <div
            style={{
                backgroundSize: 'cover',
                minHeight: 480
            }}
        >
            {/* {BorderLinearProgress_Visible && <BorderLinearProgress />} */}

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
                        initial={{ opacity: 0, translateY: 43, translateX: 0, scale: 1 }}
                        animate={{ opacity: 1, translateY: 43, translateX: 0, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0 }}
                        style={{ paddingLeft: 33 }}
                    // 
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
                            handleSearchResultsOpen={handleSearchResultsOpen}
                            handleSearchResultsClose={handleSearchResultsClose}

                            handle_NOT_ShowAll={handle_NOT_ShowAll}
                            searchResults={searchResults}
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
                                    className={styles.button_my_account}

                                    style={{
                                        boxShadow: `0 0 ${isHovered_My_bookings ? 0 : 10}px #CCCCCC`,
                                        border: `0.3px solid ${isHovered_My_bookings ? '#000000' : '#FF385C'}`,
                                        background: isHovered_My_bookings ?'#EFEFEF' : '#fff',

                                        transition: 'box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease',
                                    }}

                                    onMouseEnter={handleMouseEnter_My_bookings}
                                    onMouseLeave={handleMouseLeave_My_bookings}
                                >
                                    My Bookings
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
                            borderRadius: 36,

                            boxShadow: `0 0 ${isHovered_Login ? 0 : 10}px #CCCCCC`,
                            transition: 'box-shadow 0.3s ease',

                        }}

                        onMouseEnter={handleMouseEnter_Login}
                        onMouseLeave={handleMouseLeave_Login}
                    >
                        <div
                            className={styles.button_list_item}
                            style={{
                                // position: 'relative',
                                // top: -11,
                            }}
                            onClick={handleOpenOwner}
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
                            <div>{isLogin ? 'LogOut' : 'LogIn'}</div>
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
            <ModalUserBookings
                handleCloseAccount={handleCloseAccount}
                openAccount={openAccount}
                name={name}
            />
            <ModalOwnerBookings
                handleCloseOwner={handleCloseOwner}
                openOwnerAccount={openOwnerAccount}
                name={name}
            />


            {
                calendarIsVisible && (
                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 46, scale: 1 }}
                        animate={{ opacity: 1, translateY: 68, scale: 1.3 }}
                        exit={{ opacity: 0, translateY: -30 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        style={{ maxWidth: '85%', paddingLeft: '11%' }}
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
            {
                searchResults
                    ?
                    <PropertySearchList
                        name={name}
                        destination={destination}
                        handleSearchResultsClose={handleSearchResultsClose}
                        showAll={showAll}
                        setShowAll={setShowAll}
                        handleShowAll={handleShowAll}
                        handle_NOT_ShowAll={handle_NOT_ShowAll}
                        isLogin={isLogin}
                        handleSearchResultsOpen={handleSearchResultsOpen}
                        formattedStartDate={formattedStartDate}
                        formattedEndDate={formattedEndDate}
                        lengthOfNights={lengthOfNights}
                        calendarIsVisible={calendarIsVisible}
                    />
                    :
                    <InspirationImages
                        calendarIsVisible={calendarIsVisible}
                    // destination={destination}
                    // formattedStartDate={formattedStartDate}
                    // formattedEndDate={formattedEndDate}
                    // lengthOfNights={lengthOfNights}
                    />

            }

        </div >
    );
}


