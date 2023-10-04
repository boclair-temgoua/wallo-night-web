import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { CreateOrUpdateFormEvent } from "@/components/event/create-or-update-form-event";
import { GetOneEventAPI } from "@/api-site/event";
import { GetUploadsAPI } from "@/api-site/upload";

const EventsEdit = () => {
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const eventId = String(query?.eventId);

  const {
    data: event,
    isError: isErrorEvent,
    isLoading: isLoadingEvent,
  } = GetOneEventAPI({
    eventId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: "image",
    model: "event",
    organizationId: userStorage?.organizationId,
    uploadableId: eventId,
  });

  const dataTablePost = isLoadingImageUploads || isLoadingEvent ? (
    <LoadingFile />
  ) : isErrorImageUploads || isErrorEvent ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <>

      <CreateOrUpdateFormEvent
        uploadImages={dataImageUploads?.data}
        event={event} eventId={eventId}
      />
    </>
  );

  return (
    <>
      <LayoutDashboard title={`${event?.title ?? ""}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTablePost}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(EventsEdit);
