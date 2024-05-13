Writing Smart Contracts using the Cairo Language

Now that we've learned the basics of the Cairo language in the previous lesson, let's learn how to write smart contracts on Starknet using the Cairo language.

Exactly! We need to understand some commands and conditions for writing smart contracts using the basics introduced in the previous lesson.

Development Environment

The best way to learn is by building and seeing the results directly. Therefore, in this lesson, we won't use any of the previous tools we prepared. Instead, we'll use the Remix website, which we covered in previous educational courses while learning the Solidity language.

Why Remix? In this lesson, we'll be writing smart contracts on Starknet, so we need an easy way to deploy smart contracts without any complexity and test them for free. With Remix, we'll install the Starknet tool, which will provide a complete working environment for interacting with smart contracts and deploying them easily.

Go to <a href="https://remix.ethereum.org" target="_blank">Remix's website from here</a> and set up the environment like this.

Once the website is open, the interface will look like this:

<img src="https://starknet.luvnft.com/courses/starknet/remix.png"/>
This automatic environment only works for Ethereum projects. In this lesson, we're interacting with Starknet, so you'll go to Plugins by clicking on the button at the bottom left. After clicking on it, search for Starknet and then click on the Activate button to activate the Starknet environment:

<img src="https://starknet.luvnft.com/courses/starknet/remix-plugins.png"/>
After activating the tool, you'll be prompted to give permissions to the tool. Click the Accept button:

<img src="https://starknet.luvnft.com/courses/starknet/remix-starknet-accept.png"/>
Then, go back to the files section to check if the environment has changed to cairo_scarb_sample:

<img src="https://starknet.luvnft.com/courses/starknet/remix-home.png"/>
Now, you can create a file named contract.cairo in the hello_world folder:

<img src="https://starknet.luvnft.com/courses/starknet/remix-contract-file.png"/>
Let's get back to learning how to write smart contracts, and then we'll explain how to interact with the contract and deploy it on Starknet for testing.

Writing Smart Contracts

There's no difference in writing code in the Cairo language, but when writing smart contracts, there are some strict rules related to Starknet that must be followed to create the smart contract, store data, execute functions, and more.

When starting to write a smart contract, we'll use modules - Modules, and then within these modules, we'll add the functions and structures we want to execute.

Defining the smart contract:

rust
Copy code
#[starknet::contract]
mod Contract {

}
When building a smart contract, we create a mod which represents the modules, and then add the name of the smart contract. For the first line, it's added to inform the Starknet compiler to treat the module (mod) as a smart contract and not just a mod.

Storing data in the smart contract on Starknet differs from Solidity. In Solidity, each variable we define is a slot in memory, but it's different in Starknet. For this reason, we'll use a struct named Storage from Starknet, and each variable we define in the struct is a slot/room in the smart contract's memory or blockchain.

The smart contract will look like this:

rust
Copy code
#[starknet::contract]
mod Contract {
    
    #[storage]
    struct Storage {
        stored_data: u128,
    }

}
We've created a struct named Storage to define places to store data in the blockchain. Regarding the comment #[storage], its purpose is to inform the starknet compiler to run the required code and allow it to interact with the blockchain's state, such as allowing data storage in variables afterwards and anything else we want to do. Then, we defined a slot in the blockchain called stored_data to store a numerical value of type u128.

We need to create a function that stores the data we want to store in the stored_data variable. So, the smart contract will look like this:
rust
Copy code
#[starknet::contract]
mod Contract {
    #[storage]
    struct Storage {
        stored_data: u128
    }

    #[external(v0)]
    fn set(ref self: ContractState, number: u128) {
        self.stored_data.write(number);
    }
}
Since the purpose of the function we want to create is to store data and not return data, we created an external function called set in line 9, passing 2 parameters:

self: Have you ever thought about how we can store data in the blockchain? It's necessary to access the entire contract's state, so we created self and made its type ContractState, allowing self to store the entire state of the smart contract from external functions and variables. Before writing self, we added ref which allows us to get a reference or copy of the contract's state/data and modify it without any problems.
number: It's the value we want to input into the function and then store.
After creating the function, we added a command to store the number value in the stored_data variable. As you can see, to access the variable, we used self and then the variable name stored_data. Since we want to store the data to the contract, we added write(number), which means writing the number value to the stored_data variable.

As for line 8: #[external(v0)] was added to inform starknet that it's an external function that will be executed generally for everyone.

It might seem strange, but read it again and in the upcoming examples and when running the contract, you'll understand everything.

Now that we've created a function to store data in the stored_data variable, we now need a function to retrieve the data from the variable. This will make the smart contract look like this:

The command is similar to the previous function, but since we want to return data, we've created a function called get and passed self to it. However, as you can see, we didn't add ref like the previous time, because we don't want to modify the data in the contract. Instead, we added @ before ContractState, which gives us a copy of the contract state with variables and functions in the get function, but we can't modify the data. We only take a copy of the contract state to view the data.

After creating the function, we added the command to retrieve the stored value in the stored_data variable. As you can see, to access the variable, we used self and then the variable name stored_data. Since what we want to do is read the data and not write, we added read(), which means reading the value stored in the stored_data variable.

We can conclude something:

When we want the function to write to the blockchain (store data), we'll pass self as modifiable on the blockchain like this: ref self: ContractState.
When we want the function to read from the blockchain (retrieve data), we'll pass self normally and take a copy of the contract state's data/variables and functions in the get function like this: self: @ContractState.
That's not enough in this way. We need to try the smart contract in Remix and see how it works. Copy the final code above and paste it into the contract.cairo file that we created. Then click on the Starknet icon that we activated at the beginning of the lesson:

<img src="https://starknet.luvnft.com/courses/starknet/remix-contract-home.png"/>
Now click on Compile contract.cairo:

Note: If the button does not appear like this, click on the box containing the word Compile, and then reopen it.

<img src="https://starknet.luvnft.com/courses/starknet/remix-compile-contract.png"/>
After compiling the code, we'll create a Declare for the smart contract by clicking on Declare contract.cairo:

The declare will send the code to the network, but that doesn't mean everything is done.

<img src="https://starknet.luvnft.com/courses/starknet/remix-contract-declare.png"/>
After sending the code to the network, we want to create an instance of it on the network so we can interact with the code as a smart contract. Now click on Deploy:

<img src="https://starknet.luvnft.com/courses/starknet/remix-contract-deploy.png"/>
Interacting with the Smart Contract
After deploying the smart contract, you'll notice that you can read and write to the smart contract like this:

<img src="https://starknet.luvnft.com/courses/starknet/remix-contract-get.png"/>
After clicking on call, it executed the get function and displayed the data below as you can see. There's a value in this format "0x0" because it's displaying the data in hex format. During the conversion to int, it means 0. You can try it in the box below:

For writing, you'll select Write and run the set function, passing the value as normal.

Constructors
If you're a Solidity developer or have used OOP in other programming languages, you would have constantly used a Constructor.

The Constructor function in smart contracts is used only once, during the deployment of the smart contract.

Create a file named constructors.cairo on Remix and let's check the following example:

rust
Copy code
#[starknet::contract]
mod Constructors {
    #[storage]
    struct Storage {
        stored_number: u128,
    }

    #[constructor]
    fn constructor(ref self: ContractState, number: u128) {
        self.stored_number.write(number);
    }

    #[external(v0)]
    fn get_number(self: @ContractState) -> u128 {
        self.stored_number.read()
    }
}
As you can see, we declared a smart contract named constructors, then declared a struct Storage to store numerical values in the stored_number variable on the blockchain, just like we did in the previous example.

However, in this smart contract, we want to store the data in the stored_number variable only during the deployment of the smart contract. It's considered a constant value afterward, and we don't want anyone to modify it. (There are many use cases for the constructor function in the future). We informed the Starknet compiler that the function is actually a constructor using #[constructor] above the function, passed the contract state in self, and since the function will modify the smart contract data, we added ref, then passed number in the function, which is the value we want to store in the stored_number variable.

Finally, we created an external function called get_number and passed a copy of the contract state in self using @ to read the value from the stored_number variable.

Now compile your code and send it to the Starknet network by clicking Declare. You'll notice that when deploying the smart contract (Deploy), it will ask you to enter a numerical value, thanks to the constructor function. Enter a numerical value and then click on Deploy to interact with the contract.

Note: When calling the value through Remix, it will appear in the bottom in hex format. You can copy it and convert it to a numerical value below:

Mapping
Mappings in Cairo work like hashmaps or dictionaries in other programming languages. They're used to store data in key-value pairs.

Exactly! Key -> Value. It's one of the most important storage methods you need to know and will use extensively when building smart contracts, as it makes data handling extremely simple, allowing you to access data directly via the key and not requiring much gas expenditure.

In this example, we'll create a smart contract that stores people's data, covering many ideas with this example.

rust
Copy code
#[starknet::contract]
mod Mappings {
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        myMap: LegacyMap<ContractAddress, felt252>,
    }

    #[external(v0)]
    fn set_map(ref self: ContractState, address: ContractAddress, name: felt252) {
        self.myMap.write(address, name);
    }

    #[external(v0)]
    fn get_map(self: @ContractState, address: ContractAddress) -> felt252 {
        self.myMap.read(address)
    }
}
Let's explain each line:

Line 1 - 2: We declared and created a smart contract called mappings.
Line 3: We called ContractAddress from starknet, which is used as a data type and is an address.
Line 5 - 8: We created struct Storage, which stores variables on the blockchain. In Line 7, we created a variable myMap that stores key-value pairs (mapping), where each value has its own key. As you can see, to declare a mapping, we used the word LegacyMap, then we made the type of the key ContractAddress, and for each key, we will store the owner's name address, so we put the value type as felt252.
Line 10 - 13: We created an external function called set_map, which writes data to the blockchain, and passed self as a reference ref to the contract state and address, through which we'll write data as a key, then name, which we want to store as a value for the key. In Line 12, as you can see, while writing to the myMap variable and inputting the data passed in the function, we first added address as the key, followed by name, which is the value.
Line 15 - 18: We created an external function called set_map, which retrieves data from the blockchain, and passed self and address through which we'll call the value associated with it very easily. In Line 17, as you can see, while reading the value from the myMap variable, we input address into it to get the value associated with this key (address).
Now compile your code and send it to the Starknet network by clicking Declare, then deploy it to the network by clicking Deploy.

Note: When calling the value through Remix, it will appear in the bottom in hex format. You can copy it and convert it to a string value below:

Using Trait and Impl in Smart Contracts
It's highly important when writing smart contracts to think about using traits and impl to organize your smart contract and interfaces for external use.

We'll build the first smart contract using trait and impl, and then you'll convert the rest of the smart contracts as a simple exercise to retain this in your memory.

Create a file named contract2.cairo on Remix and let's check the following example:
```rust
#[starknet::interface]
trait IContract<TContractState> {
    fn set(ref self: TContractState, number: u128);
    fn get(self: @TContractState) -> u128;
}

#[starknet::contract]
mod Contract {
    use super::IContract;

    #[storage]
    struct Storage {
        stored_data: u128,
    }

    #[abi(embed_v0)]
    impl ContractImpl of IContract <ContractState> {
        fn set(ref self: ContractState, number: u128) {
            self.stored_data.write(number);
        }

        fn get(self: @ContractState) -> u128 {
            self.stored_data.read()
        }
    }
}
```

Everything seems clear with some differences, let's clarify:

Lines 1 - 5: We created a trait named IContract and specified to pass a value named TContractState, which we'll pass the contract state and data while using the interface (trait). In lines 3 and 4, we created the functions we want to include in the trait and use them afterward. As you can see in line 1, we informed the starknet compiler to treat the trait as an interface by writing #[starknet::interface].
Line 9: We imported the IContract interface using the use keyword, and since the interface is outside the smart contract, we added the super keyword.
Lines 11 - 14: We created the storage structure (struct Storage) and defined a variable named stored_data to store a numerical value on the blockchain.
Lines 16 - 25: Now we created an impl named ContractImpl and invoked the IContract interface in impl and passed the contract state (ContractState) to the interface. Then we built our functions as we did above. As you can see in line 16, we informed the starknet compiler to treat the impl externally so that we can interact with the functions and store data externally using #[abi(embed_v0)].
Now compile your code and send it to the Starknet network by clicking Declare, then deploy it to the network by clicking Deploy.

Note: When calling the value through Remix, it will appear at the bottom in hex format. You can copy it and convert it to a numerical value below:

To solidify this in your mind, try building some random ideas or converting previous examples as we did now and move on to the next exciting lesson.

As always, if you have any questions or feel stuck or just want to say hello, feel free to join us on Discord https://discord.gg/xTyByNRemx, and we'll be more than happy to assist you!