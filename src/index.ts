import Web3 from "web3"

const boredApesABI = require('../bored-apes-contract/boredApesABI.json')
import { BoredApesABI } from '../types/web3-v1-contracts/BoredApesABI'

const RPC_HOST = 'https://mainnet.infura.io/v3/0df32182ab6a4411ab3c89686e39125e'
const BORED_APES_ADDRESS = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'

async function main() {
    const web3 = new Web3(RPC_HOST)

    const boredApes = new web3.eth.Contract(boredApesABI, BORED_APES_ADDRESS) as any as BoredApesABI

    // The commented code block can be used for watching for new transfers
    /*console.log('Listening for transfer events...')
    boredApes.events.Transfer((err, event) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(`Bored Ape ${event.returnValues.tokenId} transferred ${event.returnValues.from} -> ${event.returnValues.to}`)
    }) */

    boredApes.getPastEvents('Transfer', {
        fromBlock: 14600000,
        toBlock: 'latest'
    })
    .then(function(events) {
        events.forEach(event => {
            console.log(`Bored Ape NFT ${event.returnValues.tokenId} transferred ${event.returnValues.from} -> ${event.returnValues.to}`)
        });
    })

}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})





