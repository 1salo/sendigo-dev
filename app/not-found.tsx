import React from "react";
import ErrorLayout from "./layouts/ErrorLayout/ErrorLayout";

const NotFoundPage = () => {
  return (
    <ErrorLayout>
      <div>The requsted page doesn&apos;t exist</div>;
    </ErrorLayout>
  );
};

export default NotFoundPage;
