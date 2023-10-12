import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { Image } from "antd";
import { BiComment } from "react-icons/bi";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { GetOneEventAPI } from "@/api-site/event";
import { LayoutSite } from "@/components/layout-site";

const PostShow = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const eventSlug = String(query?.eventId);


  const {
    status,
    data: event,
  } = GetOneEventAPI({
    eventSlug: eventSlug
  });

  if (status === 'loading') {
    <strong>Loading...</strong>
  }


  return (
    <>
      <LayoutSite title={event?.title ?? ''}>


     




      </LayoutSite>
    </>
  );
};

export default PostShow;
