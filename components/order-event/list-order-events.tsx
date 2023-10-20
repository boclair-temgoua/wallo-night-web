/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { AlertDangerNotification, AlertSuccessNotification, formatePrice } from "@/utils";
import { useRouter } from "next/router";
import { AiOutlineCalendar } from "react-icons/ai";
import { GrDocumentDownload } from "react-icons/gr";
import { DeleteOneEventAPI } from "@/api-site/event";
import { OrderEventModel } from "@/types/order-event";
import { Avatar, Tooltip } from "antd";
import { downloadOneFileUploadAPI, viewOneFileUploadAPI } from "@/api-site/upload";
import { ReadMore } from '@/utils/read-more';
import { BiMoney } from "react-icons/bi";
import Link from "next/link";
import { LiaMapMarkerAltSolid } from "react-icons/lia";

type Props = {
  item?: OrderEventModel;
  index: number;
};

const ListOrderEvents: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();

  return (
    <>
      <div key={index} className="py-5 divide-gray-200">
        <div className="flex items-center">
          {item?.imageEvent ?
            <div className="relative flex-shrink-0 cursor-pointer">
              <Avatar
                size={100}
                shape="square"
                src={viewOneFileUploadAPI({ folder: 'events', fileName: String(item?.imageEvent) })}
                alt={item?.event?.title}
              />
            </div> : null}



          <div className="flex-1 ml-3 min-w-0 cursor-pointer">
            <div className="flex items-center">
              <button className="tex-sm text-gray-700">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>

            <div className="flex mt-4 items-center">
              {item?.event?.title ? (
                <Link href={`/events/${item?.event?.slug}`} className="text-lg font-bold text-gray-600">
                  <ReadMore html={String(item?.event?.title ?? "")} value={100} />
                </Link>
              ) : null}
            </div>
            <div className="flex mt-4 font-bold items-center">
              <span className="font-normal text-sm">
                No: {item?.code}
              </span>
            </div>

            <div className="flex mt-4 items-center">
              {item?.priceEvent ? (
                <>
                  <span className="text-lg text-gray-700">
                    <BiMoney />
                  </span>
                  <span className="ml-2 text-sm font-bold">
                    {formatePrice({ value: Number(item?.priceEvent), isDivide: true })} {item?.currency}
                  </span>
                </>
              ) : null}

              <button className="ml-1.5 tex-sm text-gray-700">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 font-bold text-sm">
                {formateDateDayjs(item?.event?.dateEvent as Date)}
              </span>
              <button className="ml-1.5 tex-sm text-gray-700">
                <LiaMapMarkerAltSolid />
              </button>
              <span className="ml-1.5 font-bold text-sm">
                {item?.event?.location}
              </span>
            </div>

          </div>

          {Number(item?.uploadsFile?.length) > 0 ?
            <div className="py-4 text-sm font-medium text-right text-gray-900">
              <Tooltip placement="bottomRight" title={"Download"}>
                <a href={`${downloadOneFileUploadAPI({ folder: 'order-events', fileName: String(item?.uploadsFile[0]?.path) })}`}
                  className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
                >
                  <GrDocumentDownload />
                </a>
              </Tooltip>

            </div> : null}

        </div>
      </div>
    </>
  );
};

export { ListOrderEvents };
