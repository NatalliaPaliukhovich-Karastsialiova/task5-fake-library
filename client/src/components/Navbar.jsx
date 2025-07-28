import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar bg-primary px-4 d-flex justify-content-between sticky-top">
      <h4 className="navbar-brand text-white">Fake Library Generator</h4>
    </nav>
  );
}
