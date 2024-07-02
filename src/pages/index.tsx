
/* Components */
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Searchbar from '@/components/SearchBar';



const Home = () => {
  //testing the commit
  console.log("This is Home");
  
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 ">
      <Header />
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
