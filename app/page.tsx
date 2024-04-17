import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SectionOne from "./components/sectionOne";
import SectionTwo from "./components/sectionTwo";
import SectionThree from "./components/sectionThree";
import PriceCalculator from "./components/priceCalc";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      {/* <h1>Hello {session && <span>{session.user!.email}</span>}</h1> */}
      <SectionOne />
      <PriceCalculator />
      <SectionTwo />
      <SectionThree />
    </main>
  );
}
