import { motion } from "framer-motion";

function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-[#167895] text-white p-10 flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 20 }}
          transition={{ duration: 1.8 }}
        >
          <h1 className="text-3xl font-bold">
            Unlock The Full Power of Your Marketing
          </h1>
          <p className="mt-4 text-sm opacity-80">
            Just a few steps and you'll be ready to automate...
          </p>
        </motion.div>

        {/* Floating cards (we'll animate next) */}
        <div className="relative h-60">
          <motion.div
            className="absolute bg-white text-black p-4 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 20 }}
            transition={{ duration: 1.8 }}
          >
            Campaign Performance 📊
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
