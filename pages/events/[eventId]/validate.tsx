"use client";

import { useRouter } from "next/router";
// import { GetOneMembershipAPI } from "@/api-site/membership";
import { useForm } from "react-hook-form";
import { LoadingFile } from "@/components/ui/loading-file";
import { useAuth } from "@/components/util/context-user";
import { GetOneOrderEventAPI } from "@/api-site/order-event";
import LayoutDashboard from "@/components/layout-dashboard";
import { PrivateComponent } from "@/components/util/private-component";
import { ValidateOrderEvent } from "@/components/event/validate-oder-event";


const ValidateView = () => {
  const user = useAuth() as any;
  const { back, query, push } = useRouter();
  const orderEventId = String(query?.eventId);
  const { isError: isErrorOrderEvent,
    isLoading: isLoadingOrderEvent,
    data: item
  } = GetOneOrderEventAPI({
    orderEventId,
  });

  const dataTableOrderEvent = isLoadingOrderEvent ? (
    <LoadingFile />
  ) : isErrorOrderEvent ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <>
      {user?.permission === 'ADMIN' && (
        <ValidateOrderEvent
          orderEvent={item}
        />
      )}

    </>
  );

  return (
    <>
      <LayoutDashboard title={`Validate ${item?.event?.title ?? ""}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTableOrderEvent}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ValidateView);
