import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/images/sendigologo.png"
      alt="Logo"
      width={100}
      height={50}
      className="mr-5"
    />
  );
};

export default Logo;
