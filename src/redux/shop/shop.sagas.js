import {takeEvery,call,all,put,takeLatest} from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';
import {fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions';

export function* fetchCollectionsAsync(){
    console.log('im fired');


    try{

    const collectionRef = firestore.collection('collections');
        
    const snapshot = yield collectionRef.get();
         
    const collectionsMap = yield call(convertCollectionSnapshotToMap,snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));

    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }
        
       
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync);
}


export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}

