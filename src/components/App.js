import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component{
    constructor(){
        super();
        
        this.addGift = this.addGift.bind(this);
        //getInitialState
        this.state = {
            gifts:{},
            order:{}
        };
    }
    addGift(gift){
        //update our state
        const gifts={...this.state.gifts};
        //add in our new gift
        const timestamp = Date.now();
        gifts[`gift-${timestamp}`] = gift;
        //set state
        this.setState ({gifts});
    }
    render(){
        return(
            <div className="giftopy">
                <div className="menu">
                    <Header tagline="Gift for your loved ones"/>
                </div>
                <Order />
                <Inventory addGift={this.addGift} />
            </div>
        )
    }
}

export default App;