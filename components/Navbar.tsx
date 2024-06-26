import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  console.log(`Navbar ${user}`);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
    router.push('/login'); // ログイン画面に遷移する
  };
  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">SNS Clone</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            {' '}
            {/* アイテムの中央揃えを追加してボタンとリンクの高さを揃えます */}
            {user ? (
              <>
                <li>
                  <Link
                    href={`/profile/${user.id}`}
                    className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  >
                    プロフィール
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  >
                    ログアウト
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  >
                    ログイン
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  >
                    サインアップ
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
