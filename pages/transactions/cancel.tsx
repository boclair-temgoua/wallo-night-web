import { Image } from "antd";
import { BiComment } from "react-icons/bi";
import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";

const TransactionCancel = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  return (
    <>

      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <h1>Susses</h1>
    </>
  );
};

export default TransactionCancel;
