/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Button, Image } from "antd";
import Link from "next/link";
import { ReadMore } from "@/utils/read-more";
import { viewOneFileUploadAPI } from "@/api-site/upload";
import { EventModel } from "@/types/event";
import { formateDaysMonthYearFormatDays, formatePrice } from "@/utils";
import { ButtonInput } from "../ui";
import { useRouter } from "next/router";

type Props = {
  item?: EventModel;
};

const ListPublicEvents: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  return (
    <>
      <div key={item?.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
        {item?.uploadsImage && item?.uploadsImage.length > 0 ?
          <Image
            preview={false}
            height={200}
            width="100%"
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            src={viewOneFileUploadAPI({ folder: 'events', fileName: String(item?.uploadsImage?.[0]?.path) }) as string}
            alt=""
          /> : null}


        <div className="flex flex-col flex-1 p-3">
          <div className="flex items-center flex-shrink-0">

            <p className="text-2xl font-bold text-gray-900">
              {formatePrice({
                value: Number(item?.price ?? 0),
                isDivide: false,
              }) ?? ""}
            </p>
            <p className="ml-2 text-lg font-bold text-gray-900">
              {item?.currency}
            </p>
            {/* <p className="ml-auto text-lg font-bold">
              <ButtonInput
                onClick={() => router.push(`/events/${item?.id}/checkout`)}
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={"red"}
              >
                Riserva un posto
              </ButtonInput>
            </p> */}
          </div>

          <div className="mt-2 sm:mt-0">
            <p className="ml-auto text-lg font-bold">
              <ButtonInput
                onClick={() => router.push(`/events/${item?.id}/checkout`)}
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={"red"}
              >
                Riserva un posto
              </ButtonInput>
            </p>
            <h2 className="text-xl sm:text-base font-bold text-gray-900 mt-2 flex-1 hover:text-blue-600 transition-all">
              <Link href={`/events/${item?.slug}`} title={item?.title}>
                <ReadMore html={String(item?.title ?? "")} value={60} />
              </Link>
            </h2>
            <h2 className="mt-2 text-sm font-bold text-gray-900 sm:text-sm">Data</h2>
            <p className="mt-1 text-base font-medium text-gray-900">{formateDaysMonthYearFormatDays(item?.dateEvent as Date)}</p>
            <h1 className="mt-2 text-sm font-bold text-gray-900 sm:text-sm">Località</h1>
            <p className="mt-1 text-base font-medium text-gray-900">{item?.location}</p>
            <h1 className="mt-2 text-sm font-bold text-gray-900 sm:text-sm">Indirizzo</h1>
            <p className="mt-1 text-base font-medium text-gray-900">{item?.address}</p>
          </div>
          {/* <p className="mt-2 text-base font-normal text-gray-600">
            <HtmlParser html={String(item?.description ?? "")} value={60} />
          </p> */}
          {/* <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <div className="mt-2">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ListPublicEvents;
