Building a Smart Contract for a Whitelist Project Using Starknet Tools

In this lesson, we will build a Whitelist project on the Starknet network using the Cairo language and the Scarb and Starkli tools. In the next lesson, we will connect the smart contract to the front-end interface using the Next.js framework.

Basic Requirements to Get Started with this Lesson:

You have completed the setup of the Starknet development environment.
You are familiar with the Cairo programming language.
You can write contracts using Cairo.
Project Setup

Open a terminal and create a folder named whitelist_starknet:

bash
Copy code
mkdir whitelist_starknet & cd whitelist_starknet
Initialize the Scarb project by entering this command:

bash
Copy code
scarb init
<img src="https://starknet.luvnft.com/courses/starknet/dapp/create-project.png"/>
Smart Contract

To set up and run smart contracts, first open the Scarb.toml file and make it look like this:

toml
Copy code
[package]
name = "starknet_whitelist"
version = "0.1.0"

# See more keys and their definitions at https://docs.swmansion.com/scarb/docs/reference/manifest.html

[dependencies]
starknet = "2.3.1"

[cairo]
sierra-replace-ids = true

[[target.starknet-contract]]
<img src="https://starknet.luvnft.com/courses/starknet/dapp/scarb-toml.png"/>
Now, create a file named whitelist.cairo in the src folder and write the smart contract in this file.

The idea of the smart contract is to add people to a whitelist assuming we have a product, and the first 10 people or any number we specify can get the product for free.

Copy the following smart contract code into the whitelist.cairo file and then follow the explanation of the contract directly below the code:

rust
Copy code
use starknet::ContractAddress;

#[starknet::interface]
trait IWhitelist<TContractState> {
  fn add_address_to_whitelist(ref self: TContractState);
  fn check_address(self: @TContractState, address: ContractAddress) -> bool;
  fn get_num_addresses(self: @TContractState) -> u128;
  fn get_max_addresses(self: @TContractState) -> u128;
}

#[starknet::contract]
mod Whitelist {
  use starknet::{ContractAddress, get_caller_address};

  #[storage]
  struct Storage {
    whitelistedAddresses: LegacyMap<ContractAddress, bool>,
    maxWhitelistedAddresses: u128,
    numAddressesWhitelisted: u128,
  }

  #[constructor]
  fn constructor(ref self: ContractState, _maxWhitelistedAddresses: u128) {
    self.maxWhitelistedAddresses.write(_maxWhitelistedAddresses);
  }

  #[abi(embed_v0)]
  impl WhitelistImpl of super::IWhitelist<ContractState> {
    fn add_address_to_whitelist(ref self: ContractState) {
      assert(
        self.whitelistedAddresses.read(get_caller_address()) == false, 
        'Address has already added'
      );
      assert(
        self.numAddressesWhitelisted.read() < self.maxWhitelistedAddresses.read(),
        'Addresses limit reached'
      );

      self.whitelistedAddresses.write(get_caller_address(), true);

      let numAddresses: u128 = self.numAddressesWhitelisted.read();
      self.numAddressesWhitelisted.write(numAddresses + 1);
    }

    fn check_address(self: @ContractState, address: ContractAddress) -> bool {
      self.whitelistedAddresses.read(address)
    }

    fn get_num_addresses(self: @ContractState) -> u128 {
      self.numAddressesWhitelisted.read()
    }

    fn get_max_addresses(self: @ContractState) -> u128 {
      self.maxWhitelistedAddresses.read()
    }
  }
}
<img src="https://starknet.luvnft.com/courses/starknet/dapp/whitelist-file.png"/>
Let's explain each line:

● Line 1: We import ContractAddress from starknet, which acts as a data type.
● Lines 3 - 9: We created an interface (trait) named IWhitelist and included four functions allowing us to: add an address to the whitelist, check if an address has joined, get the number of addresses whitelisted, and get the maximum number of addresses allowed.
● Lines 11 and 12: We declared the smart contract named Whitelist.
● Line 13: We imported ContractAddress and get_caller_address from starknet. ContractAddress acts as a data type representing an address, and get_caller_address fetches the address connected to the contract during execution (data storage).
● Lines 15 - 20: We want to store three variables in the blockchain:

whitelistedAddresses, which stores a mapping where the address of the person serves as a key, and the value is a bool indicating whether they joined (true) or not (false).
maxWhitelistedAddresses, the maximum number of allowed joiners.
numAddressesWhitelisted, indicating the number of people who joined. Each time a person joins, this variable increments by one.
● Lines 22 - 25: We declared a constructor function to pass the maximum allowed joiners when deploying the smart contract. As you see, we passed _maxWhitelistedAddresses and wrote the value into the maxWhitelistedAddresses variable.
● Lines 27 - 28: We created an external impl named WhitelistImpl and invoked the IWhitelist interface within impl, passing the contract state (ContractState) to the interface. Then, we built the four functions easily.
● Lines 29 - 43: We built the add_address_to_whitelist function simply and added conditions to ensure its execution starts only after verification using assert. The first condition checks whether the person trying to join hasn't already joined, and the second condition checks if the number of people whitelisted is less than the maximum limit. In line 39, we added the person to the whitelist, where the connected contract address serves as the key, and the value true indicates the person's joining. In line 41, we fetched the number of joiners from the numAddresses variable to increase it by one each time a person joins.
● Lines 45 - 55: We created three functions:
The first function returns whether the passed address has joined or not.
The second function returns the number of people who joined the whitelist.
The third function returns the maximum number of people allowed to join.
Rewrite the contract again to understand everything written simply.

As we discussed earlier, the main file for reading Cairo language files in the src folder is the lib.cairo file. Therefore, we will import the whitelist.cairo file into the lib.cairo file using modules (mod) and then include the file name:

rust
Copy code
mod whitelist;
<img src="https://starknet.luvnft.com/courses/starknet/dapp/lib-file.png"/>
Creating RPC API

To start interacting with your wallet account and deploying your smart contract, we need an RPC API that will act as a node (computer).

We will use Infura to get the API for the Starknet network. So, create an account directly, and let's continue.

After you finish creating an account and are redirected to the dashboard, create a project and add a name to it, then click CREATE:

<img src="https://starknet.luvnft.com/courses/starknet/dapp/infura-create-project.png"/>
After creating the project, you will see the networks you want to run. Scroll down a bit and choose the GOERLI network in Starknet:
<img src="https://starknet.luvnft.com/courses/starknet/dapp/infura-select-goerli.png"/>
After selecting the network, click on "Save changes" at the top:

<img src="https://starknet.luvnft.com/courses/starknet/dapp/infura-save.png"/>
After saving the changes, you will be redirected back to the page containing the link specific to your project. Save this link on your device because we will need it soon:

<img src="https://starknet.luvnft.com/courses/starknet/dapp/infura-api.png"/>
Connecting the Wallet to the Project

To connect your wallet account to the project, we'll create the wallet signature in the keystore and then easily retrieve the wallet data.

Create the folders to store wallet data in the project by entering this command first:

bash
Copy code
mkdir -p ./starkli-wallets/deployer
And on Mac and Linux:

bash
Copy code
mkdir -p ~/.starkli-wallets/deployer
<img src="https://starknet.luvnft.com/courses/starknet/dapp/create-wallet-folder.png"/>
Now, create a keystore file by running this command:

bash
Copy code
starkli signer keystore from-key ./starkli-wallets/deployer/keystore.json
And on Mac and Linux:

bash
Copy code
starkli signer keystore from-key ~/.starkli-wallets/deployer/keystore.json
You'll be prompted to enter the private key associated with your wallet. After entering it, you'll be asked for a password, which will be requested each time you interact with the wallet, such as deploying the smart contract. So, make sure to remember it. The keystore.json file will be created directly in the deployer folder.

<img src="https://starknet.luvnft.com/courses/starknet/dapp/create-keystore.png"/>
Now, retrieve the wallet account data simply by running this command:

bash
Copy code
starkli account fetch WALLET_ADDRESS --output ./starkli-wallets/deployer/account.json --rpc RPC_API
And on Mac and Linux:

bash
Copy code
starkli account fetch WALLET_ADDRESS --output ~/.starkli-wallets/deployer/account.json --rpc RPC_API
Replace WALLET_ADDRESS with your public wallet address and RPC_API with the link you generated earlier.

<img src="https://starknet.luvnft.com/courses/starknet/dapp/fetch-account.png"/>
You'll notice that an account.json file has been created in the deployer folder.

Setting up ENV Variables

Now that we have all the wallet data in the project and the RPC API link, we'll store all of this in variables in the env for easy deployment of our smart contract later.

On Mac and Linux, enter these commands in the terminal:

bash
Copy code
export STARKNET_ACCOUNT=~/.starkli-wallets/deployer/account.json
export STARKNET_KEYSTORE=~/.starkli-wallets/deployer/keystore.json
export STARKNET_RPC=RPC_API_URL
And on Windows, enter these commands in the terminal:

bash
Copy code
set STARKNET_ACCOUNT=./starkli-wallets/deployer/account.json
set STARKNET_KEYSTORE=./starkli-wallets/deployer/keystore.json
set STARKNET_RPC=RPC_API_URL
Replace the RPC API link with your RPC_API variable.

<img src="https://starknet.luvnft.com/courses/starknet/dapp/set-env.png"/>
Note: Do not close the terminal. You'll need to add these variables again each time you close it.

Compiling and Deploying the Smart Contract

Now, let's test and compile the smart contract by running this command:

bash
Copy code
scarb build
<img src="https://starknet.luvnft.com/courses/starknet/dapp/scarb-build.png"/>
You'll notice that a target folder has been created, containing a dev folder with 2 files.

As mentioned in the previous lesson, to deploy the smart contract on the network, we need to send the code to the network through a process called Declare and then create an instance of it on the network to interact with it through Deploy.

Send the smart contract code to the network by running this command:

bash
Copy code
starkli declare target/dev/starknet_whitelist_Whitelist.contract_class.json --compiler-version=2.4.0
And on Mac and Linux:

bash
Copy code
starkli declare ~/.target/dev/starknet_whitelist_Whitelist.contract_class.json
<img src="https://starknet.luvnft.com/courses/starknet/dapp/declare-contract.png"/>
After sending the code to the network, copy the Class hash and then deploy the smart contract on the network by running this command:

bash
Copy code
starkli deploy CLASS_HASH ARG
Replace CLASS_HASH with the class hash generated when sending the smart contract code to the network. As for ARG, replace it with the values you want to pass in the smart contract. Since we passed the variable <span dir="ltr">_maxWhitelistedAddresses</span> in the smart contract, we'll pass a value for this variable.

<img src="https://starknet.luvnft.com/courses/starknet/dapp/deploy-contract.png"/>
As you can see, we passed the value 10 for the <span dir="ltr">_maxWhitelistedAddresses</span> variable defined in the constructor function.

Copy the address of your smart contract and go to <a href="testnet.starkscan.co" target="_blank">testnet.starkscan.co</a> and paste the smart contract address in the search bar to open it directly.

Accessing the ABI

After opening your smart contract on <a href="testnet.starkscan.co" target="_blank">testnet.starkscan.co</a>:

<img src="https://starknet.luvnft.com/courses/starknet/dapp/starkscan-contarct.png"/>
Click on Class Code/History:

<img src="https://starknet.luvnft.com/courses/starknet/dapp/starkscan-abi.png"/>
Now, copy the ABI by clicking the Copy API Code button, then go back to your project and create a file named abi.json. Paste everything you copied into this file:

<img src="https://starknet.luvnft.com/courses/starknet/dapp/abi-file.png"/>
We'll use this file in the next lesson when interacting with the smart contract in the front-end.

As always, if you have any questions, feel stuck, or just want to say hello, join us on <a href="https://t.me/Web3ArabsDAO" target="_blank">Telegram</a> or <a href="https://discord.gg/xTyByNRemx" target="_blank">Discord</a> 