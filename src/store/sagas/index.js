import { all } from 'redux-saga/effects';
// takeLatest: fará a requisição apenas do último clique,
//  caso tenha vários cliques consecutivos

// takeEvery: fará a requisição de todos os
//  requests de vários cliques consecutivos

import Pokemon from './pokemon';

export default function* rootSaga() {
  return yield all([Pokemon]);
}
