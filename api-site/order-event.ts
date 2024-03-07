import {
  OrderEventModel,
  ResponseOrderEventModel,
  StatusEvent,
} from "@/types/order-event";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const UpdateOneOrderEventAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["order-events"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: {
      orderEventId: string;
      status?: StatusEvent;
    }) => {
      const { status, orderEventId } = payload;
      let data = new FormData();
      data.append("status", `${payload.status ?? ""}`);
      return await makeApiCall({
        action: "updateOneOrderEvent",
        body: { status },
        urlParams: { orderEventId },
      });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const GetOneOrderEventAPI = (payload: {
  orderEventId?: string;
  OrderEventSlug?: string;
}) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["order-event", { ...payload }, { preview: true }],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneOrderEvent",
        queryParams: payload,
      }),
    refetchOnWindowFocus: true,
  });

  return { data: data?.data as OrderEventModel, isError, isLoading, status };
};

export const getOrderEventsAPI = async (
  payload: {
    userId?: string;
    organizationId?: string;
  } & PaginationRequest
): Promise<{ data: ResponseOrderEventModel }> => {
  return await makeApiCall({
    action: "getOrderEvents",
    queryParams: payload,
  });
};

export const GetInfiniteOrderEventsAPI = (payload: {
  organizationId?: string;
  userId?: string;
  take: number;
  status?: string;
  sort: SortModel;
  typeIds?: string[];
}) => {
  const { organizationId, userId, take, sort, status } = payload;
  return useInfiniteQuery({
    queryKey: ["order-events", "infinite"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getOrderEventsAPI({
        userId,
        organizationId,
        take,
        sort,
        page: pageParam,
      }),
    initialPageParam: 1,
  });
};
