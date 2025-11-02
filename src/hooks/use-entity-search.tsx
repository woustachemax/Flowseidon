import {PAGINATION} from '@/config/constants'
import {useEffect, useState} from 'react';
interface UseEntitySearchProps<T extends {
    search: string;
    page: number;
}>{
    params: T;
    setParams: (params: T)=>void;
    debounceTime?: number;
}

export function useEntitySearch<T extends {
    search: string;
    page: number;
}>({
    params,
    setParams,
    debounceTime = 500
}: UseEntitySearchProps<T>) {
    const [localSearch, setLocalSearchTerm] = useState(params.search);


    useEffect(() => {
        if(localSearch ===   "" && params.search !== ""){
            setParams({
                ...params,
                search: "",
                page: PAGINATION.DEAFAULT_PAGE
            }); 
        }
           const timer = setTimeout(() => {
            if (localSearch !== params.search) {
                setParams({
                    ...params,
                    search: localSearch,
                    page: PAGINATION.DEAFAULT_PAGE
                });
            }
           }, debounceTime)     
        
        return () => clearTimeout(timer);
        },[localSearch, params, setParams, debounceTime]);

        useEffect(() => {
            setLocalSearchTerm(params.search);
        }, [params.search]);

    return {
        searchValue: localSearch,
        onSearchChange: setLocalSearchTerm
    };
}