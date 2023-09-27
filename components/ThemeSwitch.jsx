"use client";
import React from "react";
import { useTheme } from "@context/ThemeContext";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme((prev) => (prev === "cool" ? "dark" : "cool"));
  };

  return (
    <div
      onClick={changeTheme}
      className={`cursor-pointer absolute top-0 right-0 h-6 px-3 rounded-bl-3xl aspect-video flex items-center bg-opposite transition-transform duration-150 ease-in`}
    ></div>
  );
};

export default ThemeSwitch;
