import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiHomeCircle,
  BiSearch,
  BiDetail,
  BiCog,
  BiLockOpen,
} from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { useState } from "react";

export type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  icon?: any;
};
const classIcon = "flex-shrink-0 w-5 h-5 mr-4";

const MONETIZE_ITEMS: NavbarProps[] = [
  {
    title: "Contributors",
    href: "/contributors",
    icon: <BiLockOpen className={classIcon} />,
  },
];

const SUPPORT_ITEMS = [
  {
    title: "Posts",
    href: "/posts",
    icon: <BiDetail className={classIcon} />,
  },
];

const SETTINGS_ITEMS = [
  {
    title: "Event",
    href: "/events",
    icon: <BsShop className={classIcon} />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <BiCog className={classIcon} />,
  },
];

interface Props {
  user?: any;
}

const VerticalNavDashboard: React.FC<Props> = ({ user }) => {
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: "Home",
      href: "/dashboard",
      icon: <BiHomeCircle className={classIcon} />,
    },
    {
      title: "Event",
      href: "/event",
      icon: <BiSearch className={classIcon} />,
    },
  ]);

  const [monetizeItems] = useState<NavbarProps[]>(MONETIZE_ITEMS);
  const [supportItems] = useState<NavbarProps[]>(SUPPORT_ITEMS);
  const [settingItems] = useState<NavbarProps[]>(SETTINGS_ITEMS);

  return (
    <>
      <div className="flex flex-col justify-between flex-1 h-full px-4 overflow-x-scroll">
        <div className="space-y-4">
          <nav className="flex-1 space-y-1">
            {navigationItems.map((item: any, index: number) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item?.title}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${
                    isActive
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

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Monetize
            </p>

            <nav className="flex-1 mt-4 space-y-1">
              {monetizeItems.map((item: any, index: number) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${
                      isActive
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
          </>

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Support
            </p>
            <nav className="flex-1 mt-4 space-y-1">
              {supportItems.map((item: any, index: number) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${
                      isActive
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
          </>

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Settings
            </p>
            <nav className="flex-1 mt-4 space-y-1">
              {settingItems.map((item: any, index: number) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${
                      isActive
                        ? `text-white bg-${user?.profile?.color}-600`
                        : "hover:bg-gray-200 text-gray-900"
                    } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              <a
                href="#"
                title=""
                className="flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </a>
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };
