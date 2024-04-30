"use client";

import DashboardNavBar from "@/app/dashboard/dashboardComponents/DashboardNavBar";
import DashboardStickyFooter from "@/app/dashboard/dashboardComponents/DashboardStickyFooter";
import NewShipmentPackageForm from "@/app/dashboard/dashboardComponents/newshipmentPackageForm";
import ReceiverCard from "@/app/dashboard/dashboardComponents/receiverCard";
import SenderCard from "@/app/dashboard/dashboardComponents/senderCard";
import SummaryCard from "@/app/dashboard/dashboardComponents/summaryCard";

const NewShipmentPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavBar />

      <div className="px-4 py-4 flex flex-col lg:flex-row justify-center gap-4">
        {/* Place SenderCard and ReceiverCard in a flex container */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full lg:max-w-5xl xl:max-w-6xl ml-3 ">
          <div className="flex-1">
            <SenderCard />
          </div>

          <div className="flex-1">
            <ReceiverCard />
          </div>
        </div>

        <div className="hidden lg:block lg:relative lg:right-4 lg:flex-1 lg:ml-7">
          <div className="lg:sticky lg:top-16 lg:overflow-y-auto lg:max-h-screen shadow-md">
            <SummaryCard />
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-4 lg:hidden">
        <NewShipmentPackageForm />
      </div>

      <div className="hidden lg:block w-full lg:w-1/3 xl:w-2/5 px-4 mt-4">
        <NewShipmentPackageForm />
      </div>
      <DashboardStickyFooter buttonLabel="Lägg i sändningslistan" />
    </div>
  );
};

export default NewShipmentPage;
