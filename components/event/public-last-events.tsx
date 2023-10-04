/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Spin } from "antd";
import { GetInfinitePostsAPI } from "@/api-site/post";
import { LoadingOutlined } from "@ant-design/icons";
import { ButtonInput } from "../ui/button-input";
import ListLastPosts from "./list-last-events";
import { EventModel } from "@/types/event";

type Props = {
  event?: EventModel
  organizationId: string;
};

const PublicLastPosts: React.FC<Props> = ({ organizationId, event }) => {

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 4,
    sort: "DESC",
    organizationId: organizationId,
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
    queryKey: ['last-posts', "infinite"]
  });



  const dataTablePosts = isLoadingPosts ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorPosts ? (
    <strong>Error find data please try again...</strong>
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    <>
      <div className="px-4 py-6 sm:p-6 lg:p-8">
        <h3 className="font-bold text-gray-700"> Latest Posts </h3>

        <div className="flow-root mt-8">
          <ul className="divide-y divide-gray-200 -my-7">


            {dataPosts.pages
              .flatMap((page: any) => page?.data?.value)
              .map((item, index) => (
                <ListLastPosts item={item} key={index} />
              ))}


          </ul>
        </div>
        {organizationId || event?.organizationId ? (
          <div className="mt-6 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              <ButtonInput
                shape="default"
                type="button"
                size="huge"
                loading={false}
                color="indigo"
                minW="fit"
              >
                Support
              </ButtonInput>
            </div>
          </div>
        ) : null}
      </div>

    </>
  );

  return (
    <>


      <div className="lg:sticky lg:order-2 lg:top-6 lg:col-span-2">
        <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60">

          {dataTablePosts}

        </div>
      </div>
    </>
  );
};

export default PublicLastPosts;
