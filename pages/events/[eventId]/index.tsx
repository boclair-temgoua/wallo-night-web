import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { Image } from "antd";
import { BiComment } from "react-icons/bi";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { GetOneEventAPI } from "@/api-site/event";
import { LayoutSite } from "@/components/layout-site";
import { HtmlParser } from "@/utils/html-parser";
import { viewOneFileUploadAPI } from "@/api-site/upload";
import { ButtonInput } from "@/components/ui";
import { formateDaysMonthYearFormatDays, formatePrice } from "@/utils";

const PostShow = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const eventSlug = String(query?.eventId);


  const {
    status,
    data: event,
  } = GetOneEventAPI({
    eventSlug: eventSlug
  });

  if (status === 'loading') {
    <strong>Loading...</strong>
  }


  return (
    <>
      <LayoutSite title={event?.title ?? ''}>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-5xl mx-auto">
            <div className="mt-12 sm:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
              
              <Image preview={false} className="object-cover w-full h-full"
                src={`${viewOneFileUploadAPI({
                  folder: 'events',
                  fileName: event?.uploadsImage?.[0].path,
                })}`}
                alt={event?.title} />


              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="mt-4 sm:mt-0">
                  <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{event?.title ?? ""}</h1>
                  <h1 className="mt-2 text-lg font-bold text-gray-900 sm:text-lg">Data</h1>
                  <p className="mt-1 text-base font-medium text-gray-900">{formateDaysMonthYearFormatDays(event?.dateEvent)}</p>
                  <h1 className="mt-2 text-lg font-bold text-gray-900 sm:text-lg">Località</h1>
                  <p className="mt-1 text-base font-medium text-gray-900">{event?.location}</p>
                  <h1 className="mt-2 text-lg font-bold text-gray-900 sm:text-lg">Indirizzo</h1>
                  <p className="mt-1 text-base font-medium text-gray-900">{event?.address}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="flex items-center mt-4">
                    <p className="text-4xl font-bold text-gray-900">
                      {formatePrice({
                        value: Number(event?.price ?? 0),
                        isDivide: false,
                      }) ?? ""}
                    </p>
                    <p className="ml-2 text-3xl font-bold text-gray-900">
                      {event?.currency}
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <ButtonInput
                      onClick={() => router.push(`/events/${event?.id}/checkout`)}
                      shape="default"
                      type="button"
                      size="large"
                      loading={false}
                      color={"red"}
                    >
                      Riserva un posto
                    </ButtonInput>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 sm:mt-16">
              <article className="prose lg:col-span-7 prose-blockquote:border-none prose-blockquote:text-lg prose-blockquote:bg-gray-100 prose-blockquote:leading-7 prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:px-8 prose-blockquote:py-5">
                <HtmlParser html={String(event?.description ?? "")} />
              </article>
            </div>

          </div>
        </div>








      </LayoutSite>
    </>
  );
};

export default PostShow;
