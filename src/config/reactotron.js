import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure({ name: 'pokestore' })
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

reactotron.clear();

export default reactotron;
