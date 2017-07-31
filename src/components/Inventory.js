import React from 'react';
import AddGiftForm from './AddGiftForm';
class Inventory extends React.Component {
    render(){
        return(
            <div>
                <h1>Inventory</h1>
                <AddGiftForm addGift={this.props.addGift}/>
                <button onClick={this.props.loadSamples}>Load Samples </button>
            </div>
        )
    }
}

export default Inventory;