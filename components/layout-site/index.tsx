import Head from "next/head";
import Main from "./main";
import { useAuth } from "../util/session/context-user";
import { HeaderHorizontalNavSite } from "./header-horizontal-nav-site";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutSite: React.FC<IProps> = ({ children, title }) => {
  const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      {/* <div className="min-h-screen space-y-5"> */}
      <HeaderHorizontalNavSite user={user} />

      <Main>{children}</Main>
      {/* </div> */}
    </>
  );
};

export { LayoutSite };