import Link from 'next/link'; // Importing Link from Next.js for navigation between pages

export default function Navbar() {
  return (
    <nav> {/* Navbar container element */}
      <ul> {/* Unordered list for the navigation links */}
        {/* Navigation links using Next.js' Link component for client-side routing */}
        <li><Link href="/">Home</Link></li> {/* Link to the homepage */}
        <li><Link href="/sessions">Sessions</Link></li> {/* Link to the Sessions page */}
        <li><Link href="/goals">Goals</Link></li> {/* Link to the Goals page */}
      </ul>
    </nav>
  );
}
