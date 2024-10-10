import { useAccountStore } from "./store";
import { useAuth } from "./useAuth";

export function useAccount() {
    const {account} = useAccountStore()

    if(!account) {
        throw new Error("L'utilisateur n'est pas identifié")
    }

    return {
        account
    }
}