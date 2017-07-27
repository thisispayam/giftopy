import React from 'react';

class StorePicker extends React.Component {
    render(){
        return (       
            <form className="store-selector">
                 {/* This component is the entrance to the actual store */}
                <h2> Please Enter A Store </h2>
                <input type="text" required placeholder="Store Name" />
                <button type="submit">Visit Store </button>
            </form>
        )
    }
}

export default StorePicker;