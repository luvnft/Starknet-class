Building the Frontend Interface for the Whitelist Project using Next.js

Now that we've finished writing and testing our smart contract thoroughly, we can see it in action on the frontend.

##Basic Requirements to Start this Lesson:##

You've completed the lesson on Building a Smart Contract for the Whitelist Project.
You're familiar with the JavaScript programming language.
You're comfortable working with the React/Next.js library.
In this lesson, we'll use the Next.js framework and TailwindCSS to build the website interface.

Run this command in your starknet_whitelist project folder:

bash
Copy code
npx create-next-app@latest frontend
<img src="https://web3arabs.com/courses/starknet/dapp/create-next.png"/>
Now, we need to install starknet.js and get-starknet, which will help us interact with the smart contract, send transactions, and connect the wallet to the website. Type this in the terminal:

Note: Make sure to run this command in the frontend folder related to the Next.js project.

bash
Copy code
npm install starknet get-starknet
Navigate to the app folder and open the globals.css file. Keep these commands in the file:

css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;
<img src="https://web3arabs.com/courses/starknet/dapp/globals-css.png"/>
Now, go to the page.js file in the app folder and paste this code, following the explanations in the comments above each line:

jsx
Copy code
"use client"
import { useState, useEffect } from 'react'
// Import the ABI of the smart contract we saved at the end of the previous lesson
import contractAbi from '../../abi.json'
// Import the connect function from the get-starknet library, which connects the application to the wallet
import { connect } from 'get-starknet'
// Import the Contract and Provider from starknet.js library, which act as a provider and interact with the smart contract
import { Contract, Provider } from 'starknet'

export default function Home() {
  // Place your smart contract address here for later use
  const contractAddress = "add_contract_address_here"
  // Place your RPC API link here for later use
  const RPC_API = "add_infura_rpc_api_url_here"

  // Store the connected wallet address
  const [account, setAccount] = useState(null)
  // Store whether the wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false)
  // Store whether the user has joined the whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false)
  // Store whether the app is loading or not for handling waiting states
  const [loading, setLoading] = useState(false)
  // Store the number of addresses whitelisted
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0)
  // Store the maximum number of people who can join
  const [maxNumberOfWhitelisted, setMaxNumberOfWhitelisted] = useState(0)

  // This function continuously monitors the connection of the wallet to the application
  const connectWallet = async () => {
    // Connect the application to the wallet
    const connection = await connect()

    // Add a condition to check if the wallet is successfully connected
    if (connection && connection.isConnected) {
      // Store the wallet address connected to the application
      setAccount(connection.account)
      setWalletConnected(true)
    }
  }

  // This function calls the maximum number of people who can join
  const getMaxNumberOfWhitelisted = async () => {
    try {
      // Use Provider to interact with the smart contract and read data from the blockchain
      const provider = new Provider({ rpc: { nodeUrl: RPC_API } })
      // Create an instance of our smart contract by providing ABI, contract address, and provider
      const mycontract = new Contract(contractAbi, contractAddress, provider)
      // Call the value from the function get_max_addresses
      const num = await mycontract.get_max_addresses()
      // Store the value
      setMaxNumberOfWhitelisted(num.toString())
    } catch (err) {
      // Print any issues that may occur while running the function
      alert(err.message)
    }
  }

  // This function calls the number of people who have joined the whitelist
  const getNumberOfWhitelisted = async () => {
    try {
      // Use Provider to interact with the smart contract and read data from the blockchain
      const provider = new Provider({ rpc: { nodeUrl: RPC_API } })
      // Create an instance of our smart contract by providing ABI, contract address, and provider
      const mycontract = new Contract(contractAbi, contractAddress, provider)
      // Call the value from the function get_num_addresses
      const num = await mycontract.get_num_addresses()
      // Store the value
      setNumberOfWhitelisted(num.toString())
    } catch (err) {
      // Print any issues that may occur while running the function
      alert(err.message)
    }
  }

  const checkIfAddressInWhitelist = async () => {
    try {
      // Use Provider to interact with the smart contract and read data from the blockchain
      const provider = new Provider({ rpc: { nodeUrl: RPC_API } })
      // Create an instance of our smart contract by providing ABI, contract address, and provider
      const mycontract = new Contract(contractAbi, contractAddress, provider)
      // Call the value from the function check_address
      // Note that we also pass the address of the wallet connected to the site to the function
      const check = await mycontract.check_address(account.address)
      // Store the value
      setJoinedWhitelist(check)
    } catch (err) {
      // Print any issues that may occur while running the function
      alert(err.message)
    }
  }

  // This function adds the user connected to the site to the whitelist
  const addAddressToWhitelist = async () => {
    try {
      // Create an instance of our smart contract by providing ABI, contract address, and the account of the connected wallet
      // As we are writing to the contract, we need the user's signature
      const contract = new Contract(contractAbi, contractAddress, account)
      // Activate loading state as a waiting condition
      setLoading(true)
      // Call the add_address_to_whitelist function via the whitelist function to add the user
      await contract.add_address_to_whitelist()
      // Print the message when the person is successfully added
      alert("You successfully incremented the counter!")
      // Stop loading as the person has been added
      setLoading(false)
    } catch (err) {
      // Print any issues that may occur while running the function
      alert(err.message)
      // Stop loading as the function has stopped due to some issue
      setLoading(false)
    }
  }
The array at the end of the function call represents what state changes will lead to this change. In this case, whenever the values of the two functions change, this change will be directly invoked.

jsx
Copy code
useEffect(() => {
  connectWallet()
  getMaxNumberOfWhitelisted()
  getNumberOfWhitelisted()

  if(walletConnected) {
    checkIfAddressInWhitelist()
  }
  
}, [walletConnected])
React monitors the state of the button, and you can read it well and understand what happens as a developer.

jsx
Copy code
const renderButton = () => {
  if (walletConnected) {
    if (joinedWhitelist) {
      return (
        <div className="text-[1.2rem] my-8 leading-[1]">
          Thanks for joining the Whitelist!
        </div>
      )
    } else if (loading) {
      return <div className="rounded-[4px] bg-blue-800 border-none text-white text-[15px] p-[20px] w-[200px] cursor-pointer mb-[2%]">Loading...</div>;
    } else {
      return (
        <button 
          onClick={addAddressToWhitelist} 
          className="rounded-[4px] bg-blue-800 border-none text-white text-[15px] p-[20px] w-[200px] cursor-pointer mb-[2%]"
        >
          Join the Whitelist
        </button>
      )
    }
  } else {
    return (
      <button onClick={connectWallet} className="rounded-[4px] bg-blue-800 border-none text-white text-[15px] p-[20px] w-[200px] cursor-pointer mb-[2%]">
        Connect your wallet
      </button>
    )
  }
}
The above code succinctly handles the execution of the smart contract or project we built (Whitelist) on the frontend, allowing the user to connect their wallet, add tasks, update them, and remove them.

js
Copy code
// Place your smart contract address here for later use
const contractAddress = "add_contract_address_here"
// Place your RPC API link here for later use
const RPC_API = "add_infura_rpc_api_url_here"
First, we added our smart contract address that we deployed on the starknet goerli test network to the variable (contractAddress), and then we added the RPC API link we created in the previous lesson.

You can now test your application on - <a href="http://localhost:3000" target="_blank">localhost:3000</a> - by entering this command:

bash
Copy code
npm run dev
It's working! You have successfully built a DApp application 🥳🥳

You can directly access the project on <a href="https://github.com/Web3Arabs/Whitelist-Dapp" target="_blank">GitHub here</a>.

As always, if you have any questions, feel stuck, or just want to say hi, join us on <a href="https://discord.gg/xTyByNRemx" target="_blank">Discord</a>, and we'll be more than happy to help!