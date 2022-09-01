import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PrimaryFeatures from "../components/PrimaryFeatures";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PFG702-Sesh!</title>
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/*Pricing*/}
        {/*Contact*/}
      </main>
    </>
  );
};

export default Home;
