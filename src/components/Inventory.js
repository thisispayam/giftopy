import React from 'react';
import AddGiftForm from './AddGiftForm';
import base from '../base';
class Inventory extends React.Component {
    constructor(){
      super();
      this.renderInventory = this.renderInventory.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key){
      const gift = this.props.gifts[key];
      // take a copy of that gift and update it with the new data
      const updatedGift={
        ...gift,
        [e.target.name]: e.target.value
      }
      this.props.updateGift(key, updatedGift);
    }

    renderInventory(key) {
    const gift = this.props.gifts[key];
    return (
      <div className="gift-edit" key={key}>
        <input type="text" name="name" value={gift.name} placeholder="gift Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={gift.price} placeholder="gift Price"  onChange={(e) => this.handleChange(e, key)}/>

        <select type="text" name="status" value={gift.status} placeholder="gift Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name="desc" value={gift.desc} placeholder="gift Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={gift.image} placeholder="gift Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={()=> this.props.removeGift(key)}>Remove gift</button>
      </div>
    )
  }
    render(){
        return(
            <div>
                <h1>Inventory</h1>
                {Object.keys(this.props.gifts).map(this.renderInventory)}
                <AddGiftForm addGift={this.props.addGift}/>
                <button onClick={this.props.loadSamples}>Load Samples </button>
            </div>
        )
    }
}

export default Inventory;
