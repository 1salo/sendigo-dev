import SignUpForm from "@/app/components/auth/SignUpForm";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
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
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
