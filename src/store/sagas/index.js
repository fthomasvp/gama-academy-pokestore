import { all } from 'redux-saga/effects';

import Pokemon from './pokemon';

export default function* rootSaga() {
  return yield all([Pokemon]);
}
