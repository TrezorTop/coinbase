import { CoinsAction, CoinsActionsEnum, ICoinsState } from "types/coins";

const initialState: ICoinsState = {
  coins: [],
  isFetching: false,
  errorMessage: null,
  page: 1,
};

export const coinsReducer = (
  state = initialState,
  action: CoinsAction
): ICoinsState => {
  switch (action.type) {
    case CoinsActionsEnum.FETCH_COINS:
      return {
        isFetching: true,
        errorMessage: null,
        coins: state.coins,
        page: state.page,
      };
    case CoinsActionsEnum.FETCH_COINS_SUCCESS:
      return {
        isFetching: false,
        errorMessage: null,
        coins: [...state.coins, ...action.payload],
        page: state.page + 1,
      };
    case CoinsActionsEnum.FETCH_COINS_ERROR:
      return {
        isFetching: false,
        errorMessage: action.payload,
        coins: state.coins,
        page: state.page,
      };
    case CoinsActionsEnum.UPDATE_COIN:
      return {
        isFetching: false,
        errorMessage: null,
        coins: state.coins.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.params }
            : item
        ),
        page: state.page,
      };
    default:
      return state;
  }
};
