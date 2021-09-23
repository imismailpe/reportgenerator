import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import dataR from './reducers/dataR';
import watcherSaga from './sagas/saga';
//create saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancers = [applyMiddleware(sagaMiddleware)];
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const rootReducer = combineReducers({
    dataR: dataR
});

const configureStore = () => {
    //mount it on the store
    const store = createStore(
        rootReducer,
        composeEnhancers(...enhancers)
    );
    //then run the saga
    sagaMiddleware.run(watcherSaga);
    return store;
};
export default configureStore;