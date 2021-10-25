import React from 'react';

const Pagination = ({ page, pager }) => (
    <div className="Space-between">
      <button onClick={() => pager(page.previous)} disabled={!page.previous}>previous</button>
      <button onClick={() => pager(page.next)} disabled={!page.next}>next</button>
    </div>
);

export default Pagination;