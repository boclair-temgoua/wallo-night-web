import React from "react";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { SelectSearchInput, TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { ButtonCancelInput } from "../ui/button-cancel-input";
import { useRouter } from "next/router";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { ContributorFormModel, arrayRoleContributors } from "@/types/contributor";
import { CreateOrUpdateOneContributorAPI } from "@/api-site/contributor";

type Props = {
  uploadImages?: any;
  eventId?: string;
  event?: any;
};

const schema = yup.object({
  lastName: yup.string().required(),
  firstName: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email().min(6, "minimum 6 symbols").required(),
});

const CreateOrUpdateFormContributor: React.FC<Props> = ({
  event,
  uploadImages,
}) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    errors,
    loading,
    hasErrors,
    setLoading,
    setHasErrors,
  } = useReactHookForm({ schema });


  // Create or Update data
  const saveMutation = CreateOrUpdateOneContributorAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ContributorFormModel> = async (
    data: ContributorFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {

      await saveMutation.mutateAsync({ ...data, permission: 'ADMIN' });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Contributor save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      router.push(`/contributors`)
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

  return (
    <>
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white border border-gray-200">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold text-gray-900">
                  {event?.id ? "Update" : "Create a new"} contributor
                </h2>

                {hasErrors && (
                  <div className="relative mt-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                    {hasErrors}
                  </div>
                )}

                <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                  <div className="mt-2">
                    <TextInput
                      label="Email"
                      control={control}
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      errors={errors}
                    />
                  </div>
                  <div className="mt-2">
                    <SelectSearchInput
                      firstOptionName="Choose role"
                      label="Role"
                      control={control}
                      errors={errors}
                      placeholder="Choose role contributor"
                      valueType="text"
                      name="role"
                      dataItem={arrayRoleContributors}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                  <div className="mt-2">
                    <TextInput
                      label="Nome"
                      control={control}
                      type="text"
                      name="firstName"
                      placeholder="Nome"
                      required
                      errors={errors}
                    />
                  </div>
                  <div className="mt-2">
                    <TextInput
                      label="Cognome"
                      control={control}
                      type="text"
                      name="lastName"
                      placeholder="Cognome"
                      required
                      errors={errors}
                    />
                  </div>
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
                    Save
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

export { CreateOrUpdateFormContributor };
