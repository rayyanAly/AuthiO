import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Box,
	Stack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderMyList = useSelector((state) => state.orderMyList);
	const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, navigate, user, userInfo, success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ name, email, password }));
			dispatch({ type: USER_DETAILS_RESET });
		}
	};

	return (
		<Stack spacing={10} py={5} direction={{ base: 'column', md: 'row' }}>
			{/* Profile Form */}
			<Flex w={{ base: 'full', md: '50%' }} alignItems='center' justifyContent='center' py={5}>
				<FormContainer>
					<Heading as='h1' mb={8} fontSize='3xl' textAlign='center'>
						User Profile
					</Heading>

					{error && <Message type='error'>{error}</Message>}
					{message && <Message type='error'>{message}</Message>}

					<form onSubmit={submitHandler}>
						<Stack spacing={3}>
							<FormControl id='name'>
								<FormLabel>Your Name</FormLabel>
								<Input type='text' placeholder='Your full name' value={name} onChange={(e) => setName(e.target.value)} />
							</FormControl>

							<FormControl id='email'>
								<FormLabel>Email address</FormLabel>
								<Input type='email' placeholder='username@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} />
							</FormControl>

							<FormControl id='password'>
								<FormLabel>Password</FormLabel>
								<Input type='password' placeholder='************' value={password} onChange={(e) => setPassword(e.target.value)} />
							</FormControl>

							<FormControl id='confirmPassword'>
								<FormLabel>Confirm Password</FormLabel>
								<Input type='password' placeholder='************' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
							</FormControl>

							<Button type='submit' colorScheme='teal' mt={4} isLoading={loading}>Update</Button>
						</Stack>
					</form>
				</FormContainer>
			</Flex>

			{/* Orders Table */}
			<Box w={{ base: 'full', md: '50%' }}>
				<Heading as='h2' mb={4} textAlign='center'>My Orders</Heading>

				{loadingOrders ? <Loader /> : errorOrders ? <Message type='error'>{errorOrders}</Message> : (
					<Flex overflowX="auto">
					<Table variant="striped" size={{ base: "sm", md: "md" }}>
					  <Thead>
						<Tr>
						  <Th>ID</Th>
						  <Th>DATE</Th>
						  <Th>TOTAL</Th>
						  <Th>PAID</Th>
						  <Th>DELIVERED</Th>
						  <Th></Th>
						</Tr>
					  </Thead>
					  <Tbody>
						{orders.map((order) => (
						  <Tr key={order._id}>
							<Td>{order._id}</Td>
							<Td>{new Date(order.createdAt).toDateString()}</Td>
							<Td>₹{order.totalPrice}</Td>
							<Td>
							  {order.isPaid ? (
								new Date(order.paidAt).toDateString()
							  ) : (
								<Icon as={IoWarning} color="red" />
							  )}
							</Td>
							<Td>
							  {order.isDelivered ? (
								new Date(order.deliveredAt).toDateString()
							  ) : (
								<Icon as={IoWarning} color="red" />
							  )}
							</Td>
							<Td>
							  <Button
								as={RouterLink}
								to={`/order/${order._id}`}
								colorScheme="teal"
								size="sm"
							  >
								Details
							  </Button>
							</Td>
						  </Tr>
						))}
					  </Tbody>
					</Table>
				  </Flex>
				  
				)}
			</Box>
		</Stack>
	);
};

export default ProfileScreen;
