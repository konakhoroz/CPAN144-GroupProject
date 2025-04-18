import dynamic from 'next/dynamic';

// Dynamically import Navbar and Footer components for better performance
const Navbar = dynamic(() => import('../components/Navbar'));
const Footer = dynamic(() => import('../components/Footer'));

export default function Home() {
  return (
    <div>
      {/* Render the Navbar component dynamically */}
      <Navbar />

      <main>
        {/* Main heading for the homepage */}
        <h1>Welcome to Study Buddy</h1>

        {/* Short description of the app's purpose */}
        <p>Track your study sessions and stay on top of your goals.</p>
      </main>

      {/* Render the Footer component dynamically */}
      <Footer />
    </div>
  );
}
