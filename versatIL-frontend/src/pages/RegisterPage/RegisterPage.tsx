import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../service/user-service";
import type { CreateUserRequest } from "../../model/user/user";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userservice = new UserService();
        try {
            let userReq: CreateUserRequest = {
                email: email,
                name: username,
                password: password,
            }
            const resp = await userservice.createUser(userReq)
            console.log(resp)
            resetUI()
        } catch (error) {
            console.log(error)
        }

    };

    const resetUI = () => {
        setEmail("")
        setPassword("")
        setUsername("")
        navigate("/")
    }
    
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Register New Account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            type="name"
                            id="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <button onClick={() => navigate("/")} className="text-purple-500 hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;