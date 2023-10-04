/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Image } from "antd";
import { PostModel } from "@/types/post";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import {
  MdFavoriteBorder,
} from "react-icons/md";
import { useRouter } from "next/router";
import { useAuth } from "../util/context-user";
import Link from "next/link";

type Props = {
  item?: PostModel;
};

const ListLastEvents: React.FC<Props> = ({ item }) => {
  const userVisiter = useAuth() as any;
  const router = useRouter();
  return (
    <>
      <li key={item?.id} className="flex items-stretch justify-between space-x-2 py-7">
        <div className="flex-shrink-0">
          <Image
            height={65}
            preview={false}
            className="object-cover w-16 h-16 rounded-lg"
            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-2.png"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-between flex-1 ml-5">
          <div className="flex-1">
            {item?.id ? (
              <Link
                href={`/${item?.profile?.username}/posts/${item?.slug}`}
                className="text-sm font-bold text-gray-900 cursor-pointer"
              >
                {item?.title ?? ""}
              </Link>
            ) : null}

            <div className="flex mt-2 items-center text-gray-500">
              <button className="text-lg font-bold">
                <MdFavoriteBorder />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.totalLike ?? 0}
              </span>

              <button className="ml-3.5 text-lg font-bold">
                <BiComment />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.totalComment ?? 0}
              </span>
              <span className="ml-auto font-normal text-sm">
                {formateDMYHH(item?.createdAt as Date)}
              </span>
            </div>
          </div>
        </div>
      </li>

    </>
  );
};

export default ListLastEvents;
