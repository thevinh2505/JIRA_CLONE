import { notification } from "antd";
export const notifyFunction = (type, message, description) => {
	notification.config({
		duration: 1,
	})
	return notification[type]({
		message: message,
		description: description,
	});
};
