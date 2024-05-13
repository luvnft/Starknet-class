#Introduction to Starknet and ZK#

StarkNet is a decentralized ZK-Rollup solution (also called Validity-Rollup). It is a layer-two network on top of Ethereum (layer-one), allowing Ethereum to scale via cryptographic proofs.

StarkNet Alpha was launched on Mainnet in November 2021, and in September 2022, StarkNet Alpha 0.10.0 was released.

StarkNet was created by the company StarkWare. Starkware develops STARK-based solutions for the blockchain world and is the inventor of "ZK-STARKs", which we will discuss shortly.
But first, what are rollups?

Rollups are one of the most popular ways to solve the blockchain scalability problem.

Rollups bundle transactions together into a single transaction, which is then submitted to the main blockchain (layer-one) as a single transaction. In other words, rollups handle computation and blockchain state storage off-chain and then submit transaction data to the mainnet. This reduces the amount of data that needs to be processed on the mainnet (layer-one).

There are two main categories of rollups today: Optimistic Rollups and ZK-Rollups.

You can learn a lot more about layer-two solutions and rollups in our course Introduction to Layer2 and Rollups.
Starknet and the Validity Rollup

As mentioned, StarkNet is a layer-two Validity ZK Rollup solution - often referred to as a type of Zero-Knowledge Rollup or (zkRollup). It offers high throughput and low costs and inherits the security benefits of the Ethereum layer-one.

The basic idea is simple. Given a Sudoku puzzle, it is much easier to verify a potential solution than it is to solve the puzzle from scratch. If we could convince people that "the puzzle is solved" instead of going through the details, we could save a lot of computation by having one person solve the puzzle and broadcast it for everyone else to verify. Using this strategy, solving the puzzle becomes a one-time task.

Using this analogy, StarkNet helps scale Ethereum by replacing the heavy computation (transaction execution) on layer-one with a much lighter and cheaper verification using ZK-STARK proofs that are computed off-chain (off the layer-one chain).

zk-STARK stands for Zero-Knowledge Scalable Transparent Argument of Knowledge. It is a Zero-Knowledge (ZK) proof system that was introduced as an alternative to zk-SNARKs in 2018, also invented by the Starkware team.

STARKs power StarkNet's scalability. Developers can take computation and storage off-chain (the Ethereum layer-one) to the StarkNet layer-two, and then STARK proofs can be generated that verify the correctness of those off-chain computations and posted to the Ethereum layer-one chain.

Layer-two networks then unlock scalability benefits by computing a large number of transactions in a batch using STARKs and then using a single STARK proof to attest to their validity on layer-one. This provides a low gas cost per individual transaction on the layer-two network.
Data Layer

##Data Layer##
<img src="https://starknet.luvnft.com/courses/starknet/data-layer.png"/>

When building the StarkNet stack from the bottom up, the first thing to consider is the data layer. The data layer is where all the data that can be verified can be stored, which can help us make sure that the current state on StarkNet is valid, and historical state can be fetched from Ethereum.

Since StarkNet uses the Ethereum layer-one to post proofs, it uses Ethereum as its data layer for proof verification and data availability.
Execution Layer

The execution layer is where the transactions submitted by users are actually executed, and proofs are generated to be posted to the data layer.

In the case of StarkNet, the execution layer is on the StarkNet layer-two network. StarkNet leverages the Cairo language - a proven, efficient, zkRollup-friendly programming language for smart contracts - to express smart contract execution with chain state.

That's right, StarkNet does not use the EVM in order to use Solidity for smart contracts as we are used to. Instead, it uses the CairoVM to execute Cairo smart contracts. This is why we will learn some Cairo basics during this course.
Application Layer

##Application Layer##
<img src="https://starknet.luvnft.com/courses/starknet/application-layer.png"/>

Moving up the stack, the next layer is the application layer.

The application layer is where you come in. Building contracts, creating decentralized applications, and tooling on top of StarkNet so that users have something to use.
Transport Layer

The final layer is the transport layer. This is how transactions created by users are communicated to the layer-two network to create state changes on the blockchain, and eventually post the proof to layer-one.

This is achieved through users being able to communicate with execution layer nodes that are either run by themselves or by an RPC provider. StarkNet execution layer nodes provide a JSON-RPC interface, similar to Ethereum nodes, through which user wallets or applications can communicate with the rest of the network.

And with that, we have covered the full StarkNet stack!

As always, if you have any questions, get stuck, or just want to say hi, join us on Discord https://nftv.luvnft.com and we will be more than happy to help!
