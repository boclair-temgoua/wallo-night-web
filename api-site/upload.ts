import { UploadFolderType, UploadModel } from "@/types/upload";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useQuery } from "@tanstack/react-query";

export const GetUploadsAPI = (payload: {
  organizationId?: string;
  model: string;
  uploadableId: string;
  uploadType?: "image" | "file";
}) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["uploads", { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: "getUploads",
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading, status };
};

export const viewOneFileUploadAPI = ({
  fileName,
  folder,
}: {
  fileName: string;
  folder: UploadFolderType;
}) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/view/${folder}/${fileName}`
    : null;

export const downloadOneFileUploadAPI = ({
  fileName,
  folder,
}: {
  fileName: string;
  folder: UploadFolderType;
}) =>
  fileName && folder
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/download/${folder}/${fileName}`
    : null;
