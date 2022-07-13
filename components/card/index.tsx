import React, { FC } from "react";
import { CardProps } from "./card.interface";

const Card: FC<CardProps> = ({ Name }) => {
  return <li className="list-group-item">{Name}</li>;
};

export default Card;
