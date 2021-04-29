import React, { useContext } from 'react';
import Context from '../context';

const PizzaProducts = function () {

    const PizzaProducts = require('../json/products.json');

    const productArr = Object.values(PizzaProducts.pizzas);

    let {cart, setCart} = useContext(Context);

    let cartArr = {};

    if (cart.length > 0) {
        cartArr = JSON.parse(cart);
    }

    if (!cartArr.pizzas) cartArr.pizzas = [];

    const toCart = function (event) {
        const li = event.target.closest('li');

        if (cartArr.pizzas.indexOf(li.dataset.id) === -1) {
            cartArr.pizzas.push(li.dataset.id);

            console.log(cartArr)

            let cartStr = JSON.stringify(cartArr);
            localStorage.setItem('cart', cartStr);

            setCart(cartStr);
        }
    };
 
    return (
        <ul className="pizzas-goods">{
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
                        {cartArr.pizzas.indexOf(item.id) === -1 ? <button className="add-btn" onClick={toCart}>В корзину</button> : <button className="add-btn at-cart" onClick={toCart}>В корзине</button>}
                    </div>
                </li>
            )    
        }</ul>
    );
};

export default PizzaProducts;