"use client";
import { useRouter } from "next/navigation";

import { MontserratText } from "../ui/FontWrappers";

export default function LoginPage() {

      const router = useRouter();

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // bisa tambahkan validasi login di sini
    router.push("/"); // pindah halaman
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('images/vision.jpg')",
      }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <MontserratText className="text-3xl font-bold text-white text-center mb-8">
          Login
        </MontserratText>

        <form className="space-y-6">
          <div>
            <label className="block text-sm text-gray-200 mb-1">Username</label>
            <div className="flex items-center border-b border-gray-300/40 focus-within:border-white">
              <input
                type="text"
                className="bg-transparent w-full text-white placeholder-gray-400 outline-none py-2 px-2"
                placeholder="Enter your username"
              />
              <span className="text-gray-400 pr-2">
                <i className="fa-regular fa-envelope"></i>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <div className="flex items-center border-b border-gray-300/40 focus-within:border-white">
              <input
                type="password"
                className="bg-transparent w-full text-white placeholder-gray-400 outline-none py-2 px-2"
                placeholder="Enter your password"
              />
              <span className="text-gray-400 pr-2">
                <i className="fa-solid fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
