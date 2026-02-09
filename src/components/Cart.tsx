import { createPortal } from 'react-dom'

import CartItems from './CartItems.tsx'
import { useAppSelector } from '../store/hooks.ts'

type CartProps = {
  onClose: () => void
}

export default function Cart({ onClose }: CartProps) {
  const cartItems = useAppSelector((state) => state.cart.items)

  return createPortal(
    <>
      <div className='cart-backdrop' />
      <dialog id='cart-modal' open>
        <h2>Your Cart</h2>
        <CartItems cartItems={cartItems} />
        <p id='cart-actions'>
          <button onClick={onClose}>Close</button>
        </p>
      </dialog>
    </>,
    document.getElementById('modal')!,
  )
}
