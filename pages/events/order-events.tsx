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
import { useQrcodeScanner } from "@/components/hooks/use-qrcode-scanner ";
import { HorizontalNavEvent } from "@/components/event/horizontal-nav-event";

const EventOrderEvents = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;

  const { scanResult } = useQrcodeScanner()

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
      <LayoutDashboard title={"Order Events"}>

        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

                <HorizontalNavEvent />

                <div className="flow-root">
                  <div className="mt-8 px-3 py-2 bg-white border border-gray-200 rounded-lg">

                    {scanResult ? <div>{scanResult}</div> : <div id="reader-qrcode-scaner"></div>}

                  </div>


                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(EventOrderEvents);
