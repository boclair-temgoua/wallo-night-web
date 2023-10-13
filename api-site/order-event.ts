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
  const queryKey = ["events"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: {
      orderEventId: string;
      status?: StatusEvent;
    }): Promise<any> => {
      const { status, orderEventId } = payload;
      let data = new FormData();
      data.append("status", `${payload.status ?? ""}`);

      return await makeApiCall({
        action: "updateOneOrderEvent",
        body: { status },
        urlParams: { orderEventId },
      });
    },
    {
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
      onError: async (error: any) => {
        await queryClient.invalidateQueries({ queryKey });
        if (onError) {
          onError(error);
        }
      },
    }
  );

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
