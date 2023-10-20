import { useState } from "react";
import { Drawer } from "antd";
import { HorizontalNavSite } from "./horizontal-nav-site";
import { VerticalNavSiteUser } from "./vertical-nav-site-user";
import { VerticalNavSiteAdmin } from "./vertical-nav-site-admin";

interface Props {
  user?: any;
}

const HeaderHorizontalNavSite: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen((item) => !item);
  };
  const onClose = () => {
    setOpen((item) => !item);
  };

  return (
    <>
      <HorizontalNavSite showDrawer={showDrawer} user={user} />

      <Drawer
        title={process.env.NEXT_PUBLIC_NAME_SITE}
        placement="left"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col pt-5 overflow-y-auto">

          {user?.permission === 'ADMIN' && <VerticalNavSiteAdmin user={user} />}

          {user?.permission === 'USER' && <VerticalNavSiteUser user={user} />}

        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavSite };
