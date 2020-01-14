import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_vlZZ8gqKoW9DgKEDeNzkLsFs00GGWM6zRr';

   const onToken = token => {
        console.log(token);
    }

    return (

        <StripeCheckout
        
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png'
        description={`Your Total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        
        />
    )
    };


    export default StripeCheckoutButton;