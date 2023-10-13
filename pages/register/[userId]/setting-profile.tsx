/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DateInput,
  TextAreaInput,
  TextInput,
} from "@/components/ui";
import { AlertDangerNotification } from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { PrivateComponent } from "@/components/util/private-component";
import {
  UpdateOneProfileNextStepAPI,
} from "@/api-site/profile";
import { NextStepProfileFormModel } from "@/types/profile.type";
import { GetOneUserPublicAPI, resendCodeAPI } from "@/api-site/user";
import { SelectSearchInput } from "@/components/ui/select-search-input";
import { ButtonInput } from "@/components/ui/button-input";
import { LayoutSite } from "@/components/layout-site";

const schema = yup.object({
  // username: yup
  //   .string()
  //   .trim("The username name cannot include leading and trailing spaces")
  //   .strict(true)
  //   .min(1, "The username name needs to be at least 1 char")
  //   .max(512, "The username name cannot exceed 512 char")
  //   .required(),
  url: yup.string().url().optional(),
  birthday: yup.date().required(),
  currencyId: yup.string().uuid().required(),
  countryId: yup.string().uuid().required(),
});

const SettingProfile = () => {
  // const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data } = GetOneUserPublicAPI({ userId })
  const user: any = data?.data;

  if (user?.nextStep === "CONFIRM_EMAIL") {
    router.push(`${`/register/${userId}/confirm-account`}`);
  }


  useEffect(() => {
    if (user) {
      const fields = ["username"];
      fields?.forEach((field: any) => setValue(field, user[field]));
    }
  }, [user, setValue]);

  const saveMutation = UpdateOneProfileNextStepAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<NextStepProfileFormModel> = async (
    payload: NextStepProfileFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        ...payload,
        nextStep: "CONFIRM_EMAIL",
        userId: userId,
      });
      await resendCodeAPI({ userId });
      router.push(`${`/register/${userId}/confirm-account`}`);
      setHasErrors(false);
      setLoading(false);
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
    <LayoutSite title="Log In">
      <div className="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex justify-center mx-auto">
          <h6 className="mt-3 text-xl text-center font-bold">
            {`Complete your profile`}
          </h6>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <div className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
              {hasErrors}
            </div>
          )}

          {user?.username ? (
            <div className="mb-4">
              <TextInput
                control={control}
                label="What do you want your link to be"
                type="text"
                name="username"
                placeholder="username"
                errors={errors}
                prefix={"unpot.com/"}
              />
            </div>
          ) : null}

          <div className="mb-4">
            <DateInput
              control={control}
              label="Birthday"
              placeholder="12/01/2023"
              name="birthday"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextAreaInput
              row={3}
              control={control}
              label="Bio"
              name="description"
              placeholder="Introduce yourself and what you're creating"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInput
              control={control}
              label="Web site or social link"
              type="text"
              name="url"
              placeholder="https://www.yousite.com"
              errors={errors}
            />
          </div>

          <div className="mt-6">

            <ButtonInput shape="default" type="submit" size="large" loading={loading} color={'indigo'}>
              Continue
            </ButtonInput>
          </div>
        </form>
      </div>
    </LayoutSite>
  );
};

export default PrivateComponent(SettingProfile);
