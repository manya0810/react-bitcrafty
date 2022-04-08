import React from 'react';
import './Card.css';
import CardItem from './CardItems';

function Cards(nft) {
    return (
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src= {nft.image}
                            text= {nft.description}
                            label={nft.price} ETH
                        />
                    </ul>
                </div>
    );
}

export default Cards;
