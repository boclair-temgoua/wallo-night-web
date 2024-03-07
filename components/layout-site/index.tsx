import Head from "next/head";
import { useInputState } from "../hooks";
import { HeaderHorizontalNavSite } from "./header-horizontal-nav-site";
import Main from "./main";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutSite: React.FC<IProps> = ({ children, title }) => {
  const { userStorage } = useInputState();

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      {/* <div className="min-h-screen space-y-5"> */}
      <HeaderHorizontalNavSite user={userStorage} />

      <Main>{children}</Main>
      {/* </div> */}
    </>
  );
};

export { LayoutSite };
