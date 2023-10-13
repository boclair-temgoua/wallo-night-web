/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { ButtonInput, LoadingFile } from "../ui";
import { GetInfiniteTransactionsAPI } from "@/api-site/transaction";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import { ListTransactions } from "./list-transactions";

type Props = {
  userId: string;
  model?: string
};

const RecentTransactions: React.FC<Props> = ({ userId,model }) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingMembership,
    isError: isErrorMembership,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteTransactionsAPI({
    model: model?.toLocaleUpperCase(),
    userReceiveId: userId,
    take: 10,
    sort: "DESC",
    queryKey: ["transactions", "infinite"],
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableTransactions = isLoadingMembership ? (
    <LoadingFile />
  ) : isErrorMembership ? (
    <strong>Error find data please try again...</strong>
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataGallery.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListTransactions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 px-4 py-4 overflow-hidden bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center">
          <p className="text-lg font-bold">Recent transactions</p>
        </div>
        <div className="divide-y divide-gray-200">
          <table className="min-w-full mt-4 lg:divide-y lg:divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {dataTableTransactions}
            </tbody>
          </table>
        </div>
      </div>

      {hasNextPage && (
        <div className="mt-2 text-center justify-center mx-auto">
          <div className="sm:mt-0">
            <ButtonInput
              ref={ref}
              onClick={() => fetchNextPage()}
              shape="default"
              type="button"
              size="large"
              loading={isFetchingNextPage ? true : false}
              color={"indigo"}
              minW="fit"
            >
              Load More
            </ButtonInput>
          </div>
        </div>
      )}
    </>
  );
};

export { RecentTransactions };
