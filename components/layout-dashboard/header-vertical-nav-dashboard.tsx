import { VerticalNavDashboardAdmin } from "./vertical-nav-dashboard-admin";
import { VerticalNavDashboardUser } from "./vertical-nav-dashboard-user";

interface Props {
  user?: any;
}

const HeaderVerticalNavDashboard: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div className="hidden md:flex md:w-56 md:flex-col">
        <div className="flex flex-col pt-5 max-h-screen fixed bg-white">

          {user?.permission === 'ADMIN' && <VerticalNavDashboardAdmin user={user} />}
          
          {user?.permission === 'USER' && <VerticalNavDashboardUser user={user} />}

        </div>
      </div>
    </>
  );
};

export { HeaderVerticalNavDashboard };
