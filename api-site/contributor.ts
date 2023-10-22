import {
  ContributorFormModel,
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
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: ContributorFormModel) => {
      return await makeApiCall({
        action: "createOneContributor",
        body: payload,
      });
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

export const DeleteOneContributorAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["contributors"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { contributorId: string }) => {
      const { contributorId } = payload;
      return await makeApiCall({
        action: "deleteOneContributor",
        urlParams: { contributorId },
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

export const GetInfiniteContributorsAPI = (payload: {
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
      await getContributorsAPI({
        organizationId,
        take,
        sort,
        page: pageParam,
      }),
    initialPageParam: 1,
  });
};
