import { capitaliseFirstLetter } from "../../helpers";

interface Props {
  title: string;
  items: any[];
  property: string;
}

const List = ({ title, items, property }: Props) => (
  <>
    <p className="Bold-text">{title}:</p>
    <ul>
      {items.map(
        (item, i) =>
          !item.is_hidden && (
            <li key={i}>{capitaliseFirstLetter(item[property].name)}</li>
          )
      )}
    </ul>
  </>
);

export default List;
