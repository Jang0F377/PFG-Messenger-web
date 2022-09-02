import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PrimaryFeatures from "../components/PrimaryFeatures";
import Support from "../components/Support";
import Contact from "../components/Contact";

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
        <Support />
        <Contact />
      </main>
    </>
  );
};

export default Home;
