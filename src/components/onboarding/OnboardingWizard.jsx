import { useState } from "react";
import { Alert, Button, Form, Result, Spin, Steps } from "antd";

import { useOnboardCompany, useOnboardingOptions } from "../../hooks/dashboard/useOnboarding";
import CompanyStep from "./CompanyStep";
import BranchesStep from "./BranchesStep";
import { OwnerStep, TeamStep } from "./AccountsStep";
import { onboardingPayload } from "./onboardingPayload";

const stepFields = [["company"], ["branches"], ["owner"], ["accounts"]];
const onboardingError = (error) => {
    const message = error?.response?.data?.message;
    return typeof message === "string" ? message : Object.values(message || {}).flat().join(" ") || "Correct the fields and retry.";
};

const OnboardingWizard = () => {
    const [form] = Form.useForm();
    const [step, setStep] = useState(0);
    const options = useOnboardingOptions();
    const onboarding = useOnboardCompany();
    const branchless = Form.useWatch(["company", "usesBranches"], form) === false;
    const branches = Form.useWatch("branches", form) || [];

    if (options.isLoading) return <Spin size="large" />;
    if (options.error) return <Alert type="error" message="Onboarding options unavailable" showIcon />;
    if (onboarding.isSuccess) return <Result status="success" title="Company onboarded" subTitle={`${onboarding.data.invitationCount} invitations queued.`} extra={<Button onClick={() => { form.resetFields(); onboarding.reset(); setStep(0); }}>Onboard another</Button>} />;

    const panels = [
        <CompanyStep key="company" />,
        <BranchesStep key="branches" branchless={branchless} />,
        <OwnerStep key="owner" roles={options.data.roles} />,
        <TeamStep key="team" roles={options.data.roles} branches={branchless ? [] : branches} />,
        <pre key="review" className="max-h-96 overflow-auto rounded-lg bg-slate-50 p-4 text-sm">{JSON.stringify(form.getFieldsValue(true), null, 2)}</pre>,
    ];
    const next = async () => {
        await form.validateFields(stepFields[step] || []);
        setStep((current) => current + 1);
    };

    return (
        <section className="rounded-xl border bg-white p-5 shadow-sm">
            <Steps current={step} items={["Company", "Branches", "Owner", "Team", "Review"].map((title) => ({ title }))} responsive />
            {onboarding.error && <Alert className="mt-4" type="error" showIcon message="Onboarding failed" description={onboardingError(onboarding.error)} />}
            <Form form={form} layout="vertical" preserve className="mt-6" initialValues={{ branches: [], accounts: [] }}>
                {panels[step]}
            </Form>
            <div className="mt-6 flex justify-between">
                <Button disabled={step === 0} onClick={() => setStep((current) => current - 1)}>Back</Button>
                {step < 4 ? <Button type="primary" onClick={next}>Next</Button>
                    : <Button type="primary" loading={onboarding.isPending} onClick={() => onboarding.mutate(onboardingPayload(form.getFieldsValue(true)))}>Create company</Button>}
            </div>
        </section>
    );
};

export default OnboardingWizard;
