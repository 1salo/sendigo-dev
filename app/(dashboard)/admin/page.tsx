import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      {/* <h1>Hello {session && <span>{session.user!.email}</span>}</h1> */}
    </div>
  );
};

export default page;
