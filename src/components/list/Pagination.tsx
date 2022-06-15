import { Page } from "../../Types";

interface Props {
  page: Page;
  pager: (url: string) => void;
}

const Pagination = ({ page, pager }: Props) => (
  <div className="Space-between">
    <button onClick={() => pager(page.previous)} disabled={!page.previous}>
      previous
    </button>
    <button onClick={() => pager(page.next)} disabled={!page.next}>
      next
    </button>
  </div>
);

export default Pagination;
