import actions from "./actions";
import services from "../services";

const startLoadingInitialDecks = actions.startLoadingInitialDecks;
const loadInitialDecks = actions.loadInitialDecks;
const addDeck = actions.addDeck;
const removeDeck = actions.removeDeck;
const updateDeck = actions.updateDeck;
const addCard = actions.addCard;
const removeCard = actions.removeCard;
const updateCard = actions.updateCard;

const requestCreateDeck = deckData => {
  return dispatch => {
    dispatch(actions.startCreatingDeck(deckData));

    return services.currentUser
      .getDecks()
      .add(deckData)
      .then(deckProxy => {
        dispatch(actions.finishCreatingDeck(true));
        return deckProxy;
      })
      .catch(error => {
        dispatch(actions.finishCreatingDeck(false, error));
      });
  };
};

const requestDeleteDeck = deck => {
  return dispatch => {
    dispatch(actions.startDeletingDeck(deck));

    return services.currentUser
      .getDecks()
      .getDeck(deck.id)
      .then(deckProxy => {
        return deckProxy
          .delete()
          .then(() => {
            dispatch(actions.finishDeletingDeck(true));
          })
          .catch(error => {
            dispatch(actions.finishDeletingDeck(false, error));
          });
      });
  };
};

const requestEditDeck = deck => {
  return dispatch => {
    dispatch(actions.startEditingDeck(deck));

    return services.currentUser
      .getDecks()
      .getDeck(deck.id)
      .then(deckProxy => {
        deckProxy
          .update(deck.asUpdatableModel())
          .then(() => {
            dispatch(actions.finishEditingDeck(true));
          })
          .catch(error => {
            dispatch(actions.finishEditingDeck(false, error));
          });
      });
  };
};

export default {
  startLoadingInitialDecks,
  loadInitialDecks,
  requestCreateDeck,
  requestDeleteDeck,
  requestEditDeck,
  addDeck,
  removeDeck,
  updateDeck,
  addCard,
  removeCard,
  updateCard
};
