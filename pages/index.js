import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to Study Buddy</h1>
        <p>Track your study sessions and stay on top of your goals.</p>
      </main>
      <Footer />
    </div>
  );
}
