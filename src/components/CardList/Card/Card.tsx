import React, { FC } from "react";
import classes from "./Card.module.scss";
import { ICoin } from "../../../types/coins";

interface ICardProps extends ICoin {
  likeClicked: (id: string, liked: boolean) => void;
}

const Card: FC<ICardProps> = ({
  id,
  name,
  market_cap_rank,
  image,
  current_price,
  high_24h,
  low_24h,
  likeClicked,
  liked,
}) => {
  return (
    <div className={classes.Card}>
      <div className={classes.CoinImage}>
        <img src={image} alt={id} />
      </div>
      <div className={classes.CoinInfo}>
        <div className={classes.InfoRow}>
          <span>Market rank:</span>
          <div className={classes.DotLeader} />
          <span>{market_cap_rank}</span>
        </div>
        <div className={classes.InfoRow}>
          <span>Coin:</span>
          <div className={classes.DotLeader} />
          <span>{name}</span>
        </div>
        <div className={classes.InfoRow}>
          <span>Price:</span>
          <div className={classes.DotLeader} />
          <span>{current_price}</span>
        </div>
        <div className={classes.InfoRow}>
          <span>24h highest:</span>
          <div className={classes.DotLeader} />
          <span>{high_24h}</span>
        </div>
        <div className={classes.InfoRow}>
          <span>24h lowest:</span>
          <div className={classes.DotLeader} />
          <span>{low_24h}</span>
        </div>
      </div>
      <button onClick={() => likeClicked(id, !liked)}>
        liked: {liked.toString()}
      </button>
    </div>
  );
};

export default Card;
