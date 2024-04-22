import { getServerSession } from "next-auth";
import SectionOne from "./components/sectionOne";
import SectionTwo from "./components/sectionTwo";
import SectionThree from "./components/sectionThree";
import PriceCalculator from "./components/priceCalc";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <MainLayout>
      <NavBar />
      <SectionOne />
      <PriceCalculator />
      <SectionTwo />
      <SectionThree />
      <Footer />
    </MainLayout>
  );
}
