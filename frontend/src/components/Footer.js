import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Flex as="footer" justifyContent="center" py="5" bg="gray.100" mt="auto">
			<Text fontSize="sm" color="gray.600">
				&copy; {currentYear}. AuthiO. All Rights Reserved.
			</Text>
		</Flex>
	);
};

export default Footer;
