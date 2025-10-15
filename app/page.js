import React from "react";
import Image from "next/image";
import Link from "next/link";
import Chat from "./chat";
// import Openai from "./openai";
import Googleai from "./googleai";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Welcome to{" "}
          <code className="font-mono font-bold">Topper Home Tuition</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black">
        {/* <Chat text="Hello! How can you assist me today?" /> */}
        {/* <Openai /> */}
        <Googleai />
        </div>
      </div>
    </main>
  );
}
