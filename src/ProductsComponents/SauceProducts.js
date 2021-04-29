import React, {useContext} from 'react';
import Context from '../context';

const SauceProducts = function () {

    const SauceProducts = require('../json/products.json');

    const productArr = Object.values(SauceProducts.sauces);

    let {cart, setCart} = useContext(Context);

    let cartArr = {};

    if (cart.length > 0) {
        cartArr = JSON.parse(cart);
    }

    if (!cartArr.sauces) cartArr.sauces = [];

    const toCart = function (event) {
        const li = event.target.closest('li');

        if (cartArr.sauces.indexOf(li.dataset.id) === -1) {
            cartArr.sauces.push(li.dataset.id);

            let cartStr = JSON.stringify(cartArr);
            localStorage.setItem('cart', cartStr);

            setCart(cartStr);
        }
    };
 
    return (
        <ul className="sauces-goods">{
            productArr.map((item, index) =>
                <li className="product" key={index} data-id={index}>
                    <div className="product-img">
                        <img src={item.img}></img>
                    </div>
                    <div className="product-description">
                        <h3>{item.name}</h3>
                    </div>
                    <div className="add-container">
                        <div className="cost">{item.cost}</div>
                        {cartArr.sauces.indexOf(item.id) === -1 ? <button className="add-btn" onClick={toCart}>В корзину</button> : <button className="add-btn at-cart" onClick={toCart}>В корзине</button>}
                    </div>
                </li>
            )    
        }</ul>
    );
};

export default SauceProducts;