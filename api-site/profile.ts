import {
  CurrencyModel,
  NextStepProfileFormModel,
  ProfileFormModel,
  ProfileModel,
} from "@/types/profile.type";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UpdateOneProfileAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["profile"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: ProfileFormModel & { profileId: string }) => {
      return await makeApiCall({
        action: "updateOneProfile",
        body: payload,
        urlParams: { profileId: payload?.profileId },
      });
    },
    onError: (error) => {
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

export const GetOneProfileAPI = (payload: { profileId: string }) => {
  const { profileId } = payload;
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["profile", { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneProfile",
        urlParams: { profileId },
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as ProfileModel | any, isError, isLoading, status };
};

export const getOneFileProfileAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/users/file/${fileName}`
    : null;
