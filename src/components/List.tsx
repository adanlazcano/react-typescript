import { ReactNode } from "react";
import { Sub } from "types";
interface Props {
  children: ReactNode;
  subs: Array<Sub>;
}

const List = ({ subs, children }: Props) => {
  const renderList = (): JSX.Element[] => {
    return subs.map((sub) => (
      <li key={sub.id}>
        <img src={sub.avatar} alt="avatar" />
        <h4>
          {sub.nick} <small>{sub.subMonths}k</small>
        </h4>
        <p>{sub.desc?.substring(0, 100)}</p>
        {children}
      </li>
    ));
  };
  return <ul>{renderList()}</ul>;
};

export default List;
