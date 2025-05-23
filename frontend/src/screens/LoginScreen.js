import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Spacer,
	Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Link as RouterLink,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	let redirect = searchParams.get('redirect') || '/home';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<Flex w='full' alignItems='center' justifyContent='center' py='5'>
			<FormContainer>
				<Heading as='h1' mb='8' fontSize='3xl'>
					Login
				</Heading>

				{error && <Message type='error'>{error}</Message>}

				<form onSubmit={submitHandler}>
					<FormControl id='email'>
						<FormLabel htmlFor='email'>Email address</FormLabel>
						<Input
							id='email'
							type='email'
							placeholder='username@domain.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

					<FormControl id='password'>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							id='password'
							type='password'
							placeholder='************'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>

					<Button type='submit' colorScheme='teal' mt='4' isLoading={loading}>
						Login
					</Button>
				</form>

				<Flex pt='10'>
					<Text fontWeight='semibold'>
						New User?{' '}
						<Link as={RouterLink} to='/register'>
							Click here to register
						</Link>
					</Text>
				</Flex>

				{/* Forgot Password Link */}
				<Flex pt='3'>
					<Text fontWeight='semibold'>
						Forgot your password?{' '}
						<Link as={RouterLink} to='/forgot-password'>
							Click here to reset
						</Link>
					</Text>
				</Flex>
				
			</FormContainer>
		</Flex>
	);
};

export default LoginScreen;
