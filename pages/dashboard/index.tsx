import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useState } from "react";
import { Avatar, Button } from "antd";
import { EmptyData } from "@/components/ui/empty-data";
import { useRouter } from "next/router";
import { arrayTransactions } from "@/components/mock";
import { formatePrice } from "@/utils";
import { BiCog, BiDotsHorizontal } from "react-icons/bi";
import Link from "next/link";
import { IoShareOutline } from "react-icons/io5";
import { useAuth } from "@/components/util/context-user";
import { RecentTransactions } from "@/components/transaction/recent-transactions";

const Dashboard = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const [donationsArrays] = useState(arrayTransactions || []);

  console.log('user ========>', user)

  return (
    <>
      <LayoutDashboard title={"Dashboard"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <div className="flow-root">
                  <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 cursor-pointer">
                        <Avatar
                          size={60}
                          className="object-cover w-10 h-10 rounded-full"
                          src="https://picsum.photos/seed/6JySCJv/640/480"
                          alt={`${user?.profile?.firstName ?? ''} ${user?.profile?.lastName ?? ''}`}
                        />
                      </div>

                      <div className="ml-4 cursor-pointer">
                        <p className="text-xl font-bold text-gray-900">
                          {user?.profile?.firstName ?? ''} {user?.profile?.lastName ?? ''}
                        </p>
                      </div>

                      <div className="ml-auto">
                        <button
                          title="Share"
                          className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                        >
                          <IoShareOutline className="w-5 h-5" />
                        </button>
                        <button
                          title="Download"
                          className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                        >
                          <BiCog className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center mt-3">
                      <p className="text-3xl font-bold">{formatePrice({
                        value: Number(user?.wallet?.amount ?? 0),
                        isDivide: true,
                      }) ?? ""} EUR</p>
                    </div>
                  </div>

               
                  {user?.id ? <RecentTransactions userId={user?.profile?.userId} /> : null}

                  
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Dashboard);
