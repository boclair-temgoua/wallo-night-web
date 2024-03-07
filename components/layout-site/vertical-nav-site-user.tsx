import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SETTINGS_ITEMS } from "../layout-dashboard/vertical-nav-dashboard-user";

export type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  icon?: any;
};
const classIcon = "flex-shrink-0 w-5 h-5 mr-4";


interface Props {
  user?: any;
}

const VerticalNavSiteUser: React.FC<Props> = ({ user }) => {
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>(SETTINGS_ITEMS);


  return (
    <>
      <div className="flex flex-col justify-between flex-1 h-full px-4 overflow-x-scroll">
        <div className="space-y-4">

          <nav className="flex-1 space-y-4">
            {navigationItems.map((item: any, index: number) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item?.title}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                    ? `text-white bg-${user?.profile?.color}-600`
                    : "hover:bg-gray-200 text-gray-900"
                    } `}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </>
  );
};

export { VerticalNavSiteUser };
