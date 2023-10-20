/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { Alert, Button, Input } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserLoginFormModel } from "@/types/user.type";
import { loginUserAPI, resendCodeAPI } from "../../api-site/user";
import { AlertDangerNotification } from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { PublicComponent } from "@/components/util/public-component";
import { LayoutSite } from "@/components/layout-site";
import { TextInput, TextInputPassword, ButtonInput } from "@/components/ui";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  password: yup.string().min(8, "Minimum 8 symbols").required(),
});

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginFormModel>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      const { data: user } = await loginUserAPI({ email, password });

      if (user?.permission === "ADMIN") {
        window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`
      }

      if (user?.permission === "USER") {
        window.location.href = `${process.env.NEXT_PUBLIC_SITE}/order-events`;
      }
      localStorage.setItem(
        String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
        JSON.stringify(user?.accessToken)
      );
      setHasErrors(false);
      setLoading(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: "An error has occurred.",
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      <LayoutSite title="Log In">
        <div className="w-full max-w-sm p-6 m-auto mt-10 md:mt-16 mx-auto bg-white rounded-lg shadow-md">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <div className="flex justify-center mx-auto">
            <h6 className="mt-3 text-xl text-center font-bold">
              {`Log in to your account`}
            </h6>
          </div>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <div className="relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                {hasErrors}
              </div>
            )}

            <div className="mb-4">
              <TextInput
                control={control}
                label="Email"
                type="email"
                name="email"
                placeholder="Email Address"
                errors={errors}
              />
            </div>

            <div className="mb-4">
              <TextInputPassword
                control={control}
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                errors={errors}
              />
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 dark:text-white"
                ></label>
                <Link
                  className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <ButtonInput
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color={"indigo"}
              >
                Log In
              </ButtonInput>
            </div>
          </form>

          {/* <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
              or login with Social Media
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          <a
            href="#"
            className="flex items-center justify-center mt-4 px-6 py-3 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>

            <span className="mx-2 font-bold">Sign in with Google</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-center mt-4 px-6 py-3 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>

            <span className="mx-2 font-bold">Sign in with GitHub</span>
          </a> */}

          <Link href="/register">
            <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
              {" "}
              New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
            </p>
          </Link>
        </div>
      </LayoutSite>
    </>
  );
};

export default PublicComponent(Login);
