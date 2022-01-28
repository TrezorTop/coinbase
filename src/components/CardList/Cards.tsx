import React, { FC, useEffect, useState } from "react";
import classes from "./Cards.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Card from "./Card/Card";
import { fetchCoins } from "../../store/action-creators/coins";
import { useActions } from "../../hooks/useActions";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import { filterArrayObjectsByParams } from "../../util/filter-array-objects-by-params";

interface ICardsState {
  isFiltered: boolean;
  filteredCoinsId: string[];
}

const Cards: FC = () => {
  const [state, setState] = useState<ICardsState>({
    isFiltered: false,
    filteredCoinsId: [],
  });

  const { coins, isFetching, errorMessage } = useTypedSelector(
    (state) => state.coinsState
  );

  const { fetchCoins, updateCoin } = useActions();

  useEffect(() => {
    fetchCoins();
  }, []);

  const likeButtonHandler = (id: string, liked: boolean) => {
    updateCoin(id, { liked });
  };

  const filterButtonHandler = () => {
    setState({
      isFiltered: !state.isFiltered,
      filteredCoinsId: filterArrayObjectsByParams(coins, { liked: true }).map(
        (item) => item.id
      ),
    });
  };

  return (
    <div className={classes.Cards}>
      <ToggleButton
        onClick={filterButtonHandler}
        status={state.isFiltered}
        primaryTitle={"OFF"}
        secondaryTitle={"ON"}
      />

      {isFetching && <div>Loading...</div>}

      {errorMessage && <div>{errorMessage}</div>}

      {!state.isFiltered
        ? coins.map((coin) => (
            <Card
              key={coin.id}
              id={coin.id}
              name={coin.name}
              image={coin.image}
              market_cap_rank={coin.market_cap_rank}
              current_price={coin.current_price}
              high_24h={coin.high_24h}
              low_24h={coin.low_24h}
              liked={coin.liked}
              likeClicked={likeButtonHandler}
            />
          ))
        : coins
            .filter((item) => state.filteredCoinsId.includes(item.id))
            .map((coin) => (
              <Card
                key={coin.id}
                id={coin.id}
                name={coin.name}
                image={coin.image}
                market_cap_rank={coin.market_cap_rank}
                current_price={coin.current_price}
                high_24h={coin.high_24h}
                low_24h={coin.low_24h}
                liked={coin.liked}
                likeClicked={likeButtonHandler}
              />
            ))}
    </div>
  );
};

export default Cards;
