import React from 'react';
import {getFunName} from '../helpers'

class StorePicker extends React.Component {
    
    goToStore(e){
        //first grab the text from the input field
        e.preventDefault();
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);
        
        //second we're going to transition from '/' to '/store/:storeId'
        this.context.router.transitionTo(`/store/${storeId}`);
        
    }
    
    render(){
        return (       
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                 {/* This component is the entrance to the actual store */}
                <h2> Please Enter A Store </h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
                <button type="submit">Visit Store </button>
            </form>
        )
    }
}

// making router available from index.js
StorePicker.contextTypes={
    router: React.PropTypes.object
}
export default StorePicker;