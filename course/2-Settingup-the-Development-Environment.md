Setting up a Starknet development environment on your machine

Now that we know a lot about StarkNet, let's dive into the exciting world of StarkNet, from setting up your development environment to building projects.
What is a Development Environment?

In order to run code, build projects, and deploy smart contracts, we need a development environment that helps us do all of this, and we need to set it up on our machines!

Throughout this course, you will need to install Scarb for project creation, Cairo language and smart contract compilation, Starkli for interacting with StarkNet directly and deploying smart contracts, and a wallet to represent your account on StarkNet. Don't worry, we will explain all of this in a very simple way during this lesson.
Installing Scarb

Installing scarb on Linux and MacOS is different than installing it on Windows, so make sure to follow the commands for your system that we will provide here.
Linux and MacOS Users

Installation Steps:

    Open your terminal and run this command:

bash

curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

    Reopen your terminal and run the following command to check the installation:

bash

scarb --version

It will show you the version of scarb, cairo, etc...
Windows Users

Installation Steps:

    First, you will download the folder containing scarb dependencies from here: <a href="https://docs.swmansion.com/scarb/download.html#precompiled-packages" target="_blank">https://docs.swmansion.com/scarb/download.html#precompiled-packages&lt;/a>

<img src="https://starknet.luvnft.com/courses/starknet/scarb-windows.png&quot;/>

    Unzip the folder and copy the bin and doc folders inside it.

    Go to your C drive -> Create a new folder called scarb -> Paste the folders you copied in step 2 inside the new folder.

    The hard part is done! Open your cmd or terminal and run this command:

bash

setx PATH &quot;C:\scarb\bin&quot;

    Now open your cmd or terminal again to check if the installation is complete on your machine. Run this command:

bash

scarb --version

It will show you the version of scarb, cairo, etc...

<img src="https://starknet.luvnft.com/courses/starknet/scarb-version.png&quot;/>

Great job!
Installing Starkli

As usual, installing starkli on Linux and MacOS is different than installing it on Windows, so make sure to follow the commands for your system that we will provide here.
Linux and MacOS Users

    You can install Starkli environment using Starkliup by following this command. Open your terminal and run this command:

bash

curl https://get.starkli.sh | sh

    Reopen your terminal and run the following command to install starkli:

bash

starkliup

    Reopen your terminal and run the following command to check the installation:

bash

starkli --version

Windows Users

We will install starkli using cargo as it is the easiest way.

    First, install rust on your system in order to run cargo, you can <a href="https://www.youtube.com/watch?v=92HoSWgsx-4&amp;t=3s" trget="_blank">follow this video</a> and then you can complete the following steps.

    Now open your cmd or terminal to install starkli by running this command:

bash

cargo install --locked --git https://github.com/xJonathanLEI/starkli

    Reopen your cmd or terminal and run the following command:

bash

starkli --version

<img src="https://starknet.luvnft.com/courses/starknet/starkli-version.png&quot;/>

It works! Try running scarb again. In case you failed to install any of the tools, feel free to ask your question on <a href="https://discord.gg/xTyByNRemx" target="_blank">Discord</a>

##Setting Up ArgentX Wallet##

It is one of the most popular and free wallets on Starknet.

You can easily add it using a browser extension. Simply <a href="https://chromewebstore.google.com/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb" target="_blank">go to this link</a> and add it to your browser.

<img src="https://starknet.luvnft.com/courses/starknet/argent-ex.png&quot;/>

Once you add the ArgentX extension to your browser, you will be redirected to a new page. Click on create a new wallet, accept the terms and conditions, and add your password. Your wallet will be created easily.

<img src="https://starknet.luvnft.com/courses/starknet/argent-ex2.png&quot;/>

Now, your ArgentX account will look something like this.

<img src="https://starknet.luvnft.com/courses/starknet/argent-ex3.png&quot;/>
Getting Some Test Tokens

Now, it's time to get some test tokens, so we can deploy our contracts on Starknet.

Here is a simple step-by-step guide:

    Open your ArgentX wallet. <br/>
    Change the network to Testnet, which is usually located at the top right corner. It will ask you to create an account on testnet. So, after creating it, your network will be set to Testnet.

<img src="https://starknet.luvnft.com/courses/starknet/argent-ex4.png&quot;/>

    Go to <a href="https://starknet.luvnft.com/faucets/starknet-goerli" target="_blank">https://starknet.luvnft.com/faucets/starknet-goerli&lt;/a> using your web browser. This faucet will help you get some test tokens in your Testnet account - Connect your wallet to the faucet and click on the Send button.

<img src="https://starknet.luvnft.com/courses/starknet/goerli.png&quot;/>

Now, all you have to do is wait for the transaction to complete. Check your wallet after a few moments, you will see at least 0.001 added to your wallet.
Deploying Your Account as a Contract on the Network

Now that we have some test tokens, we will deploy our account on the network as a smart contract.

Open your Argent X wallet and click on the settings button at the top right. Then click on Account:

<img src="https://starknet.luvnft.com/courses/starknet/argent-account.png&quot;/>

Now you will click on the Deploy account button in order to deploy your account on the network as a smart contract:

<img src="https://starknet.luvnft.com/courses/starknet/argent-deploy-account.png&quot;/>

Just click on Confirm to confirm and it will deploy your account on the network directly:

<img src="https://starknet.luvnft.com/courses/starknet/argent-confirm-account.png&quot;/>
How to Reveal Your Private Key

In order to retrieve your account's private key, you will click on the settings button and then click on your account and then click on the Export private key button:

<img src="https://starknet.luvnft.com/courses/starknet/argent-account2.png&quot;/>

Never share your private key with anyone. We will use it while deploying smart contracts in the upcoming lessons.
What We Covered

In this lesson, we explained how to set up your development environment to start building on StarkNet, how to get test tokens, how to deploy your
