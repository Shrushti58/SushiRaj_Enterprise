const services = [
  "RO Installation",
  "Water Filter Service",
  "AMC Maintenance",
  "Repair & Support",
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {services.map((s) => (
            <div
              key={s}
              className="bg-white shadow-md p-6 rounded-xl text-center"
            >
              <h3 className="font-semibold text-lg">{s}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}