import Contact from "@/components/ContactForm/Contact";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function ContactPage() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <Contact />
      <div>
        <Footer />
      </div>
    </div>
  );
}
