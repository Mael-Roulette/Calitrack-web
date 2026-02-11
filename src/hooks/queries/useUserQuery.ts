import { getCurrentUser } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook pour récupérer les informations de l'utilisateur connecté
 */
export const useUser = () => {
    return useQuery( {
        queryKey: [ "user" ],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 60, // Données restes fraiches pour 1h
        retry: 5,
    } );
};