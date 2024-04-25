import SignInForm from "@/app/components/auth/SignInForm";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="ml-8 mt-8">
        <Link href="/">
          <Image
            src="/images/sendigologo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
