import { EventFormModel, EventModel, ResponseEventModel } from "@/types/event";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOrUpdateOneEventAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["events"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: EventFormModel & { eventId?: string }) => {
      const { eventId, newImageLists, newFileLists } = payload;
      let data = new FormData();
      data.append("location", `${payload.location ?? ""}`);
      data.append("title", `${payload.title ?? ""}`);
      data.append("price", `${payload.price}`);
      data.append("address", `${payload.address ?? ""}`);
      data.append("dateEvent", `${payload.dateEvent ?? ""}`);
      data.append("currency", `${payload.currency ?? ""}`);
      data.append("urlRedirect", `${payload.urlRedirect}`);
      data.append("messageAfterPayment", `${payload.messageAfterPayment}`);
      data.append("description", `${payload.description ?? ""}`);
      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append("attachmentFiles", file?.originFileObj as RcFile);
        });
      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append("attachmentImages", file?.originFileObj as RcFile);
        });
      if (eventId) {
        const result = await makeApiCall({
          action: "updateOneUpload",
          body: { newImageLists, newFileLists },
          queryParams: { uploadableId: eventId, model: "EVENT" },
        });
        if (result) {
          await makeApiCall({
            action: "updateOneEvent",
            body: data,
            urlParams: { eventId },
          });
        }
        return "Ok";
      } else {
        return await makeApiCall({
          action: "createOneEvent",
          body: data,
        });
      }
    },
    onError: (error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const DeleteOneEventAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["events"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { eventId: string }) => {
      const { eventId } = payload;
      return await makeApiCall({
        action: "deleteOneEvent",
        urlParams: { eventId },
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

export const createOnUploadEventAPI = async (
  payload: any
): Promise<{ data: { urlFile: string } }> => {
  return await makeApiCall({
    action: "createOnUploadEvent",
    body: payload,
  });
};

export const GetOneEventAPI = (payload: {
  organizationId?: string;
  status?: string;
  eventId?: string;
  eventSlug?: string;
}) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["event", { ...payload }, { preview: true }],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneEvent",
        queryParams: payload,
      }),
    refetchOnWindowFocus: true,
  });

  return { data: data?.data as EventModel, isError, isLoading, status };
};

export const getOneFileEventAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/events/file/${fileName}`
    : null;

export const getOneFileGalleryAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/events/gallery/${fileName}`
    : null;

export const getEventsAPI = async (
  payload: {
    status?: string;
    organizationId?: string;
  } & PaginationRequest
): Promise<{ data: ResponseEventModel }> => {
  return await makeApiCall({
    action: "getEvents",
    queryParams: payload,
  });
};

export const GetInfiniteEventsAPI = (payload: {
  organizationId?: string;
  take: number;
  status?: string;
  sort: SortModel;
  typeIds?: string[];
  queryKey: string[];
}) => {
  const { organizationId, take, sort, status, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getEventsAPI({
        organizationId,
        take,
        sort,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    initialPageParam: 1,
  });
};
