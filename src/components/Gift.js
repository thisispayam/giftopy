import React from 'react';
import {formatPrice} from '../helpers';

class Gift extends React.Component {
    render(){
        const {details, index} = this.props;
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
        return(
            <li className="menu-gift">
                <img src={details.image} alt={details.name} />
                <h3 className="gift-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
            <p>{details.desc}</p>
            <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
                
            </li>
        )
    }
}

export default Gift;