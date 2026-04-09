const products = [
  { name: "RO Purifier Basic", price: "₹7,999" },
  { name: "Advanced RO System", price: "₹12,999" },
  { name: "Commercial Filter", price: "₹25,000" },
];

export default function Products() {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Products
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {products.map((p) => (
            <div key={p.name} className="border p-6 rounded-xl text-center">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-blue-600 mt-2">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}