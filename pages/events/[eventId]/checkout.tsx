"use client";

import { useRouter } from "next/router";
// import { GetOneMembershipAPI } from "@/api-site/membership";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { HtmlParser } from "@/utils/html-parser";
import { CreateEventPayPal } from "@/components/payment/create-event-paypal";
import { LoadingFile } from "@/components/ui/loading-file";
import { useAuth } from "@/components/util/context-user";
import { CreateSubscribeStripe } from "@/components/payment/stripe/create-subscribe-stripe";
import { ButtonInput } from "@/components/ui/button-input";
import ContentLoader from "react-content-loader";
import { GetOneEventAPI } from "@/api-site/event";
import { Button, Image } from "antd";
import { viewOneFileUploadAPI } from "@/api-site/upload";
import { formatePrice } from "@/utils";
import { LayoutSite } from "@/components/layout-site";
import { PrivateComponent } from "@/components/util/private-component";


const CheckoutView = () => {
  const currency = "EUR";
  const [increment, setIncrement] = useState(1)
  const [isCardPay, setIsCardPay] = useState<boolean>(false);
  const { userStorage } = useAuth() as any;
  const { push, back, query } = useRouter();
  const eventId = String(query?.eventId);
  const {
    formState: { errors },
  } = useForm();
  const { status, data: item } = GetOneEventAPI({
    eventId,
  });

  if (status === "loading") {
    <LoadingFile />;
  }

  const calculatePrice = Number(item?.price) * increment
  const newPrice = {
    value: calculatePrice,
    quantity: increment,
    currency: currency,
  };
  return (
    <>
      <LayoutSite title={'Events'}>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-xl mx-auto mt-8 md:mt-12">
            <div className="overflow-hidden bg-white shadow rounded-xl">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <Button onClick={() => back()}>Tornare</Button>
                <div className="flow-root">
                  <div className="overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                    <div className="p-8 sm:py-7 sm:px-8">
                      {item?.id ? (
                        <>
                          <div className="flex mt-2 items-center">
                            {item?.title ? (
                              <p className="text-lg font-bold text-gray-900 cursor-pointer">
                                {item?.title ?? ""}
                              </p>
                            ) : null}
                          </div>



                          {item?.uploadsImage && item?.uploadsImage?.length > 0 ? (
                            <div className="mt-4 text-center justify-center mx-auto">
                              <Image preview={false} className="object-cover w-full h-full"
                                src={`${viewOneFileUploadAPI({
                                  folder: 'events',
                                  fileName: item?.uploadsImage?.[0].path,
                                })}`}
                                alt={item?.title} />
                            </div>
                          ) : null}



                          <hr className="border-gray-200 mt-4" />

                          <div className="flex items-center justify-between mt-6">
                            <p className="text-xl font-bold text-gray-900">
                              Quantità
                            </p>
                            <div className="ml-auto flex items-center justify-end space-x-3 border border-gray-100 rounded-md">
                              <Button type="primary" size="large" loading={false} disabled={increment === 1 ? true : false} onClick={() => setIncrement(lk => lk - 1)} danger>
                                <svg
                                  className="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M18 12H6"
                                  />
                                </svg>
                              </Button>

                              <span className="text-base font-semibold text-gray-900">
                                {increment}
                              </span>

                              <Button type="primary" size="large" loading={false} onClick={() => setIncrement(lk => lk + 1)} danger>
                                <svg
                                  className="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-6">
                            <p className="text-3xl font-bold text-gray-900">
                              Total
                            </p>
                            <>
                              <p className="ml-auto text-2xl font-bold text-gray-900">
                                {formatePrice({
                                  value: Number(newPrice?.value ?? 0),
                                  isDivide: false,
                                }) ?? ""}

                              </p>
                              <p className="ml-1 text-2xl font-bold text-gray-900">
                                {item?.currency}
                              </p>
                            </>
                          </div>

                          {userStorage?.id ? (
                            <>
                              {isCardPay ? (
                                <>
                                  <CreateSubscribeStripe
                                    paymentModel="STRIPE-PAYMENT"
                                    data={{
                                      eventId,
                                      userId: userStorage?.id,
                                      amount: newPrice,
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <div className="mt-2">
                                    <ButtonInput
                                      onClick={() => setIsCardPay(true)}
                                      shape="default"
                                      type="button"
                                      size="large"
                                      color="indigo"
                                      loading={false}
                                    >
                                      Card Pay
                                    </ButtonInput>
                                  </div>
                                </>
                              )}

                              <CreateEventPayPal
                                paymentModel="PAYPAL-PAYMENT"
                                data={{
                                  eventId,
                                  userId: userStorage?.id,
                                  amount: newPrice,
                                }}
                              />
                            </>
                          ) : null}
                        </>
                      ) :
                        <ContentLoader height="500" width="100%" viewBox="0 0 265 230" >
                          <rect x="15" y="25" rx="2" ry="2" width="350" height="15" />
                          <rect x="15" y="50" rx="2" ry="2" width="350" height="100" />
                          <rect x="15" y="160" rx="2" ry="2" width="350" height="40" />
                          <rect x="15" y="210" rx="2" ry="2" width="350" height="40" />
                        </ContentLoader>}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mt-4 text-sm font-normal text-gray-500">
                    All the taxes will be calculated while checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutSite>
    </>
  );
};

export default PrivateComponent(CheckoutView);;
