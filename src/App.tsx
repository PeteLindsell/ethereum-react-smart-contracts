import React, { useState } from "react";
import { ethers } from "ethers";
import {
  ThemeProvider,
  theme,
  CSSReset,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

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
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex
        direction="column"
        width="full"
        align="center"
        justifyContent="center"
        p={4}
      >
        <Box textAlign="center">
          <Heading>Ethereum - React</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Text>Greeting from Ethereum: {data}</Text>
          <Button mt={4} type="button" onClick={fetchGreeting}>
            Fetch greeting
          </Button>
          <Box
            mt={4}
            p={4}
            borderWidth={1}
            borderRadius={8}
            borderColor="lightgray"
            boxShadow="lg"
            as="form"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel>Greeting</FormLabel>
              <Input
                onChange={(e) => setGreetingValue(e.target.value)}
                value={greetingValue}
              />
            </FormControl>
            <Button mt={4} type="submit">
              Save greeting
            </Button>
          </Box>
        </Box>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
