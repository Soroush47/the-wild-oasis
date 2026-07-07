import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function handleMutationError(error: AxiosError, defaultMessage: string) {
    if (
        error.response?.status === 403 &&
        error.response?.data === "Demo account is read only"
    ) {
        toast.error("Demo mode: Changes are disabled.");
        return;
    }

    toast.error(defaultMessage);
}
