"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const isUserLoggedIn = true;
  return (
    <nav className="flex-betwen w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="PromptMe logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptMe</p>
      </Link>

      {/* For Mobile */}
      <div className="sm:flex hidden">{isUserLoggedIn ? <></> : <></>}</div>
    </nav>
  );
};

export default Navbar;
