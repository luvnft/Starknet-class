import { useState, useEffect } from 'react';
// Fetching the smart contract ABI we saved at the end of the previous lesson
import contractAbi from '../../abi.json';
// Fetching the connect function from the 'get-starknet' library which handles connecting the wallet
import { connect } from 'get-starknet';
// Fetching the Contract and Provider which act as a provider and interact with the smart contract
import { Contract, Provider } from 'starknet';

export default function Home() {
  // You will put your smart contract address here to use it later
  const contractAddress = "0x07e614cfabb6c6d89a430561fd3ed1898ceda4330429d520e2d6946c3073963a";
  // Put your Quicknode RPC API URL here which we created earlier
  const RPC_API = "https://powerful-palpable-arm.strk-mainnet.quiknode.pro/39fdaf9b2379848ee93be63488e337faf269c4f4/";

  // This will store the wallet address that will connect to the app
  const [account, setAccount] = useState(null);
  // This will store whether the wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // This will store whether the user has joined the whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // This will be used for cases where we need to wait for something
  const [loading, setLoading] = useState(false);
  // This will store the number of people who have joined the whitelist
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  // This will store the maximum number of people who can join
  const [maxNumberOfWhitelisted, setMaxNumberOfWhitelisted] = useState(0);

  // This function will continuously watch for the wallet to connect to the app
  const connectWallet = async () => {
    // The connect function connects the app to the wallet
    const connection = await connect();

    // Adding a condition to check if the wallet was successfully connected
    if (connection && connection.isConnected) {
      // Storing the connected wallet address in the app
      setAccount(connection.account);
      setWalletConnected(true);
    }
  };

  // This function will fetch the maximum number of people who can join
  const getMaxNumberOfWhitelisted = async () => {
    try {
      // The Provider is used to interact with the smart contract and read data from the blockchain
      const provider = new Provider({ rpc: { nodeUrl: RPC_API } });
      // Fetching our smart contract by passing in the ABI, contract address, and provider
      const mycontract = new Contract(contractAbi, contractAddress, provider);
      // Fetching the value from the get_max_addresses function
      const num = await mycontract.get_max_addresses();
      // Storing the value
      setMaxNumberOfWhitelisted(num.toString());
    } catch (err) {
      // Printing any error that might occur while executing the function
      alert(err.message);
    }
  };

  // This function will fetch the number of people who have joined the whitelist
  const getNumberOfWhitelisted = async () => {
    try {
      // The Provider is used to interact with the smart contract and read data from the blockchain
      const provider = new Provider({ rpc: { nodeUrl: RPC_API } });
      // Fetching our smart contract by passing in the ABI, contract address, and provider
      const mycontract = new Contract(contractAbi, contractAddress, provider);
      // Fetching the value from the get_num_addresses function
      const num = await mycontract.get_num_addresses();
      // Storing the value
      setNumberOfWhitelisted(num.toString());
    } catch (err) {
      // Printing any error that might occur while executing the function
      alert(err.message);
    }
  };

  const checkIfAddressInWhitelist = async () => {
    try {
      // The Provider is used to interact with the smart contract and read data from the blockchain
      const provider = new Provider({ rpc: { nodeUrl: RPC_API } });
      // Fetching our smart contract by passing in the ABI, contract address, and provider
      const mycontract = new Contract(contractAbi, contractAddress, provider);
      // Fetching the value from the check_address function
      // Notice that we are also passing in the connected wallet address to the function
      const check = await mycontract.check_address(account.address);
      // Storing the value
      setJoinedWhitelist(check);
    } catch (err) {
      // Printing any error that might occur while executing the function
      alert(err.message);
    }
  };

  // This function will add the caller to the whitelist
  const addAddressToWhitelist = async () => {
    try {
      // Fetching our smart contract by passing in the ABI, contract address, and connected account
      // Notice that since we are writing to the contract, we need the user to sign the transaction
      const contract = new Contract(contractAbi, contractAddress, account);
      // Enabling the loading state
      setLoading(true);
      // Adding the user to the whitelist using the add_address_to_whitelist function
      await contract.add_address_to_whitelist();
      // Printing a message when the user is added successfully
      alert("You successfully incremented the counter!");
      // Disabling the loading state since the user was added
      setLoading(false);
    } catch (err) {
      // Printing any error that might occur while executing the function
      alert(err.message);
      // Disabling the loading state since the function stopped due to an error
      setLoading(false);
    }
  };

  // The array at the end of the useEffect call represents what state changes will trigger this effect
  // In this case, whenever the values of the two functions change, this effect will be called immediately
  useEffect(() => {
    connectWallet();
    getMaxNumberOfWhitelisted();
    getNumberOfWhitelisted();

    if (walletConnected) {
      checkIfAddressInWhitelist();
    }
  }, [walletConnected]);

  // React watches the state of the button, you can read it well and understand what is happening as a developer
  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className="text-[1.2rem] my-8 leading-[1]">
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return (
          <div className="rounded-[4px] bg-blue-800 border-none text-white text-[15px] p-[20px] w-[200px] cursor-pointer mb-[2%]">
            Loading...
          </div>
        );
      } else {
        return (
          <button
            onClick={addAddressToWhitelist}
            className="rounded-[4px] bg-blue-800 border-none text-white text-[15px] p-[20px] w-[200px] cursor-pointer mb-[2%]"
          >
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button
          onClick={connectWallet}
          className="rounded-[4px] bg-blue-800 border-none text-white text-[15px] p-[20px] w-[200px] cursor-pointer mb-[2%]"
        >
          Connect your wallet
        </button>
      );
    }
  };

  return (
    <div>
      <div
        style={{ fontFamily: '"Courier New", Courier, monospace' }}
        className="min-h-[90vh] flex flex-row justify-center items-center"
      >
        <div>
          <h1 className="text-[2rem] my-8">Welcome to Starknet Devs!</h1>
          <div className="text-[1.2rem] my-8 leading-[1]">
            Its an Whitelist collection for developers in Starknet.
          </div>
          <div className="text-[1.2rem] my-8 leading-[1]">
            {numberOfWhitelisted}/{maxNumberOfWhitelisted} have already joined the Whitelist.
          </div>
          {renderButton()}
        </div>
      </div>
    </div>
  );
}
