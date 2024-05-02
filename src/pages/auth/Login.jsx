import React from "react";
import { Form } from "antd";

import { Buttons, TextInput } from "../../components/common";
import { useLogin } from "../../hooks/auth/useLoginHook";

const Login = () => {
    const [form] = Form.useForm();
    const { mutate, isPending } = useLogin();

    return (
        <Form
            form={form}
            name="login"
            layout="vertical"
            className="w-full max-w-[500px] border rounded-lg p-5"
            onFinish={(values) => mutate(values)}>
            <h1 className="text-3xl font-bold mb-5 text-center">Login</h1>
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please input your username!" }]}>
                <TextInput
                    placeholder="Username"
                    size="large"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input your password!" }]}>
                <TextInput
                    placeholder="Password"
                    size="large"
                    isPassword={true}
                />
            </Form.Item>

            <Buttons
                loading={isPending}
                className="w-full"
                type="primary"
                size="large"
                htmlType="submit">
                Login
            </Buttons>
        </Form>
    );
};

export default Login;
