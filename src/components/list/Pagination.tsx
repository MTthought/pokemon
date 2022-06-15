import { Page } from "../../Types";

interface Props {
  page: Page;
  pager: (url: string) => void;
}

const Pagination = ({ page, pager }: Props) => (
  <div className="Space-between">
    <button
      onClick={() => (page.previous ? pager(page.previous) : null)}
      disabled={!page.previous}
    >
      previous
    </button>
    <button
      onClick={() => (page.next ? pager(page.next) : null)}
      disabled={!page.next}
    >
      next
    </button>
  </div>
);

export default Pagination;
