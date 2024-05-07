import { Input } from "antd";

const { TextArea } = Input;

const TextInput = ({ isPassword, isTextArea, ...props }) => {
    const Component = isPassword ? Input.Password : isTextArea ? TextArea : Input;
    return <Component {...props} />;
};

export default TextInput;
