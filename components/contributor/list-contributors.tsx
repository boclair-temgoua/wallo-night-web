/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Button } from "antd";
import { ReadMore } from "@/utils/read-more";
import { BiDotsHorizontal } from "react-icons/bi";
import { formateFromNow } from "@/utils";
import { ContributorModel } from "@/types/contributor";
import { capitalizeOneFirstLetter } from "@/utils/utils";

type Props = {
  item?: ContributorModel;
  index: number;
};

const ListContributors: React.FC<Props> = ({ item, index }) => {
  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold text-gray-900">
          <div className="flex items-center flex-1 min-w-0">
            {item?.profile?.image ?
              <Avatar size={50} src={item?.profile?.image} alt="" /> :
              <Avatar size={50} style={{ backgroundColor: '#fde3', color: `${item?.profile?.color}` }}>
                {capitalizeOneFirstLetter(String(item?.profile?.firstName), String(item?.profile?.lastName))}
              </Avatar>
            }

            <div className="flex-1 min-w-0 ml-4">
              <p className="text-sm font-bold text-gray-900">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 hidden sm:table-cell">
                {item?.profile?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 sm:hidden">
                <ReadMore html={`${item?.profile?.email}`} value={16} />
              </p>
              <p className="lg:hidden mt-1 text-sm font-medium text-gray-500">
                {formateFromNow(item?.createdAt as Date)}
              </p>
            </div>
          </div>
        </td>

        <td className="hidden text-sm text-right font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date)}
        </td>

        <td className="py-4 text-sm font-medium text-right text-gray-400">
          <Button
            type="text"
            shape="circle"
            icon={<BiDotsHorizontal className="w-5 h-5" />}
            size="small"
          />
        </td>
      </tr>
    </>
  );
};

export { ListContributors };
