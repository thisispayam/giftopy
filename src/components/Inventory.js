import React from 'react';
import AddGiftForm from './AddGiftForm';
class Inventory extends React.Component {
    render(){
        return(
            <div>
                <h1>Inventory</h1>
                <AddGiftForm addGift={this.props.addGift}/>
            </div>
        )
    }
}

export default Inventory;