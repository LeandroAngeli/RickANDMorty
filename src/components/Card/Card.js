import React from 'react';
import './style.css';

function Card({ character }) {
    return (
        <div className="Card">
            <div className="Card__img">
                
                <img src={character.image} alt="" />
            </div>
            <div className="Card__name">
                {character.name}
            </div>
            
            <div className="Card__info">
                <div className="Card__data Card__data--weight">
                    <p className="title">Species</p>
                    <p>{character.species}</p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Status</p>
                    <p>{character.status}</p>
                </div>
                <div className="Card__data Card__data--ability">
                    <p className="title">Origin</p>
                    <p>{character.origin.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
