import React,{useEffect} from 'react';


import CollectionPreview from '../../components/preview-collection/collection-preview.component';

import { selectCollections} from '../../redux/shop/shop.selector';
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';


import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';


import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {fetchCollectionsStartAsync,fetchCollectionsStart} from '../../redux/shop/shop.actions';

import { selectIsCollectionFetching,selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({fetchCollectionsStart,match,isCollectionLoaded,isCollectionFetching}) => {
   
  
  
    useEffect(()=>{

      fetchCollectionsStart();

    },[fetchCollectionsStart]);
  
    
     
     
      return (
        <div className='shop-page'>
          <Route
            exact
            path={`${match.path}`}
            render={props => (
              <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props} />
            )}
          />
          <Route
            path={`${match.path}/:collectionId`}
            render={props => (
              <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
            )}
          />
        </div>
      );
    }
  
  
  const mapDispatchToProps = dispatch => ({

    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    
  });

  const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShopPage);