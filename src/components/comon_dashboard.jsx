import { useState } from "react";
import BloodCell from "./BloodCell";
import CommonGraph from "./CommonGraph";
import CommonSideNavMenu from "./CommonSideNavMenu";
import CommonSideNavToggle from "./CommonSideNavToggle";

const CommonDashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-100 to-white overflow-hidden">
      <CommonSideNavToggle isOpen={isSideNavOpen} onClick={toggleSideNav} />
      <CommonSideNavMenu
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
      />

      <div className="absolute inset-0">
        <BloodCell
          className="absolute top-1/12 left-1/12 animate-float"
          size={14}
        />
        <BloodCell
          className="absolute top-3/4 right-1/12 animate-float-delay-1"
          size={16}
        />
        <BloodCell
          className="absolute bottom-1/6 left-1/2 animate-float-delay-2"
          size={12}
        />
        <BloodCell
          className="absolute top-1/5 right-1/4 animate-float"
          size={15}
        />
        <BloodCell
          className="absolute bottom-1/3 left-1/6 animate-float-delay-1"
          size={13}
        />
        <BloodCell
          className="absolute top-2/3 right-1/3 animate-float-delay-2"
          size={14}
        />
      </div>

      <div className="relative z-10 p-8 pt-24">
        {" "}
        {/* Added pt-24 for top padding */}
        <section
          id="donation-events"
          className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-green-500"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Donation Events Posts
          </h2>
          {/* Content for donation events posts will go here */}
        </section>
        <div className="border-t border-green-300 my-8"></div>
        <section
          id="donor-thoughts"
          className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-green-500"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Thoughts of Donors
          </h2>
          {/* Content for thoughts of donors will go here */}
        </section>
        <div className="border-t border-green-300 my-8"></div>
        <section
          id="hospital-knowledge"
          className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-green-500"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Knowledges from Hospitals
          </h2>
          {/* Content for knowledges from hospitals will go here */}
        </section>
        <div className="border-t border-green-300 my-8"></div>
        <section
          id="graphs"
          className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500"
          style={{ height: "400px" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">Graphs</h2>
          <CommonGraph />
        </section>
      </div>
    </div>
  );
};

export default CommonDashboard;
