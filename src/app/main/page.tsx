"use client";
import React, { use, useEffect, useState } from "react";

function Main() {
  const [message, setMessage] = useState<string>("Loading...");
  useEffect(() => {
    fetch("http://127.0.0.1:5328/api/json")
      .then((res) => res.json())
      .then((data) => console.log(setMessage(data.message)));
  }, []);

  return <div>{message}</div>;
}

export default Main;
