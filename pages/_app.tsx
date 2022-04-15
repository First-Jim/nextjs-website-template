import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "react-typist/dist/Typist.css";
import "aos/dist/aos.css"; // elements animate when on scroll
import themes from "../themes";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import Aos from "aos";
import nprogress from "nprogress";
import { Layout } from "@/components/Layout";
import Header from "components/Header";
import ContactUs from "@/components/Layout/contactUs";
import Footer from "components/Footer";

Router.events.on("routeChangeStart", () => {
  nprogress.start();
});

Router.events.on("routeChangeComplete", () => {
  nprogress.done();
});

Router.events.on("routeChangeError", () => {
  nprogress.done();
});

function MyApp({ Component, pageProps }) {
  console.log("pageProps: ", pageProps);
  const { statusCode } = pageProps;
  const currentPagePath = useRouter().asPath;
  console.log("currentPagePath: ", currentPagePath);

  useEffect(() => {
    const onResize = () => {
      const screenWidth = window.innerWidth;
      console.log("screenWidth: ", screenWidth);
      document.documentElement.style.fontSize =
        Math.max(screenWidth / 19.2, 40) + "px";
    };

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    Aos.init({
      mirror: true,
    });
  }, []);

  if (statusCode) {
    return <Component {...pageProps} />;
  }
  return (
    <ThemeProvider theme={themes}>
      <Layout>
        <Header path={currentPagePath} />
        <Component {...pageProps} />
        <ContactUs />
        <Footer></Footer>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
