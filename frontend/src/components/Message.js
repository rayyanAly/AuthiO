import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Message = ({ children, type = 'info' }) => {
	return (
		<Alert status={type}>
			<AlertIcon />
			<AlertTitle>{children}</AlertTitle>
		</Alert>
	);
};

export default Message;
