import Account from "../components/dropdowns/account";
import Head from "next/head";
import Navbar from "../components/navbar";
import React from "react";

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>ReUse-It | Welcome.</title>
      </Head>
      <Navbar title="ReUse-It">
        <Account />
      </Navbar>
    </>
  );
};

export default Index;
