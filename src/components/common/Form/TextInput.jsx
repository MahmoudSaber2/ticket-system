import { Input } from "antd";

const TextInput = ({ isPassword, ...props }) => {
	const Component = isPassword ? Input.Password : Input;
	return <Component {...props} />;
};

export default TextInput;
