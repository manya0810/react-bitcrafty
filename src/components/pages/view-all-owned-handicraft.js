import React, {useEffect, useState} from 'react';
import '../style/view-all-listed-handicrafts.css';
import { ethers } from 'ethers'
import Web3Modal from 'web3modal';
import axios from 'axios'

import {
    marketplaceAddress
} from '../../config'

import NFTMarketPlace from 'contracts/UNIQ_Application.json'

function ViewAllOwnedHandicrafts() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadMyNFTs()
    }, [])
    async function loadMyNFTs() {
        /* create a generic provider and query for unsold market items */
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketPlace.abi, provider.getSigner())
        console.log(contract)
        const data = await contract.fetchMyNFTs()

        /*
        *  map over items returned from smart contract and format
        *  them as well as fetch their token metadata
        */
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                tokenUri
            }
            return item
        }))

        setNfts(items)
        console.log(items)
        setLoadingState('loaded')
    }
    async function sellNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        alert(nft.tokenUri)
        window.location.assign('/resell-nft?tokenId='+nft.tokenId+'&tokenURI='+nft.tokenUri)
        /* user will be prompted to pay the asking proces to complete the transaction */
        loadMyNFTs()
    }

    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">Please Buy a few items and come back later!!!</h1>)
    return (
        <>
            <div className="nftsListedBySellers">
                {
                    nfts.map((nft, i) =>
                        <div key={i} className="card">
                            <img src={nft.image} className="NftImage"/>
                            <h1>Name:{nft.name}</h1>
                            <p className="price">Price:{nft.price} ETH</p>
                            <p>Description:{nft.description}</p>
                            <p>
                                <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => sellNft(nft)}>Sell Now</button>
                            </p>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ViewAllOwnedHandicrafts;
