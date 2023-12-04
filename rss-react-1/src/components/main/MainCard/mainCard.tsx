import { FormState } from '../../../shared/interfaces';
interface CardProps {
  card: FormState;
}
const MainCard = (card: CardProps) => {
  return (
    <div>
      <p>{card.card.name}</p>
      <p>Age: {card.card.age}</p>
      <p>{card.card.email}</p>
      <p>{card.card.country}</p>
      <p>{card.card.gender}</p>
      <img
        src={card.card.picture as string}
        alt="picture"
        className="max-w-xs max-h-80 mt-3"
      />
    </div>
  );
};

export default MainCard;
