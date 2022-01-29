import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as CoinActionCreators from "store/action-creators/coins";
import { useEffect } from "react";

export const useActions = () => {
  const dispatch = useDispatch();
  const creators = bindActionCreators(CoinActionCreators, dispatch);
  const { fetchCoins } = creators;

  useEffect(() => {
    fetchCoins();
  }, []);

  return creators;
};
