"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface LoginComponentProps {
  providers: any; // Using `any` type for providers
}

export default function LoginComponent({ providers }: LoginComponentProps) {

  useEffect(() => {
    console.log(providers);
  },[])
  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {providers && Object.values(providers).map((provider: any) => (
            <div key={provider.id} className="text-center">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
              >
                <span>{provider.name}でログイン</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
