import React from 'react';
import './create-nft.css';
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import {
    marketplaceAddress
} from '../../config'

import NFTMarketPlace from 'app-b-dashboard/UNIQ_Application.json'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

function CreateNft() {

    const [fileUrl, setFileUrl] = useState(null)
    const router = useRouter()
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })

    async function onChange(e) {
        /* upload image to IPFS */
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)

        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
    async function uploadToIPFS() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return
        /* first, upload metadata to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            console.log(added.path)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
            return url
        } catch (error) {
            console.log("error in ipfs",error)
        }
    }

    function delay(n){
        return new Promise(function(resolve){
            setTimeout(resolve,n*1000);
        });
    }
    async function listNFTForSale() {
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            // console.log(signer)
            /* create the NFT */
            const url = await uploadToIPFS()
            const price = ethers.utils.parseUnits(formInput.price, 'ether');
            let contract = new ethers.Contract(marketplaceAddress, NFTMarketPlace.abi, signer)
            let listingPrice = await contract.getListingPrice()
            // listingPrice = listingPrice.toString()
            console.log(listingPrice)
            let transaction = await contract.createToken(url, price, {value: listingPrice})
            await transaction.wait()
            console.log("successssssss")
            router.push('/')
        }catch (e) {
            console.log("error in listing",e)
        }

    }

    return (
        <>
            <form>
                <br/>
                <input type="text"
                       id="AssetName"
                       className="AssetName"
                       name="Asset Name"
                       placeholder="Please type Asset Name here"
                       onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                <br/>
                <input type="text"
                       id="desc"
                       name="desc"
                       placeholder="Description"
                       className="AssetDescription"
                       onChange={e => updateFormInput({ ...formInput, description: e.target.value })}/>
                <br/>
                <input
                    placeholder="Asset Price in Eth"
                    className="assetPrice"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <br/>
                <label htmlFor="myfile">Select an Image of Handicraft:</label>
                <br/>
                <input type="file" id="myfile" name="myfile" onChange={onChange}/>
                <br/>
                {
                    fileUrl && (
                        <img className="rounded mt-4" width="350" src={fileUrl} />
                    )
                }
                <br/>
                <input type="submit" value="List Item for Sale" onClick={listNFTForSale}/>
            </form>
        </>
    );
}

export default CreateNft;
