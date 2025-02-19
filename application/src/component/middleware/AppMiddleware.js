import React, { useEffect } from "react";
import { useRouter } from "next/router";
import P404 from "../../pages/404";
import PAuth from "../../pages/auth";
import Context from "@/component/context";

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const { auth } = React.useContext(Context);

  useEffect(() => {
    if (auth?.user?.id && router.asPath == "/") {
      router.push("/home");
    }
  }, [auth?.user]);

  // return;

  function isAllowed(params) {
    return true;
    // if (
    //   router.pathname == "/" ||
    //   allowedModel.includes(router.asPath) ||
    //   // allowedModel.map((d) => d.replaceAll("/", "")).includes(router?.query?.model) ||
    //   allowedModel.map((d) => d.replaceAll("/", "")).includes(router.asPath.split("/")[1]) ||
    //   router.asPath.includes("/home") ||
    //   router.asPath.includes("/family") ||
    //   router.asPath.includes("/p/")
    // ) {
    //   return true;
    // }
    return false;
  }
  if (!isAllowed()) return <P404 />;
  if (!auth?.user?.id) return <PAuth />;
  return <Layout>{children}</Layout>;
}

function Layout({ children }) {
  const router = useRouter();
  return <>{children}</>;
}
