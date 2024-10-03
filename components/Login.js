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

function CustomEmailField() {
    return (
        <TextField
            id="input-with-icon-textfield"
            label="Username"
            name="email"
            type="email"
            size="small"
            required
            fullWidth
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

function CustomPasswordField() {
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

function CustomButton() {
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
        >
            Sign In
        </Button>
    );
}

function ForgotPasswordLink() {
    return (
        <Link href="/" variant="body2">
            Forgot password?
        </Link>
    );
}

export default function SlotsSignIn() {
    const theme = useTheme();
    const router = useRouter(); // Initialize useRouter for redirection

    // Function to handle redirect to sign-up page
    const handleSignUpRedirect = (event) => {
        event.preventDefault(); // Prevent default link behavior
        router.push("/signUp"); // Redirect to the sign-up page
    };

    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={(provider, formData) =>
                    alert(
                        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
                    )
                }
                slots={{
                    emailField: CustomEmailField,
                    passwordField: CustomPasswordField,
                    submitButton: CustomButton,
                    signUpLink: () => (
                        <Link href="#" variant="body2" onClick={handleSignUpRedirect}>
                            Sign up
                        </Link>
                    ), // Call handleSignUpRedirect when the link is clicked
                    forgotPasswordLink: ForgotPasswordLink,
                }}
                providers={providers}
            />
        </AppProvider>
    );
}
