
"use client";

/* Components */
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center">
        <div>
          <SearchBar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
