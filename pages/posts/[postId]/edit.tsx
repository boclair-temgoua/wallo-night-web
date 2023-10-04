import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { useRouter } from "next/router";
import { GetOnePostAPI } from "@/api-site/post";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui/loading-file";

const PostsCreate = () => {
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const { type } = query;
  const postId = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({
    postId,
    userId: userStorage?.id,
    type: String(type),
  });

  const dataTablePost = isLoadingPost ? (
    <LoadingFile />
  ) : isErrorPost ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <>

      {post?.id && type === "article" ? (
        <CreateOrUpdateFormPost
          uploadImages={post?.uploadsImage}
          post={post} postId={postId}
        />
      ) : null}
    </>
  );

  return (
    <>
      <LayoutDashboard title={`${post?.title ?? ""}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTablePost}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);
