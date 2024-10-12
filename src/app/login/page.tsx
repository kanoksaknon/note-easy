'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.error(result.error);
        // Show error message to user
      }
    } catch (error) {
      console.error('Login failed', error);
      // Show error message to user
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form onSubmit={handleEmailLogin} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-blue-950">Sign In</h3>
              <p className="mb-4 text-gray-900">Enter your email and password</p>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-violet-900 bg-gray-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
              >
                <Image src="/images/google.png" width={30} height={30} alt="Google logo" />
                Sign in with Google
              </button>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-zinc-500 grow" />
                <p className="mx-4 text-zinc-500">or</p>
                <hr className="h-0 border-b border-solid border-zinc-500 grow" />
              </div>
              <label htmlFor="email" className="mb-2 text-sm text-start text-gray-900">Email*</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@example.com"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 bg-gray-200 text-black rounded-2xl"
                required
              />
              <label htmlFor="password" className="mb-2 text-sm text-start text-gray-900">Password*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 bg-gray-200 text-black rounded-2xl"
                required
              />
              <div className="flex flex-row justify-between mb-8">
                <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                    {keepLoggedIn && (
                      <Image
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                  <span className="ml-3 text-sm font-normal text-violet-900">Keep me logged in</span>
                </label>
                <a href="#" className="mr-4 text-sm font-medium text-violet-950">Forget password?</a>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-indigo-900"
              >
                Sign In
              </button>
              <p className="text-sm leading-relaxed text-gray-900">
                Not registered yet? <a href="#" className="font-bold text-grey-700">Create an Account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;



/*import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.error(result.error);
        // แสดงข้อความ error ให้ผู้ใช้
      }
    } catch (error) {
      console.error('Login failed', error);
      // แสดงข้อความ error ให้ผู้ใช้
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleEmailLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        
        <button className="bg-sky-500/100" type="submit">Login with Email</button>
      </form>

      <div className="separator">OR</div>

      <button onClick={handleGoogleLogin} className="google-login-button">
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default LoginForm;
*/
