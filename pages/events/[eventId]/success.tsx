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
import { Result } from "antd";
import TransactionSuccess from "@/pages/transactions/success";


const SuccessView = () => {
  const user = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={`Success validation`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
                  <div className="flow-root">
                    <div className="overflow-hidden bg-white border border-gray-200">
                      
                      <TransactionSuccess  />

                    </div>
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

export default PrivateComponent(SuccessView);
