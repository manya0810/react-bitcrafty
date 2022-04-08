import React, {useEffect, useState} from 'react';
import '../style/view-all-listed-handicrafts.css';
import { ethers } from 'ethers'
import Web3Modal from 'web3modal';
import axios from 'axios'

import {
    marketplaceAddress
} from '../../config'

import NFTMarketPlace from 'contracts/UNIQ_Application.json'

function ViewUserListedHandicrafts() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadMyListedNFTs()
    }, [])
    async function loadMyListedNFTs() {
        /* create a generic provider and query for unsold market items */
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketPlace.abi, provider.getSigner())
        console.log(contract)
        const data = await contract.fetchItemsListed()

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
            }
            return item
        }))

        setNfts(items)
        console.log(items)
        setLoadingState('loaded')
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
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ViewUserListedHandicrafts;
