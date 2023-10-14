import { LoadingFile } from "@/components/ui/loading-file";
import { GetInfiniteEventsAPI } from "@/api-site/event";
import { LayoutSite } from "@/components/layout-site";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ListPublicEvents from "@/components/event/list-public-events";

const PostShow = () => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
    data: dataEvents,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteEventsAPI({
    take: 10,
    sort: "DESC",
    status: 'ACTIVE',
    queryKey: ['events', "infinite"]
  });

  useEffect(() => {
    let fetching = false;
    if (inView && hasNextPage) {
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

  const dataTableEvents = isLoadingEvents ? (
    <LoadingFile />
  ) : isErrorEvents ? (
    <strong>Error find data please try again...</strong>
  ) : dataEvents?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataEvents.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListPublicEvents item={item} key={index} />
      ))
  );


  return (
    <>
      <LayoutSite title={'Events'}>

        <div className="py-4 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* <div className="grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"> */}
          <div className="grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">

            {dataTableEvents}
            {/* {dataTableEvents}
            {dataTableEvents} */}

          </div>
        </div>

      </LayoutSite>
    </>
  );
};

export default PostShow;
