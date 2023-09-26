"use client";
import React, { useState } from "react";

const ThemeSwitch = () => {
  const setTheme = () => {
    const currTheme = localStorage.getItem("theme");
    const themeToBe = currTheme === "cool" ? "dark" : "cool";
    //setting up theme
    document.documentElement.setAttribute("data-theme", themeToBe);
    localStorage.setItem("theme", themeToBe);
  };
  return (
    <div
      onClick={setTheme}
      className={`cursor-pointer absolute top-0 right-0 h-6 px-3 rounded-bl-3xl aspect-video flex items-center bg-opposite transition-transform duration-150 ease-in`}
    ></div>
  );
};

export default ThemeSwitch;
