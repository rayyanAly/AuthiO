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
			<Header />
			<Flex
				as='main'
				mt='72px'
				direction='column'
				py='6'
				px='6'
				bgColor='gray.200'>
				<Routes>
					<Route path='/' element={<HomeScreen />} />
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
       				<Route path="/reset-password/:token" element={<ResetPassword />} />
					<Route path='/profile' element={<ProfileScreen />} />
					<Route path='/admin/userlist' element={<UserListScreen />} />
					<Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
				</Routes>
			</Flex>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
