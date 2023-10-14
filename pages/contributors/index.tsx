import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useEffect } from "react";
import { Input } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui";
import { GetInfiniteContributorsAPI } from "@/api-site/contributor";
import { useInView } from "react-intersection-observer";
import { ListContributors } from "@/components/contributor/list-contributors";

const Contributors = () => {
  const { push } = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributor,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteContributorsAPI({
    take: 10,
    sort: "DESC",
    queryKey: ["contributors", "infinite"],
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

  const dataTableContributors = isLoadingContributor ? (
    <LoadingFile />
  ) : isErrorContributor ? (
    <strong>Error find data please try again...</strong>
  ) : dataContributor?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataContributor.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <>
          <table className="min-w-full mt-4 lg:divide-y lg:divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              <ListContributors item={item} key={index} index={index} />
            </tbody>
          </table>
        </>
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Contributors"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <div className="flow-root">


                  <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-8">

                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
                            onClick={() => push(`/contributors/create`)}
                            shape="default"
                            type="button"
                            size="normal"
                            loading={false}
                            color={"indigo"}
                          >
                            Add Contributor
                          </ButtonInput>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Input placeholder="Search contributor" />
                        </div>
                      </div>

                      <div className="divide-y divide-gray-200">

                        {dataTableContributors}
                      </div>
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
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Contributors);
