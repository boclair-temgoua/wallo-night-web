import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiCog,
} from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/router";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { MdOutlineEventAvailable } from "react-icons/md";

export type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  icon?: any;
};
const classIcon = "flex-shrink-0 w-5 h-5 mr-4";


const SETTINGS_ITEMS = [
  {
    title: "Order event",
    href: "/order-events",
    icon: <LiaMoneyBillWaveSolid className={classIcon} />,
  },
  {
    title: "Events",
    href: "/events/our-events",
    icon: <MdOutlineEventAvailable className={classIcon} />,
  },
  {
    title: "Account",
    href: "/settings",
    icon: <BiCog className={classIcon} />,
  },
];

interface Props {
  user?: any;
}

const VerticalNavDashboardUser: React.FC<Props> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [settingItems] = useState<NavbarProps[]>(SETTINGS_ITEMS);

  const logoutUser = () => {
    localStorage.removeItem(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
    router.push(`${`/`}`);
  }
  return (
    <>
      <div className="flex flex-col justify-between flex-1 h-full px-4 overflow-x-scroll">
        <div className="space-y-4">

          <nav className="flex-1 space-y-4">
            {settingItems.map((item: any, index: number) => {
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

            <a
              href={void (0)}
              title=""
              onClick={() => logoutUser()}

              className="flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group cursor-pointer"
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

        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboardUser };
