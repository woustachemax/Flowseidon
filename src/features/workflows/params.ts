import { PAGINATION } from "@/config/constants"
import { parseAsInteger, parseAsString } from "nuqs/server"

export const workflowsParams = {
    page: parseAsInteger
        .withDefault(PAGINATION.DEAFAULT_PAGE)
        .withOptions({ clearOnDefault: true }),
    pageSize: parseAsInteger
        .withDefault(PAGINATION.DEAFAULT_PAGE_SIZE)
        .withOptions({ clearOnDefault: true }),
    search: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true })
}