"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Reset({ params: { token } }: { params: { token: string } }) {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("reset");
    try {
      fetch(`/api/auth/reset-password/${token}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
        .then((res) => res.json())
        .then(({ data, message, status }) => {
          console.log(data, message, status);
          if (message && message[0]?.error) {
            setErrorMessage(message[0]?.error);
          }
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {errorMessage !== "" && (
        <div className="absolute w-full p-2 top-0">
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Error: {errorMessage}</span>
          </div>
        </div>
      )}
      <div className="form-control w-full max-w-xs m-auto prose">
        <h2>Reset Password</h2>
        <div className="py-2 pb-6">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <input
              onChange={handlePasswordChange}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="input input-bordered w-full max-w-xs"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline w-[40px] p-[10px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon></EyeSlashIcon> : <EyeIcon></EyeIcon>}
              </button>
            </span>
          </div>
        </div>
        <div className="py-2">
          {loading ? (
            <button className="btn btn-primary w-full" disabled>
              <span className="loading loading-spinner"></span>
              Loading
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary w-full">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reset;
