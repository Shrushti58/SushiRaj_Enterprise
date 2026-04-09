export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>

        <div className="mt-6 space-y-3 text-gray-600">
          <p>📞 +91 9876543210</p>
          <p>📍 Pune, Maharashtra</p>
        </div>

        <form className="mt-8 max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full border p-3 rounded-lg"
          />

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}