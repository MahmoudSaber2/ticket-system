import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useSelects = () => {
    const getSelects = async () => {
        const { data } = await axios.get(`https://customerservicebe.testingelmo.com/api/v1/selects?allSelects=branches=1,companies,customers`);
        return data;
    };
    
    return useQuery({
        queryKey: ["selects"],
        queryFn: getSelects,
        refetchOnWindowFocus: false,
    });
}