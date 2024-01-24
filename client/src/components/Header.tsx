import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Header: FC = () => {
  const { auth } = useAuth();
  const logout = useLogout();

  return (
    <div className="bg-white shadow">
      <nav className="w-full flex justify-between items-center mx-auto h-14 max-w-6xl px-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-semibold text-green-800 leading-none"
          >
            MERN Project
          </Link>
        </div>

        {auth.token != '' ? (
          <div className="flex justify-end items-center">
            <div className="flex items-center">
              <button
                onClick={() => logout()}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end items-center">
            <div className="flex items-center">
              <Link
                to="/login"
                className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
