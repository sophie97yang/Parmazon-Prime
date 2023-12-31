import {useSelector,useDispatch} from 'react-redux'
import './Orders.css'
import { authenticate, deleteCart, deleteFromCart } from '../../store/session';


function RemoveFromCart({product}) {
    const member = useSelector(state => state.session.member);
    const dispatch = useDispatch();
    const removeFromCart = (e) => {
        e.preventDefault();
        const shopping_cart= member?.orders.filter(order=> order.purchased===false)[0]
        //IF SHOPPING CART HAS MORE THAN ONE PRODUCT(DO NOT NEED TO DELETE FULL ORDER)
        if (shopping_cart.products.length>1) {
        const res = dispatch(deleteFromCart(product.product.id)).catch(res=>res)
        if (!res.errors) {
            dispatch(authenticate())
        }else {
        }
        } else {
            const res = dispatch(deleteCart(shopping_cart,product.product.id)).catch(res=>res)
            if (!res.errors) {
                dispatch(authenticate())
            }else {
            }
        }
}
    return (
        <button className="shopButton" onClick={removeFromCart}>Remove From Cart</button>
    )
}

export default RemoveFromCart
