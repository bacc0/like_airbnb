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
     Box,
     Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

export default function CustomSignIn({ isLogin, setIsLogin, setName }) {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [showPassword, setShowPassword] = React.useState(false);

     const handleLogin = (e) => {
          e.preventDefault();
          fetch('https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Users.json')
               .then(response => response.json())
               .then(data => {
                    let loggedIn = false;
                    for (let key in data) {
                         const user = data[key];
                         if (user.Credentials && 
                             user.Credentials.Email === email && 
                             user.Credentials.Password === password) {
                              loggedIn = true;
                              setName(key);
                              break;
                         }
                    }

                    if (loggedIn) {
                         setIsLogin(true);
                    } else {
                         alert('Invalid email or password. Please try again.');
                    }
               })
               .catch(error => {
                    console.error('Error fetching user data:', error);
               });
     };

     return (
          <Box sx={{ 
               width: '100%', 
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               p: 3
          }}>
               {/* Lock Icon with black background and white icon */}
               <Box sx={{ 
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
               }}>
                    <LockIcon sx={{ fontSize: 24, color: '#fff' }} />
               </Box>

               <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
                    Sign in
               </Typography>
               <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Welcome user, please sign in to continue
               </Typography>

               <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                         margin="normal"
                         required
                         fullWidth
                         id="email"
                         label="Email"
                         name="email"
                         autoComplete="email"
                         autoFocus
                         size="small"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         InputProps={{
                              startAdornment: (
                                   <InputAdornment position="start">
                                        <AccountCircle fontSize="small" />
                                   </InputAdornment>
                              ),
                         }}
                    />

                    <FormControl margin="normal" required fullWidth variant="outlined" size="small">
                         <InputLabel htmlFor="password">Password</InputLabel>
                         <OutlinedInput
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              endAdornment={
                                   <InputAdornment position="end">
                                        <IconButton
                                             aria-label="toggle password visibility"
                                             onClick={() => setShowPassword(!showPassword)}
                                             onMouseDown={(e) => e.preventDefault()}
                                             edge="end"
                                             size="small"
                                        >
                                             {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                   </InputAdornment>
                              }
                              label="Password"
                         />
                    </FormControl>

                    <Button
                         type="submit"
                         fullWidth
                         variant="contained"
                         sx={{
                              mt: 3,
                              mb: 2,
                              height: 60,
                              borderRadius: 50,
                              backgroundColor: '#000',
                              '&:hover': {
                                   backgroundColor: '#333',
                              }
                         }}
                    >
                         Sign In
                    </Button>

                    <Box sx={{ 
                         display: 'flex', 
                         justifyContent: 'space-between',
                         mt: 1
                    }}>
                         <Link href="/signUp" variant="body2">
                              Sign up
                         </Link>
                    </Box>
               </Box>

               <Typography 
                    variant="body2" 
                    color="error" 
                    align="center" 
                    sx={{ mt: 2 }}
               >
                    {isLogin ? 'Login successful!' : 'Not logged in'}
               </Typography>
          </Box>
     );
}