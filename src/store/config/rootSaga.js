import { all } from 'redux-saga/effects';
// import FantaleagueWatcher from '../fantaleague/FantaleagueWatcher';
// import FriendWatcher from '../friend/FriendWatcher';
// import UserWatcher from '../user/UserWatcher';
// import SessionWatcher from '../tokenReducer/SessionWatcher';

export default function* rootSaga() {
  yield all([
    // ...FantaleagueWatcher,
    // ...FriendWatcher,
    // ...UserWatcher,
    // ...SessionWatcher,
  ]);
}
