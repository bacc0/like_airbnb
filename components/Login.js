import * as React from 'react';
import {
     Button,
     FormControl,
     InputLabel,
     OutlinedInput,
     TextField,
     InputAdornment,
     Link,
     IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { useRouter } from "next/router"; // Import Next.js useRouter

const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomEmailField({ email, setEmail }) {
     return (
          <TextField
               id="input-with-icon-textfield"
               label="Email"
               name="email"
               type="email"
               size="small"
               required
               fullWidth
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               InputProps={{
                    startAdornment: (
                         <InputAdornment position="start">
                              <AccountCircle fontSize="inherit" />
                         </InputAdornment>
                    ),
               }}
               variant="outlined"
          />
     );
}

function CustomPasswordField({ password, setPassword }) {
     const [showPassword, setShowPassword] = React.useState(false);

     const handleClickShowPassword = () => setShowPassword((show) => !show);

     const handleMouseDownPassword = (event) => {
          event.preventDefault();
     };

     return (
          <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
               <InputLabel size="small" htmlFor="outlined-adornment-password">
                    Password
               </InputLabel>
               <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                         <InputAdornment position="end">
                              <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={handleClickShowPassword}
                                   onMouseDown={handleMouseDownPassword}
                                   edge="end"
                                   size="small"
                              >
                                   {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                              </IconButton>
                         </InputAdornment>
                    }
                    label="Password"
               />
          </FormControl>
     );
}

function CustomButton({ handleLogin }) {
     return (
          <Button
               type="submit"
               variant="outlined"
               color="info"
               size="medium"
               disableElevation
               fullWidth
               sx={{ my: 2 }}
               style={{
                    background: '#000000',
                    color: '#ffffff',
                    height: 60,
                    borderRadius: 50,
               }}
               onClick={handleLogin}
          >
               Sign In
          </Button>
     );
}

function ForgotPasswordLink() {
     return (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
               <Link href="/" variant="body2">
                    Forgot password?
               </Link>
               <Link href="/signUp" variant="body2">
                    Sign up
               </Link>
          </div>
     );
}

export default function SlotsSignIn({ open, handleClose, isLogin, setIsLogin, name, setName }) {
     const theme = useTheme();
     const router = useRouter(); // Initialize useRouter for redirection
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');

     const handleLogin = () => {
          // Fetch user data (this should be done in a real app via an API call)
          fetch('https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Users.json')
               .then(response => response.json())
               .then(data => {
                    // Check if the entered email and password match any user in the fetched data
                    let loggedIn = false;

                    for (let key in data) {
                         const user = data[key];

                         if (user.Credentials && user.Credentials.Email === email && user.Credentials.Password === password) {
                              loggedIn = true;
                              setName(key); // Set the name to the user's key (name)
                              break;
                         }
                    }

                    if (loggedIn) {
                         setIsLogin(true);  // Set the login state to true
                         // handleClose(); // Close the modal on successful login
                         // router.push('/home'); // Redirect to the home page
                    } else {
                         alert('Invalid email or password. Please try again.'); // Show alert for incorrect login
                    }
               })
               .catch(error => {
                    console.error('Error fetching user data:', error);
               });
     };

     return (
          <AppProvider theme={theme}>
               <SignInPage
                    signIn={(provider, formData) =>
                         alert(
                              `Sign In Successful! Welcome back ${email}`,
                         )
                    }
                    slots={{
                         emailField: () => <CustomEmailField email={email} setEmail={setEmail} />,
                         passwordField: () => <CustomPasswordField password={password} setPassword={setPassword} />,
                         submitButton: () => <CustomButton handleLogin={handleLogin} />,
                         forgotPasswordLink: ForgotPasswordLink,
                    }}
                    providers={providers}
               />

               {/* Display login status */}
               <div style={{ textAlign: 'center', marginTop: '20px', color: '#FF385C' }}>
                    {isLogin ? 'Login successful!' : 'Not logged in'}
               </div>
          </AppProvider>
     );
}
