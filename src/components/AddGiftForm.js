import React from 'react';

class AddGiftForm extends React.Component {
    createGift(event){
        event.preventDefault();
        const gift = {
            name:this.name.value,
            price:this.price.value,
            status:this.status.value,
            desc:this.desc.value,
            image:this.image.value
        }
        console.log(gift);
        this.props.addGift(gift);
        this.giftForm.reset();
    }

    render(){
        return(
            <form ref={(input) => this.giftForm = input} className="gift-edit" onSubmit={(e) => this.createGift(e)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Gift Name" />
                <input ref={(input) => this.price = input} type="text" placeholder="Gift Price" />
                <select ref={(input) => this.status = input} >
                    <option value="available">Available!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input) => this.desc = input} type="text" placeholder="Gift Desc."></textarea>
                <input ref={(input) => this.image = input} type="text" placeholder="Gift Image" />
                <button type="submit">+Add Item</button>
            </form>
        )
    }
}

AddGiftForm.propTypes = {
  addGift: React.PropTypes.func.isRequired
};
export default AddGiftForm;
