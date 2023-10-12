import { useState } from "react";
import { Drawer } from "antd";
import { HorizontalNavSite } from "./horizontal-nav-site";
import { VerticalNavSite } from "./vertical-nav-site";

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
        title=""
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col pt-5 overflow-y-auto">
          <VerticalNavSite user={user} />
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavSite };
