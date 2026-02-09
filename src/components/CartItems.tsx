import { cartActions, type CartItem } from '../store/cart-slice.ts'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'

export default function CartItems() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  const totalPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity
  }, 0)
  const formattedTotalPrice = totalPrice.toFixed(2)

  function handleAddToCart(item: CartItem) {
    dispatch(
      cartActions.addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
      }),
    )
  }

  function handleRemoveFromCart(id: string) {
    dispatch(cartActions.removeFromCart(id))
  }

  return (
    <div id='cart'>
      {cartItems.length === 0 && <p>No items in cart!</p>}

      {cartItems.length > 0 && (
        <ul id='cart-items'>
          {cartItems.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span>&nbsp;({formattedPrice})</span>
                </div>
                <div className='cart-item-actions'>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <p id='cart-total-price'>
        Cart Total: <strong>${formattedTotalPrice}</strong>
      </p>
    </div>
  )
}
