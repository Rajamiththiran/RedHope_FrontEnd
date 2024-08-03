import BloodCell from "./BloodCell";
// Assuming you have this component
import ThoughtLoader from "./thought_loader";

const DonorsFeed = () => {
  console.log("Rendering DonorsFeed component");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col relative">
      <h1 className="text-4xl font-bold text-red-500 py-6 text-center z-10 bg-red-950 bg-opacity-70 sticky top-0">
        Donor Feed
      </h1>

      <div className="flex-grow flex flex-col items-center justify-center p-4 overflow-y-auto">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

        <section className="w-full mb-8 z-10">
          <ThoughtLoader />
        </section>
        <section className="w-full mb-8 z-10"></section>
      </div>
    </div>
  );
};

export default DonorsFeed;
