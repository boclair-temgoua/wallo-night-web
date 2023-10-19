import { OrderEventModel, StatusEvent } from "@/types/order-event";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
