import React from 'react';
import {formatPrice} from '../helpers';

class Gift extends React.Component {
    render(){
        const details = this.props.details;
        return(
            <li className="menu-gift">
                <img src={details.image} alt={details.name} />
                <h3 className="gift-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
            <p>{details.desc}</p>
            <button>Add to Order</button>
                
            </li>
        )
    }
}

export default Gift;