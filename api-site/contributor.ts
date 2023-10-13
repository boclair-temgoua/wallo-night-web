import {
  ContributorFormModel,
  ContributorModel,
  ResponseContributorModel,
} from "@/types/contributor";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const CreateOrUpdateOneContributorAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["contributors"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: ContributorFormModel): Promise<any> => {
      return await makeApiCall({
        action: "createOneContributor",
        body: payload,
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

export const DeleteOneContributorAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["contributors"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { eventId: string }): Promise<any> => {
      const { eventId } = payload;

      return await makeApiCall({
        action: "deleteOneContributor",
        urlParams: { eventId },
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

export const getContributorsAPI = async (
  payload: {
    organizationId?: string;
  } & PaginationRequest
): Promise<{ data: ResponseContributorModel }> => {
  return await makeApiCall({
    action: "getContributors",
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
    queryFn: async ({ pageParam = 0 }) =>
      await getContributorsAPI({
        organizationId,
        take,
        sort,
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};
