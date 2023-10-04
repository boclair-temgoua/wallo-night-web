import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { useRouter } from "next/router";

const PostsCreate = () => {
  const { query } = useRouter();
  const { type } = query;

  return (
    <>
      <LayoutDashboard title={"Posts create"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {type === "article" ? <CreateOrUpdateFormPost /> : null}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);
