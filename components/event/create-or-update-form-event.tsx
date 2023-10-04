import React, { useEffect, useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { DateInput, NumberInput, ReactQuillInput, TextAreaInput, TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonCancelInput } from "../ui/button-cancel-input";
import { useRouter } from "next/router";
import { filterImageAndFile } from "@/utils/utils";
import { useAuth } from "../util/context-user";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { CreateOrUpdateOneEventAPI } from "@/api-site/event";
import { EventFormModel } from "@/types/event";

type Props = {
  uploadImages?: any;
  eventId?: string;
  event?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().min(10, "minimum 10 symbols").required(),
  categories: yup.array().optional(),
});

const CreateOrUpdateFormEvent: React.FC<Props> = ({
  eventId,
  event,
  uploadImages,
}) => {
  const router = useRouter();

  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (event) {
      const fields = [
        "title",
        "description",
        "dateEvent",
        "address",
        "price",
        "address",
        "currency",
        "location",
        "messageAfterPayment",
        "status"
      ];
      fields?.forEach((field: any) => setValue(field, event[field]));
    }
  }, [event, eventId, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOneEventAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<EventFormModel> = async (
    data: EventFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { newImageLists } = filterImageAndFile({
        imageList,
      });
      const payload = {
        ...data,
        currency: 'EUR',
        imageList,
        newImageLists,
      };
      await saveMutation.mutateAsync({
        ...payload,
        eventId: event?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Event save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      router.push(`/events`)
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  return (
    <>
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white border border-gray-200">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold text-gray-900">
                  {event?.id ? "Update" : "Create a new"} event
                </h2>

                <div className="mt-4">
                  <Controller
                    name="attachmentImages"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <div className="text-center justify-center mx-auto">
                          <Upload
                            multiple
                            name="attachmentImages"
                            listType="picture-card"
                            fileList={imageList}
                            onChange={handleImageChange}
                            accept=".png,.jpg,.jpeg"
                            maxCount={10}
                          >
                            {imageList.length >= 10 ? null : (
                              <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload cover</div>
                              </div>
                            )}
                          </Upload>
                        </div>
                      </>
                    )}
                  />
                </div>

                <div className="mt-2">
                  <TextInput
                    control={control}
                    label="Title"
                    type="text"
                    name="title"
                    required
                    placeholder="Title"
                    errors={errors}
                  />
                </div>

                <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                  <div className="mt-2">
                    <TextInput
                      label="Address"
                      control={control}
                      type="text"
                      name="address"
                      placeholder="Address"
                      errors={errors}
                    />
                  </div>
                  <div className="mt-2">
                    <TextInput
                      label="Location"
                      control={control}
                      type="text"
                      name="location"
                      placeholder="Location"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                  <div className="mt-2">
                    <NumberInput
                      control={control}
                      label="Price"
                      type="number"
                      name="price"
                      placeholder="Price event"
                      errors={errors}
                      required
                      prefix={'EUR'}
                    />
                  </div>
                  <div className="mt-2">
                    <DateInput
                      label="Date Event"
                      control={control}
                      placeholder="12/01/2023"
                      name="dateEvent"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
                </div>

                <div className="mt-2">
                  <TextAreaInput
                    row={3}
                    control={control}
                    label="Confirmation message"
                    name="messageAfterPayment"
                    placeholder="Success message confirmation"
                    errors={errors}
                  />
                  <span className="text-sm font-medium text-gray-400">
                    {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
                  </span>
                </div>

                <div className="flex items-center mt-4 mb-4 space-x-4">
                  <ButtonCancelInput
                    shape="default"
                    size="large"
                    loading={loading}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </ButtonCancelInput>
                  <ButtonInput
                    shape="default"
                    type="submit"
                    size="large"
                    loading={loading}
                    color="indigo"
                  >
                    Save and Publish
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormEvent };
