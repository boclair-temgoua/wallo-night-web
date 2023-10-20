import { Drawer } from "antd";
import { VerticalNavDashboardAdmin } from "./vertical-nav-dashboard-admin";
import { useState } from "react";
import { HorizontalNavDashboard } from "./horizontal-nav-dashboard";
import { VerticalNavDashboardUser } from "./vertical-nav-dashboard-user";

interface Props {
  user?: any;
}

const HeaderHorizontalNavDashboard: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen((item) => !item);
  };
  const onClose = () => {
    setOpen((item) => !item);
  };

  return (
    <>
      <HorizontalNavDashboard showDrawer={showDrawer} user={user} />

      {/* Fix Drawer */}

      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col pt-5 overflow-y-auto">
        {user?.permission === 'ADMIN' && <VerticalNavDashboardAdmin user={user} />}
          
          {user?.permission === 'USER' && <VerticalNavDashboardUser user={user} />}
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavDashboard };
