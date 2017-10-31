import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import DecksServices from '../../services/DecksServices';
import EditingDeckStore from './Store';

class Actions {

  start(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.START,
      deck
    });
  }

  update(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.UPDATE,
      deck
    });
  }

  finish() {
    const deck = EditingDeckStore.getState().get('deck');
    new DecksServices().changeDeck(deck);
    Dispatcher.dispatch({
      type: ActionsTypes.FINISH,
      deck
    });
  }

  cancel() {
    Dispatcher.dispatch({
      type: ActionsTypes.CANCEL
    });
  }

}

export default new Actions();