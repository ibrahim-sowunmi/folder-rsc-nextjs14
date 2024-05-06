// components/Navbar.tsx
import React from 'react';
import UserAvatar from './UserAvatar';
import { SignIn } from '../auth/signin-button';
import { getSessionUser } from '@/lib/auth-helper';
import SettingsModal from './SettingsModal';

const Navbar: React.FC = async () => {

  const isLoggedIn = await getSessionUser();

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Pablo</a>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {
          isLoggedIn ? <UserAvatar /> : <SignIn />
        }
        <SettingsModal />
      </div>
    </nav>
  );
};

export default Navbar;
