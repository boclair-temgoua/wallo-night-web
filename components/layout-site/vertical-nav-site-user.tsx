import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdImportContacts, MdOutlineEventAvailable } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { useState } from "react";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BiCog } from "react-icons/bi";

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
  const [navigationItems] = useState<NavbarProps[]>([
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
    {
      title: "Faq",
      href: "/faqs",
      icon: <FaQuestion className={classIcon} />,
    },
    {
      title: "About",
      href: "/about",
      icon: <TbArrowRoundaboutRight className={classIcon} />,
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      icon: <MdImportContacts className={classIcon} />,
    },
  ]);


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
