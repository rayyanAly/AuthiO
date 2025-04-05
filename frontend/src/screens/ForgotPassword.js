import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../actions/userActions';
import { Link as RouterLink } from 'react-router-dom'; 
import { Button, FormControl, FormLabel, Heading, Input, Flex, Spacer, Text, Link, useToast } from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSentTime, setOtpSentTime] = useState(null); // Track OTP sent time
  const [countdown, setCountdown] = useState(null); // Countdown timer state
  const dispatch = useDispatch();
  const toast = useToast();

  const forgotPasswordState = useSelector((state) => state.forgotPassword);
  const { loading, error, success, message } = forgotPasswordState;

  // If OTP was sent recently, prevent sending again
  const isOtpRecentlySent = otpSentTime && Date.now() - otpSentTime < 5 * 60 * 1000; // 5 minutes

  const submitHandler = (e) => {
    e.preventDefault();

    if (isOtpRecentlySent) {
      toast({
        title: "OTP Already Sent",
        description: `You did not receive the OTP? Try again in ${Math.ceil(countdown / 60)} minute${countdown / 60 > 1 ? 's' : ''}.`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(forgotPassword(email));
    setOtpSentTime(Date.now()); // Track the time OTP was sent
  };

  useEffect(() => {
    if (otpSentTime) {
      // Initialize countdown timer (5 minutes = 300 seconds)
      setCountdown(5 * 60);

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer); // Stop the timer when it reaches 0
            window.location.reload(); // Refresh the page after 5 minutes
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      // Clean up the timer when component unmounts
      return () => clearInterval(timer);
    }
  }, [otpSentTime]);

  useEffect(() => {
    if (success) {
      toast({
        title: "OTP Sent Successfully",
        description: "Please check your email for the OTP.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [success, toast]);

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Forgot Password
        </Heading>

        {success && <Message type="info">{message}</Message>}
        {error && <Message type="error">{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="email">
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <Button 
            type="submit" 
            colorScheme="teal" 
            mt="4" 
            isLoading={loading} 
            disabled={isOtpRecentlySent}
          >
            Reset Password
          </Button>
        </form>

        {isOtpRecentlySent && countdown > 0 && (
          <Text mt="4" fontSize="sm" color="gray.500">
            Try again in {Math.floor(countdown / 60)} minute{Math.floor(countdown / 60) > 1 ? 's' : ''} and {countdown % 60} second{countdown % 60 > 1 ? 's' : ''}.
          </Text>
        )}

        <Flex pt="10">
          <Text fontWeight="semibold">
            Remembered your password?{' '}
            <Link as={RouterLink} to="/login">
              Click here to login
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default ForgotPassword;
