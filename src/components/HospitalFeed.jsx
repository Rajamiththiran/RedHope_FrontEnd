import HospitalEventFeed from "./hospital_event_feed";

const HospitalFeed = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Event Posts</h2>
        <HospitalEventFeed />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">Our Knowledge</h2>
        {/* Add knowledge component here when it's ready */}
      </section>
    </div>
  );
};

export default HospitalFeed;
