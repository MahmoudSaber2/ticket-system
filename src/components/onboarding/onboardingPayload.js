export function onboardingPayload(formValues) {
    if (formValues.company.usesBranches) return formValues;

    return {
        ...formValues,
        branches: [],
        owner: { ...formValues.owner, branchKey: undefined },
        accounts: (formValues.accounts || []).map((account) => ({ ...account, branchKey: undefined })),
    };
}
