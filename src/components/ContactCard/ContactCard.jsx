import { ListWrapper, Button } from "./ContactCard.styled";

export const ContactCard = ({ contact: { id, name, number}, onDelete}) => {
  return (
    <ListWrapper>
      <p>{name}</p>
      <p>{number}</p>
      <Button type="button" onClick={() => onDelete(id)}>Delete</Button>
    </ListWrapper>
  );
};
