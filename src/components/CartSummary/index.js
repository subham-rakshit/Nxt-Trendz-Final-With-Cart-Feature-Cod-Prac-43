// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalAmount = 0
      cartList.forEach(item => {
        totalAmount += item.quantity * item.price
      })

      return (
        <div className="summary-container">
          <div className="summary-card">
            <h1 className="total-amount-text">
              Order Total:{' '}
              <span className="total-amount-count">{`Rs ${totalAmount}/-`}</span>
            </h1>
            <p className="cart-items-count">{`${cartList.length} items in cart`}</p>
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          </div>
          <button type="button" className="checkout-btn-mobile">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
