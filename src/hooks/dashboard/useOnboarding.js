import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOnboardingOptions = () => useQuery({
    queryKey: ["onboardingOptions"],
    queryFn: async () => (await axios.get("admin/companies/onboarding-options")).data,
});

export const useOnboardCompany = () => useMutation({
    mutationFn: async (onboarding) => (await axios.post("admin/companies/onboard", onboarding)).data,
});
