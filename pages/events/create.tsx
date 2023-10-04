import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormEvent } from "@/components/event/create-or-update-form-event";

const PostsCreate = () => {

  return (
    <>
      <LayoutDashboard title={"Event create"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <CreateOrUpdateFormEvent />
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);
