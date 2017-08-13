import React from 'react';
import AddGiftForm from './AddGiftForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const gift = this.props.gifts[key];
    // take a copy of that gift and update it with the new data
    const updatedGift = {
      ...gift,
      [e.target.name]: e.target.value
    }
    this.props.updateGift(key, updatedGift);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData)  {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const gift = this.props.gifts[key];
    return (
      <div className="gift-edit" key={key}>
        <input type="text" name="name" value={gift.name} placeholder="Gift Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={gift.price} placeholder="Gift Price"  onChange={(e) => this.handleChange(e, key)}/>

        <select type="text" name="status" value={gift.status} placeholder="Gift Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name="desc" value={gift.desc} placeholder="Gift Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={gift.image} placeholder="Gift Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeGift(key)}>Remove Gift</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if they are no logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.gifts).map(this.renderInventory)}
        <AddGiftForm addGift={this.props.addGift}/>
        <button onClick={this.props.loadSamples}>Load Sample Giftes</button>
      </div>
    )
  }

  static propTypes = {
    gifts: React.PropTypes.object.isRequired,
    updateGift: React.PropTypes.func.isRequired,
    removeGift: React.PropTypes.func.isRequired,
    addGift: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
  };
}

export default Inventory;
