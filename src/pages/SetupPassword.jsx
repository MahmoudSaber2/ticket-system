import { Form, Input, Result } from "antd";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Buttons } from "../components/common";

const SetupPassword = () => {
    const [params] = useSearchParams();
    const setup = useMutation({ mutationFn: (passwords) => axios.post("account-invitations/setup", { token: params.get("token"), ...passwords }, { skipAuth: true, skipRefresh: true }) });
    if (setup.isSuccess) return <Result status="success" title="Password created" subTitle="You can now sign in." />;

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Form layout="vertical" className="w-full max-w-md rounded-xl border bg-white p-6 shadow" onFinish={(values) => setup.mutate(values)}>
                <h1 className="mb-5 text-2xl font-semibold">Set your password</h1>
                {setup.error && <p className="mb-4 text-red-700">This invitation is invalid or expired.</p>}
                <Form.Item name="password" label="Password" rules={[{ required: true, min: 8 }]}><Input.Password /></Form.Item>
                <Form.Item name="password_confirmation" label="Confirm password" dependencies={["password"]} rules={[{ required: true }, ({ getFieldValue }) => ({ validator: (_, value) => !value || getFieldValue("password") === value ? Promise.resolve() : Promise.reject(new Error("Passwords do not match")) })]}><Input.Password /></Form.Item>
                <Buttons block type="primary" htmlType="submit" loading={setup.isPending}>Create password</Buttons>
            </Form>
        </main>
    );
};

export default SetupPassword;
