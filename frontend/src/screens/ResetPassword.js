// src/components/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { resetPassword } from '../actions/userActions';
import { Button, FormControl, FormLabel, Heading, Input, Flex, Spacer, Text, Link, useToast } from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast

  const resetPasswordState = useSelector((state) => state.resetPassword);
  const { loading, error, success, } = resetPasswordState;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password));
  };

  // Show success toast and redirect after a successful password reset
  useEffect(() => {
    if (success) {
      toast({
        title: 'Password successfully changed.',
        description: 'You can now log in with your new password.',
        status: 'success',
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });

      // Redirect after a short delay to allow user to see the toast
      setTimeout(() => {
        navigate('/login');
      }, 5000); // Wait 5 seconds before redirecting
    }
  }, [success, navigate, toast]);

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <Heading as='h1' mb='8' fontSize='3xl'>
          Reset Password
        </Heading>

        {error && <Message type='error'>{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id='password'>
            <FormLabel htmlFor='password'>New Password</FormLabel>
            <Input
              id='password'
              type='password'
              placeholder='Enter your new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Spacer h='3' />

          <Button type='submit' colorScheme='teal' mt='4' isLoading={loading}>
            Reset Password
          </Button>
        </form>

        <Flex pt='10'>
          <Text fontWeight='semibold'>
            Remembered your password?{' '}
            <Link as={RouterLink} to='/login'>
              Click here to login
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default ResetPassword;
