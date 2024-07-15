/* Components */
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import router from 'next/router';


const handleBack = () => {
    router.back();
  };

const Home = () => {

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <Nav />
            <main className="flex-grow flex flex-col items-center mt-5 px-4">
                <div className="flex justify-start">
                    <button onClick={handleBack} 
                    className="text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 hover:bg-gradient-to-l font-semibold text-lg p-2 border border-gray-700 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        Go Back
                    </button>
                </div> 
                <p className="flex justify-start my-32" >Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            </main>
            <Footer/>
        </div>
    );
};

export default Home;