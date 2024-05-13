Introduction to StarkEx Project

The StarkEx project is an independent validity-rollup (zkRollup) as a service or application. It has some key similarities and differences compared to StarkNet and other zkRollup chains.

Unlike StarkNet, which is a general-purpose (can be used for many things) layer 2 solution (zkRollup), StarkEx is a framework for building application-specific licensed solutions.

StarkEx has been deployed on the mainnet since June 2020 and powers some of the most popular applications such as ImmutableX, dYdX, Sorare, Myria, DeversiFi, and more.

Why StarkEx?

In short, creating general-purpose ZK proof provers is challenging. While StarkWare and other companies were building ZK solutions for general purposes, StarkWare launched the StarkEx project in 2020 as a specific and approved scaling solution for applications.

Unlike StarkNet, StarkEx is suitable for specific use cases - but it's really good for those cases. Currently, StarkEx supports the creation of applications dealing with ETH, ERC-20, ERC-721, and ERC-1155 tokens. Specifically, it supports applications that want to enable instant trading or perpetual trading.

Each application relying on StarkEx defines its own logic and interacts with the StarkEx service. The system consists of an off-chain component and an on-chain component.

StarkEx Components
The off-chain component in StarkEx (layer 2) is responsible for:

Maintaining the current state of orders (e.g., an NFT list).
Executing transactions in the system.
Sending updates to the on-chain component.
The on-chain component in StarkEx (layer 1) is responsible for:

Enforcing the validity of state changes through STARK proofs.
Holding state commitments and system assets.
Managing accounts on-chain (layer 1).
Transitioning to StarkNet

As mentioned earlier, StarkEx is an application-specific solution while StarkNet is designed for general purposes.

At the time of writing this report, StarkNet had a mainnet alpha network, but it hadn't been classified as stable yet.

Once StarkNet reaches maturity and is considered stable, decentralized applications built on StarkEx can choose to transition to StarkNet if they wish.

As always, if you have any questions, feel stuck, or just want to say hi, join us on <a href="https://discord.gg/xTyByNRemx" target="_blank">Discord</a>, and we'll be more than happy to help!
