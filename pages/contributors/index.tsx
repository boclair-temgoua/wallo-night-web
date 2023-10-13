import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useState } from "react";
import { Avatar, Button, Input } from "antd";
import { EmptyData } from "@/components/ui/empty-data";
import { useRouter } from "next/router";
import { arrayTransactions } from "@/components/mock";
import { formatePrice } from "@/utils";
import { BiDotsHorizontal } from "react-icons/bi";
import { useAuth } from "@/components/util/context-user";

const Contributors = () => {
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
                  <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-8">

                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
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
                        {donationsArrays.length > 0 ? (
                          <table className="min-w-full mt-4 lg:divide-y lg:divide-gray-200">
                            <tbody className="divide-y divide-gray-200">
                              {donationsArrays.map((item: any, index) => (
                                <tr key={index}>
                                  <td className="py-4 text-sm font-bold text-gray-900">
                                    <div className="flex items-center flex-1 min-w-0">
                                      <Avatar
                                        size={50}
                                        src={item?.image}
                                        alt=""
                                      />
                                      <div className="flex-1 min-w-0 ml-4">
                                        <p className="text-sm font-bold text-gray-900">
                                          {item?.name}
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">
                                          {item?.email}
                                        </p>
                                        <p className="lg:hidden mt-1 text-sm font-medium text-gray-500 truncate">
                                          {item?.createdAt}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="hidden text-sm text-right font-medium text-gray-600 lg:table-cell">
                                    {item?.createdAt}
                                  </td>

                                  <td className="py-4 text-sm font-medium text-right text-gray-400">
                                    <Button
                                      type="text"
                                      shape="circle"
                                      icon={
                                        <BiDotsHorizontal className="w-5 h-5" />
                                      }
                                      size="small"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <EmptyData
                            title="Add your first donation to get started"
                            description={`Extras is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
                          />
                        )}
                      </div>

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

export default PrivateComponent(Contributors);
