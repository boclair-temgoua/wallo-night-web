import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/components/util/context-user";
import { useEffect } from "react";
import { EmptyData } from "@/components/ui/empty-data";
import { ButtonInput } from "@/components/ui/button-input";
import { LoadingFile } from "@/components/ui/loading-file";
import { GetInfiniteOrderEventsAPI } from "@/api-site/order-event";
import { ListOrderEvents } from "@/components/order-event/list-order-events";

const OrderEvents = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;

  const {
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    data: dataEvent,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteOrderEventsAPI({
    userId: userStorage?.id,
    take: 10,
    sort: "DESC",
    queryKey: ["order-events", "infinite"],
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

  const dataTableEvents = isLoadingEvent ? (
    <LoadingFile />
  ) : isErrorEvent ? (
    <strong>Error find data please try again...</strong>
  ) : dataEvent?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title=""
      description={``}
    />
  ) : (
    dataEvent?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListOrderEvents item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Events"}>
        <div className="flex flex-col flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">

              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">



                <div className="flow-root">
                  <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-8">

                      <div className="divide-y divide-gray-200">
                        {dataTableEvents}
                      </div>

                    </div>
                  </div>
                  {hasNextPage && (
                    <div className="mt-4 text-center justify-center mx-auto">
                      <div className="mt-4 sm:mt-0">
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
                </div>

              </div>

            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(OrderEvents);
