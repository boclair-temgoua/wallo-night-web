import React, { } from "react";
import { ButtonInput } from "../ui/button-input";
import { AlertDangerNotification, formateDaysMonthYearFormatDays, formatePrice } from "@/utils";
import { Tag } from "antd";
import { ButtonCancelInput } from "../ui/button-cancel-input";
import { useRouter } from "next/router";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { EventFormModel } from "@/types/event";
import { OrderEventModel } from "@/types/order-event";
import { generateLongUUID } from "@/utils/generate-random";
import { UpdateOneOrderEventAPI } from "@/api-site/order-event";
import * as yup from "yup";

type Props = {
  orderEvent?: OrderEventModel;
};


const schema = yup.object({});


const ValidateOrderEvent: React.FC<Props> = ({
  orderEvent
}) => {
  const {
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const router = useRouter();


  const saveMutation = UpdateOneOrderEventAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const newReference = generateLongUUID(30);
      await saveMutation.mutateAsync({
        orderEventId: String(orderEvent?.id),
        status: 'COMPLETED'
      });
      setHasErrors(false);
      setLoading(false);
      router.push(`/events/${newReference}/success`)
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

                {hasErrors && (
                  <div className="relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                    {hasErrors}
                  </div>
                )}


                <div className="flex mt-2 items-center justify-between">
                  <p className="text-lg font-bold text-gray-900 cursor-pointer">
                    ID: {orderEvent?.code ?? ""}
                  </p>
                  <div className="ml-auto items-center justify-end border-gray-100">
                    <p className="text-lg font-bold text-gray-900 cursor-pointer">
                      {formatePrice({
                        value: Number(orderEvent?.event?.price ?? 0),
                        isDivide: false,
                      }) ?? ""} {orderEvent?.event?.currency}
                    </p>
                  </div>
                </div>


                <div className="flex mt-2 items-center">
                  <p className="text-lg font-bold text-gray-900 cursor-pointer">
                    Localita: {orderEvent?.event?.location}
                  </p>
                </div>

                <div className="flex mt-2 items-center">
                  <p className="text-lg font-bold text-gray-900 cursor-pointer">
                    Indirizzo: {orderEvent?.event?.address}
                  </p>
                </div>

                <div className="flex mt-2 items-center">
                  <p className="text-lg font-bold text-gray-900 cursor-pointer">
                    Date evento: {formateDaysMonthYearFormatDays(orderEvent?.event?.dateEvent as Date)}
                  </p>
                </div>

                <div className="flex mt-2 items-center justify-between">
                  <p className="text-lg font-bold text-gray-900 cursor-pointer">
                    Stato:{" "}
                    {orderEvent?.status === 'ACTIVE' ? <Tag color="#87d068">{orderEvent?.status}</Tag> : null}
                    {orderEvent?.status === 'COMPLETED' ? <Tag color="#f50">{orderEvent?.status}</Tag> : null}
                  </p>
                  <div className="ml-auto items-center justify-end border-gray-100">
                    <p className="text-lg font-bold text-gray-900 cursor-pointer">
                      {orderEvent?.status === 'ACTIVE' ? <Tag color="#87d068">Valid</Tag> : null}
                      {orderEvent?.status === 'COMPLETED' ? <Tag color="#FF0000">Invalid or Expired</Tag> : null}
                    </p>
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
                  {orderEvent?.status !== 'COMPLETED' ?
                    <ButtonInput
                      shape="default"
                      type="submit"
                      size="large"
                      loading={loading}
                      color="indigo"
                    >
                      {`Confermare`}
                    </ButtonInput> : null}

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { ValidateOrderEvent };
