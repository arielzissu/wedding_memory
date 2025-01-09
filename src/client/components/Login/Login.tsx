import React from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { saveToLocalStorage } from '../../utils/localStorage';

export const USER_EMAIL_KEY = 'userEmail';
const clientId = process.env.GOOGLE_CLIENT_ID;

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: GoogleLoginModalProps) => {
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decodedToken: { email: string } & JwtPayload = jwtDecode(
        credentialResponse.credential
      );
      saveToLocalStorage(USER_EMAIL_KEY, decodedToken.email);
    } catch (error) {
      console.error('Error decoding token:', error);
    } finally {
      onClose();
    }
  };

  const handleLoginFailure = () => {
    console.error('Login Failed');
    // TODO: handle failed to login
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign in with Google</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mt={2}
        >
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </GoogleOAuthProvider>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
