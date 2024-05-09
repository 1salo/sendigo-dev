import { getServerSession } from "next-auth";
import SectionOne from "./components/sectionOne";
import SectionTwo from "./components/sectionTwo";
import SectionThree from "./components/sectionThree";
import PriceCalculator from "./components/priceCalc";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import PriceCompare from "./components/PriceCompare";

export default async function Home() {
  return (
    <>
      <MainLayout>
        <NavBar />
        <SectionOne />
        <PriceCalculator />
        <SectionTwo />
        <PriceCompare />
        <SectionThree />
        <Footer />
      </MainLayout>
    </>
  );
}
