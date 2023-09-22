"use client";

import Register from "@components/Register";
import Login from "@components/Login";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

const Home = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const { status } = useSession();
  if (status === "loading") {
    return <h1>please wait...</h1>;
  } else if (status === "authenticated") {
    return (
      <p>
        please wait while we are redirecting you
        <Link href="/profile" className="text-blue">
          redirect
        </Link>{" "}
      </p>
    );
  }

  return (
    <div>
      {isLoginPage ? (
        <Login setIsLoginPage={setIsLoginPage} />
      ) : (
        <Register setIsLoginPage={setIsLoginPage} />
      )}
    </div>
  );
};

export default Home;
