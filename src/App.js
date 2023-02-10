import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import db from './db';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: []
    }
  }
  componentDidMount(){
    // db
    // .collection('Products')
    // .get()
    // .then((snapshot)=>{
    //   const products  = snapshot.docs.map((doc)=>{
    //     const data = doc.data();
    //     data['id'] = doc.id;
    //     return data;
    //   });

    //   console.log(products);
    //   this.setState({
    //     products
    //   });
    // }).catch((err)=>{
    //   console.log(err);
    // })

    //Below code will be like listener and automatically change the data on dom

     db
    .collection('Products')
    .onSnapshot((snapshot)=>{
        const products  = snapshot.docs.map((doc)=>{
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
  
        console.log(products);
        this.setState({
          products
        });
      })

  }

  addProduct=()=>{
    db
    .collection('Products')
    .add({
      img:'',
      price:900,
      qty:6,
      title:'Washing Machine'
    })
  }


  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    // products[index].qty += 1;

    // this.setState({
    //   products
    // })

    const docRef = db.collection('Products').doc(product.id);

    console.log(docRef);
    docRef.
    update({
      qty:product.qty+1
    })
    .then(()=>{
      console.log('Updated Successfully');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    // const { products } = this.state;
    // const index = products.indexOf(product);

    // if (products[index].qty === 0) {
    //   return;
    // }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })

    const docRef = db.collection('Products').doc(product.id);

    console.log(docRef);
    docRef.
    update({
      qty:product.qty-1
    })
    .then(()=>{
      console.log('Updated Successfully');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  handleDeleteProduct = (id) => {
    // const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })

    const docRef = db.collection('Products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log('Deleted Successfully');
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })

    return cartTotal;
  }
  render () {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{margin:20}}>Add Product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
