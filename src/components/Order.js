import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component {
    constructor(){
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key){
        const gift = this.props.gifts[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if (!gift || gift.status === 'unavailable'){
            return <li key={key}> Sorry, {gift ? gift.name : 'gift'} is no longer available! {removeButton} </li>
        }
        return(
            <li key={key}>
                <span>{count} x {gift.name}  {removeButton}</span>
                <span className="price">{formatPrice(count * gift.price)}</span>
            </li>
        )
    }

    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const gift = this.props.gifts[key];
            const count = this.props.order[key];
            const isAvailable = gift && gift.status === 'available';
            if(isAvailable){
                return prevTotal + (count * gift.price || 0)
            }
            return prevTotal;
        }, 0);
        return(
            <div className="order-wrap">
                <h2> Your order </h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order;
