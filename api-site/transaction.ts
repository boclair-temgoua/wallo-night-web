import { ResponseTransactionModel } from "@/types/transaction";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import { useInfiniteQuery } from "@tanstack/react-query";

export const getTransactionsAPI = async (
  payload: {
    status?: string;
    model?: string;
  } & PaginationRequest
): Promise<{ data: ResponseTransactionModel }> => {
  return await makeApiCall({
    action: "getTransactions",
    queryParams: payload,
  });
};

export const GetInfiniteTransactionsAPI = (payload: {
  model?: string;
  take: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { model, take, sort, status, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getTransactionsAPI({
        model,
        take,
        sort,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};
