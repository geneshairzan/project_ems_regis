import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../../pages/404";
import PAuth from "../../pages/auth";
import PAuthSuper from "../../pages/auth/super";
import { nav, extra } from "@/component/app/_nav";
import Context from "@/component/context";
import Layout from "../layout";
import Footer from "@/component/activeEvent/footer";

function navReducer(a, b) {
  let tmp = b.path ? [b.path] : b.child.reduce(navReducer, []);
  return [...a, ...tmp];
}

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const allowedModel = [...nav, ...extra].reduce(navReducer, []);
  const { auth, app } = React.useContext(Context);

  useEffect(() => {
    if (auth?.user?.id && router.asPath.includes("/auth")) {
      router.push("/super");
    }
  }, [auth?.user]);

  useEffect(() => {
    if (!router.asPath.includes("idcard") && app.get("onprint")) {
      setTimeout(() => {
        app.set("onprint", false);
      }, 1000);
    }
  }, [router.asPath]);

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
  if (!auth?.user?.id && router.asPath.includes("/auth/super")) return <PAuthSuper />;
  if (!auth?.user?.id && router.asPath.includes("/super")) return <PAuth />;
  if (router.asPath.includes("/super")) return <Layout>{children}</Layout>;

  return (
    <>
      {children}
      <Footer />
    </>
  );
}
