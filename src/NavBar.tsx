import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/about">
        <li>About</li>
      </Link>
      <Link to="/projects">
        <li>Projects</li>
      </Link>
    </nav>
  );
}

export default NavBar;
