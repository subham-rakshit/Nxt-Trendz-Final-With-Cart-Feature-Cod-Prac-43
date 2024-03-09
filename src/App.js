import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductDuplicate = cartList.find(item => item.id === product.id)

    if (isProductDuplicate !== undefined) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === isProductDuplicate.id) {
            const updatedQuantity = eachCart.quantity + product.quantity
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cart => {
        if (cart.id === id) {
          const quantityCount = cart.quantity + 1
          return {...cart, quantity: quantityCount}
        }
        return cart
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const findCartItem = cartList.find(item => item.id === id)

    if (findCartItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(cart => {
          if (cart.id === id) {
            const decrementCount = cart.quantity - 1
            return {...cart, quantity: decrementCount}
          }
          return cart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
