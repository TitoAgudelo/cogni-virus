"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky flex justify-center items-center bg-fuchsia-950 h-16">
      <div className="container mx-auto flex items-center">
        <div className="flex flex-row items-center">
          <Link className="flex flex-row items-center" href="/">
            <Image src="/assets/logo.png" alt="Home" width="35" height="35" />
            <p className="text-white text-base font-medium ml-2">
              Survival Nexus
            </p>
          </Link>
        </div>
        <nav className="flex flex-row items-center ml-20">
          <ul className="flex flex-row items-center">
            <li
              className={`link ${
                pathname === "/"
                  ? "flex items-center px-10 h-11 cursor-pointer active:bg-zinc-900 hover:bg-zinc-900 bg-bg-zinc-900"
                  : "flex items-center px-10 h-11 cursor-pointer active:bg-zinc-900 hover:bg-zinc-900"
              }`}
            >
              <Link className="text-white" href="/">
                Report
              </Link>
            </li>
            <li
              className={`link ${
                pathname === "/survivors"
                  ? "flex items-center px-10 h-11 cursor-pointer active:bg-zinc-900 hover:bg-zinc-900 bg-zinc-900"
                  : "flex items-center px-10 h-11 cursor-pointer active:bg-zinc-900 hover:bg-zinc-900"
              }`}
            >
              <Link className="text-white" href="/survivors">
                Survivors
              </Link>
            </li>
            <li
              className={`link ${
                pathname === "/inventory"
                  ? "flex items-center px-10 h-11 cursor-pointer active:bg-zinc-900 hover:bg-zinc-900 bg-zinc-900"
                  : "flex items-center px-10 h-11 cursor-pointer active:bg-zinc-900 hover:bg-zinc-900"
              }`}
            >
              <Link className="text-white" href="/inventory">
                Inventory
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ml-auto">
          <Image src="/assets/user.png" alt="user" width="35" height="35" />
        </div>
      </div>
    </header>
  );
};

export default Header;
