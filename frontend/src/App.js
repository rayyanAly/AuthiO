import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';

const App = () => {
	return (
		<BrowserRouter>
			<Flex direction="column" minH="100vh">
				<Header />
				<Flex
					as="main"
					mt="72px"
					direction="column"
					py="6"
					px="6"
					bgColor="gray.200"
					flex="1"
				>
					<Routes>
						<Route path="/" element={<LoginScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/home" element={<HomeScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset-password/:token" element={<ResetPassword />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/admin/userlist" element={<UserListScreen />} />
						<Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
					</Routes>
				</Flex>
				<Footer />
			</Flex>
		</BrowserRouter>
	);
};

export default App;
