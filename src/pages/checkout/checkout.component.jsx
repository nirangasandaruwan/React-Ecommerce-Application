import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.style.scss';
import StripeCheckoutButton from '../../components/stripe-button/stripe.component';



const CheckoutPage = ({cartItems,total}) => {


    


    return (

    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='checkout-block'>
                <span>Product</span>
            </div>
            <div className='checkout-block'>
                <span>Description</span>
            </div>
            <div className='checkout-block'>
                <span>Quantity</span>
            </div>
            <div className='checkout-block'>
                <span>Price</span>
            </div>
            <div className='checkout-block'>
                <span>Remove</span>
            </div>
        </div>


        {
        cartItems.map(cartItem =>
            
            (
         <CheckoutItem key={cartItem.id} cartItem={cartItem}/>  
            
        
        )
        
        )
    }

<div className='total'>
        <span>TOTAL: ${total}</span>
    </div>


    <StripeCheckoutButton price={total}/>

    </div>
   

    );

   

};

const mapStateToProps = createStructuredSelector({

    cartItems: selectCartItems,
    total: selectCartTotal
});


export default connect(mapStateToProps)(CheckoutPage);