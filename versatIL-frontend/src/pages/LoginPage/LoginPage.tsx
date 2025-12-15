import { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../service/user-service";
import type { LoginUserRequest, User } from "../../model/user/user";
import { Cache } from "../../service/cache";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const cache = Cache.getCache()
      const usr = await cache.getItem("currentUser")
      if (usr) {
        navigate("/Dashboard")
      }
    }
    getUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    const service = new UserService()
    try {
      const userReq: LoginUserRequest = {
        email: email,
        password: password,
      }
      const cache = Cache.getCache()
      const user = await service.Login(userReq)
      if (user) {
        const currUser: User = JSON.parse(user.user)
        console.log("current user ", currUser)
        await cache.setItem("currentUser", JSON.stringify(currUser))
        navigate("/Dashboard")
      }
      console.log(user)
    } catch (error: any) {
      setErrorMsg("ERROR")
      console.log(error)
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            Login
          </button>
          <div className="flex justify-center">
            <label className="text-red-400 text-center">{errorMsg}</label>
          </div>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/SignUp")}
            className="text-purple-500 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;