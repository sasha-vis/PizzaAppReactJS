import React, {useContext} from 'react';
import Context from '../context';

const SnackProducts = function () {

    const SnackProducts = require('../json/products.json');

    const productArr = Object.values(SnackProducts.snacks);

    let {cart, setCart} = useContext(Context);

    let cartArr = {};

    if (cart.length > 0) {
        cartArr = JSON.parse(cart);
    }

    if (!cartArr.snacks) cartArr.snacks = [];

    const toCart = function (event) {
        const li = event.target.closest('li');

        if (cartArr.snacks.indexOf(li.dataset.id) === -1) {
            cartArr.snacks.push(li.dataset.id);

            let cartStr = JSON.stringify(cartArr);
            localStorage.setItem('cart', cartStr);

            setCart(cartStr);
        }
    };
 
    return (
        <ul className="snacks-goods">{
            productArr.map((item, index) =>
                <li className="product" key={index} data-id={index}>
                    <div className="product-img">
                        <img src={item.img}></img>
                    </div>
                    <div className="product-description">
                        <h3>{item.name}</h3>
                        <div className="size-weight">{item.size}</div>
                        <div className="description">{item.description}</div>
                    </div>
                    <div className="add-container">
                        <div className="cost">{item.cost}</div>
                        {cartArr.snacks.indexOf(item.id) === -1 ? <button className="add-btn" onClick={toCart}>В корзину</button> : <button className="add-btn at-cart" onClick={toCart}>В корзине</button>}
                    </div>
                </li>
            )    
        }</ul>
    );
};

export default SnackProducts;