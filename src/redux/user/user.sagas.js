import {takeLatest,put,all,call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {auth, googleProvider,createUserProfileDocument,getCurrentUser}  from '../../firebase/firebase.utils';

import {googleSignInSuccess,googleSignInFailure,emailSignInSuccess,emailSignInFailure,signOutSuccess,signOutFailure} from './user.actions';



export function* signInWithGoogle() {

    try{

        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield userRef.get();
        yield put(
            googleSignInSuccess({id: userSnapshot.id,...userSnapshot.data()})
            
        );

        console.log(userRef)

    }catch(error){

        yield put(googleSignInFailure(error))

    }
    
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}


export function* getSnapshotFromUserAuth(userAuth) {
    try{

        const userRef = yield call(createUserProfileDocument,userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({id: userSnapshot.id,...userSnapshot.data()})
            
        );
        
    } catch (error) {
        put(emailSignInFailure(error))
    }
   
}

export function* signInWithEmail({payload:{email,password}}){
    try {

        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);
        
    } catch (error) {
        put(emailSignInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart),call(onEmailSignInStart),call(onCheckUserSession),call(onSignOutStart)]);
}


export function* isUserAuthenticated(){

    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(emailSignInFailure(error));
        yield put(googleSignInFailure(error));
    }

}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}


export function* signOut() {
    try {
        yield auth.signOut();
        yield (put(signOutSuccess()));
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}