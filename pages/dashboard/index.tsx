import { useInputState } from "@/components/hooks";
import LayoutDashboard from "@/components/layout-dashboard";
import { arrayTransactions } from "@/components/mock";
import { RecentTransactions } from "@/components/transaction/recent-transactions";
import { PrivateComponent } from "@/components/util/private-component";
import { formatePrice } from "@/utils";
import { AvatarComponent } from "@/utils/avatar-component";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiCog } from "react-icons/bi";
import { IoShareOutline } from "react-icons/io5";


const Dashboard = () => {
  const { userStorage } = useInputState();
  const router = useRouter();
  const [donationsArrays] = useState(arrayTransactions || []);

  console.log('user ========>', userStorage)







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
                        <AvatarComponent size={60} profile={userStorage?.profile} />
                      </div>

                      <div className="ml-4 cursor-pointer">
                        <p className="text-xl font-bold text-gray-900">
                          {userStorage?.profile?.firstName ?? ''} {userStorage?.profile?.lastName ?? ''}
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
                        value: Number(userStorage?.wallet?.amount ?? 0),
                        isDivide: true,
                      }) ?? ""} EUR</p>
                    </div>

                  </div>

                  {/* <QrScanner
                    // onError={handleError}
                    // onScan={handleScan}
                    // chooseDeviceId={()=>selected}
                    // style={{ width: "300px" }}
                    onDecode={(result) => console.log(result)}
                    onError={(error) => console.log(error?.message)}
                  /> */}


                  {userStorage?.id ? <RecentTransactions /> : null}


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
