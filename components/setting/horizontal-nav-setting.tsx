import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";

const HorizontalNavSetting: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Profile",
      href: "/settings",
    },
  ]);

  return (
    <>
      <div className="px-3 py-2 border-gray-200 border bg-white rounded-lg">
        <nav className="flex flex-wrap gap-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group whitespace-nowrap ${
                  isActive
                    ? `bg-gray-100 text-${profile?.color}-500`
                    : `text-gray-500 bg-transparent hover:text-${profile?.color}-500 hover:bg-gray-100 group`
                } `}
              >
                {item?.icon}

                {item?.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* <div className="px-3 py-2 border-gray-200 border-b">
                <nav className="flex flex-wrap gap-4">

                    {navigation.map((item: any, index: number) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={`${item.href}`}
                                title=""
                                className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                                    ? "text-indigo-600 border-indigo-600"
                                    : "border-transparent hover:border-gray-300"
                                    } `}
                            >
                                {item?.icon}

                                {item?.title}
                            </Link>
                        );
                    })}

                </nav>
            </div> */}
    </>
  );
};

export { HorizontalNavSetting };
