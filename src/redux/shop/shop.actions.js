import ShopActionTypes from './shop.types';



/* export const updateCollections = (collectionMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionMap
});
 */


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {

    console.log("called");

    return dispatch => {
        
        
    };
}
