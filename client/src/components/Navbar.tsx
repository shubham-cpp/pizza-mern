import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = function (): ReactElement {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex justify-between bg-orange-600 p-3">
      <div>
        <Link className="link font-pushter text-yellow-200 text-2xl" to="/">
          Home
        </Link>
      </div>
      <div className="flex flex-col md:flex-row">
        <button
          type="button"
          className="md:hidden flex-grow-0"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className={`${open ? 'flex flex-col' : 'hidden'} md:flex`}>
          <Link
            className="link text-gray-200 text-lg font-semibold font-source-code"
            to="/about"
          >
            About
          </Link>
          <Link
            className="link text-gray-200 text-lg font-semibold font-source-code"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="link text-gray-200 text-lg font-semibold font-source-code"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
