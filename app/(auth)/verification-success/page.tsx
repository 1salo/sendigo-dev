import Link from "next/link";

const VerificationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1>Email verifierad</h1>
      <p>Din e-post har verifierats. Du kan nu komma åt alla funktioner</p>
      <Link href="sign-in" className="text-blue-500 hover:underline mt-4">
        Gå till logga in sidan
      </Link>
    </div>
  );
};

export default VerificationSuccess;
