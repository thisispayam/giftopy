import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleGifts from '../sample-gifts.js';
import Gift from './Gift';


class App extends React.Component{
    constructor(){
        super();
        //binding our methods 'this' to the App
        this.addGift = this.addGift.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
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
    loadSamples(){
        this.setState({
            gifts: sampleGifts
        });
    }
    render(){
        return(
            <div className="giftopy">
                <div className="menu">
                    <Header tagline="Gift for your loved ones"/>
                    <ul className="list-of-gifts">
                        {
                            Object
                                .keys(this.state.gifts)
                                .map(key => <Gift key={key} details={this.state.gifts[key]} />) 
                        }
                    </ul>
                </div>
                
                <Order />
                <Inventory addGift={this.addGift} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;