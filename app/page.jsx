"use client";

import Register from "@components/Register";
import Login from "@components/Login";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ThemeSwitch from "@components/ThemeSwitch";

const Home = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <h1>please wait...</h1>;
  } else if (status === "authenticated") {
    return router.push("/profile");
  }

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <ThemeSwitch />
      {isLoginPage ? (
        <Login setIsLoginPage={setIsLoginPage} />
      ) : (
        <Register setIsLoginPage={setIsLoginPage} />
      )}
    </div>
  );
};

export default Home;
