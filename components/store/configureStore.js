import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer';
import { AsyncStorage } from 'react-native';  
import { createTransform } from 'redux-persist';
import JSOG from 'jsog'

export const JSOGTransform = createTransform(
    (inboundState, key) => JSOG.encode(inboundState),
    (outboundState, key) => JSOG.decode(outboundState),
)


const persistConfig = {
    key : 'root',
    storage: AsyncStorage,
    transforms: [JSOGTransform]
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {
        store,
        persistor
    }
}
