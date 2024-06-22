


const { ApiPromise, WsProvider } = require('@polkadot/api');


const ARCHIVE_URL="wss://archive.chain.opentensor.ai:443/'"



async function main () {
    // Initialise the provider to connect to the local node
    const provider = new WsProvider(TESTNET_URL);

    // Create the API and wait until ready
    const api = await ApiPromise.create({ provider });

    // Retrieve the chain & node information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    // Retrieve the metadata
    const metadata = await api.rpc.state.getMetadata();

    // Extract and list the modules
    const modules = metadata.asLatest.pallets || metadata.asLatest.modules; // For newer versions, use pallets; for older versions, use modules
    modules.forEach((module) => {
        console.log(module.name.toString());
    });



    console.log(`done scanning`);

}



main().catch(console.error).finally(() => process.exit());


