import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleGifts from '../sample-gifts.js';
import Gift from './Gift';
import base from '../base';

class App extends React.Component{
    constructor(){
        super();
        //binding our methods 'this' to the App
        this.addGift = this.addGift.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        //getInitialState
        this.state = {
            gifts:{},
            order:{}
        };
    }

    componentWillMount(){
      //this runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/gifts`,{
            context:this,
            state:'gifts'
        });
      // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef){
          //update our App component's order state
          this.setState({
            order: JSON.parse(localStorageRef)
          });
        }
    }

    componentWillUpdate(nextProps, nextState){
      console.log({nextProps, nextState});
      localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
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
    addToOrder(key){
        //take a copy of our state
        const order = {...this.state.order};
        //update/add the new number of gifts ordered
        order[key] = order[key] + 1 || 1;
        // update our state
        this.setState({order});
    }
    render(){
        return(
            <div className="giftopy">
                <div className="menu">
                    <Header tagline="Vacation deals and promotions"/>
                    <ul className="list-of-gifts">
                        {
                            Object
                                .keys(this.state.gifts)
                                .map(key => <Gift key={key} index={key} details={this.state.gifts[key]} addToOrder = {this.addToOrder} />)
                        }
                    </ul>
                </div>

                <Order
                  gifts={this.state.gifts}
                  order={this.state.order}
                  params={this.props.params}/>

                <Inventory addGift={this.addGift} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;
