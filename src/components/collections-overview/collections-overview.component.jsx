import React  from 'react';

import './collections-overview.style.scss';


import {connect} from 'react-redux';

import { createStructuredSelector} from 'reselect';

import { selectCollectionsForPreview} from '../../redux/shop/shop.selector';

import CollectionPreview from '../preview-collection/collection-preview.component';


const CollectionOverview = ({ collections}) => (

    <div className='collections-overview'>
        {

collections.map(({id,...otherCollectionsProps}) => (


<CollectionPreview key={id} {...otherCollectionsProps}/>

)
)

        }

    </div>
);

const mapStateToProps = createStructuredSelector({

    collections : selectCollectionsForPreview
});


export default connect(mapStateToProps)(CollectionOverview);