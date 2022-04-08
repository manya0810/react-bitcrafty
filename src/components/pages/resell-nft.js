import React, {useEffect, useState} from 'react';
import '../style/post-handicraft-for-sale.css';
import {ethers} from 'ethers'
import axios from "axios";
import Web3Modal from 'web3modal'
import {marketplaceAddress} from '../../config'

import NFTMarketPlace from 'contracts/UNIQ_Application.json'

function ResellNft() {
    const [formInput, updateFormInput] = useState({image: '', price: ''})
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const tokenURI = params.tokenURI;
    const tokenId = params.tokenId;

    useEffect(() => {
        loadNftDetails()
    })

    async function loadNftDetails() {

        const meta = await axios.get(tokenURI)
        updateFormInput(state => ({...state, image: meta.data.image}))
    }

    async function listNFTForSale() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketPlace.abi, signer)
        alert(tokenId)
        let listingPrice = await contract.getListingPrice()
        alert(listingPrice)
        listingPrice = listingPrice.toString()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        const transaction = await contract.resellToken(tokenId, price,{
            value: listingPrice
        })
        await transaction.wait()
        alert("transaction complete")
        window.location.assign('/')
    }


    return (
        <div>
            <br/>
            <input
                placeholder="Asset Price in Eth"
                className="assetPrice"
                onChange={e => updateFormInput({...formInput, price: e.target.value})}
            />
            <br/>
            {
                formInput.image && (
                    <img className="rounded mt-4" width="350" src={formInput.image}/>
                )
            }
            <br/>
            <input type="submit" value="List Item for Sale" onClick={listNFTForSale}/>
        </div>
    )
}

export default ResellNft;