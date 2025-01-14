
/* Components */
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Searchbar from '@/components/SearchBar';

/* Home Page */
const Home = () => {
  
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 ">
      <Nav />
      <main className="flex-grow flex flex-col items-center ">
        <div>
          <Searchbar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
