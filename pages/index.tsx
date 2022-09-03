import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PrimaryFeatures from "../components/PrimaryFeatures";
import Support from "../components/Support";
import Contact from "../components/Contact";
import { ProductPageFooter } from "../components/Footers";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PreFireGaming-Sesh!</title>
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Support />
        <Contact />
      </main>
      <ProductPageFooter />
    </>
  );
};

export default Home;
