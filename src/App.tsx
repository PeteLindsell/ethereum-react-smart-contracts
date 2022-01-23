import React, { useState } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greetingValue, setGreetingValue] = useState("");
  const [data, setData] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        setData(data);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!greetingValue) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greetingValue);
      setGreetingValue("");
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <>
      <header className="App-header">
        <h1>Ethereum React</h1>
        <h2>{data}</h2>
      </header>
      <main>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <form onSubmit={handleSubmit}>
          <label>
            Your Greeting
            <input
              onChange={(e) => setGreetingValue(e.target.value)}
              value={greetingValue}
            />
          </label>
          <button>Set Greeting</button>
        </form>
      </main>
    </>
  );
}

export default App;
