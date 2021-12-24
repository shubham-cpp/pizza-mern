import React, { ReactElement } from 'react';

const NotFound = function (): ReactElement {
  return (
    <article className="mt-4 flex flex-col items-center gap-4">
      <h1 className="text-4xl font-source-code font-semibold text-red-600">
        Page Not Found
      </h1>
      <img
        src="https://img.freepik.com/free-vector/404-error-page-found_41910-364.jpg?size=626&ext=jpg"
        alt="Page not found"
      />
    </article>
  );
};

export default NotFound;
