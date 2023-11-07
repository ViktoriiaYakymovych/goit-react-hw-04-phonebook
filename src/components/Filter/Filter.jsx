import { Lable, Input } from "./Filter.styled";

export const Filter = ({value, filteredContacts}) => {
    return (
      <Lable>
        Find contact by name
        <Input name="filter" type="text" value={value} onChange={filteredContacts}/>
      </Lable>
    );
} 