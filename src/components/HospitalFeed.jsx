import BloodCell from "./BloodCell";
import DonationEventLoader from "./donation_event_loader";
import KnowledgeLoader from "./knowledge_loader";

const HospitalFeed = () => {
  console.log("Rendering HospitalFeed component");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col relative overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
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

        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center z-10">
          Hospital Feed
        </h1>

        <section className="w-full mb-8 z-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4 text-center">
            Donation Events
          </h2>
          <DonationEventLoader />
        </section>

        <section className="w-full z-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4 text-center">
            Knowledges
          </h2>
          <KnowledgeLoader />
        </section>
      </div>
    </div>
  );
};

export default HospitalFeed;
