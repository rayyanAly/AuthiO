import { useState, useEffect } from 'react';
import {
	Heading,
	Text,
	Button,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const [showOtpInput, setShowOtpInput] = useState(false);
	const [otp, setOtp] = useState('');
	const [isVerified, setIsVerified] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	// send OTP
	const handleSendOtp = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			await axios.post('/api/users/send-otp', {}, config);
			toast({
				title: 'OTP sent to your email.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			setShowOtpInput(true);
		} catch (error) {
			toast({
				title: 'Failed to send OTP.',
				description: error.response?.data?.message || 'Try again.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	// verify OTP
	const handleVerifyOtp = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			await axios.post('/api/users/verify-otp', { otp }, config);
			toast({
				title: 'Account verified!',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			setIsVerified(true);
			setShowOtpInput(false);
		} catch (error) {
			toast({
				title: 'Invalid OTP.',
				description: error.response?.data?.message || 'Try again.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Heading as='h2' mb='4' fontSize='2xl'>
				Welcome
			</Heading>
			{userInfo && (
				<Text fontSize='lg' color='gray.600'>
					<strong>{userInfo.name}</strong>!
				</Text>
			)}

			{!isVerified && (
				<Stack mt='6' spacing='4' maxW='400px'>
					<Button colorScheme='teal' onClick={handleSendOtp}>
						Verify Your Account
					</Button>

					{showOtpInput && (
						<>
							<Input
								placeholder='Enter OTP'
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
							/>
							<Button colorScheme='blue' onClick={handleVerifyOtp}>
								Submit OTP
							</Button>
						</>
					)}
				</Stack>
			)}

			{isVerified && (
				<Text mt='6' color='green.500' fontWeight='bold'>
					Account is verified ✅
				</Text>
			)}
		</>
	);
};

export default HomeScreen;
