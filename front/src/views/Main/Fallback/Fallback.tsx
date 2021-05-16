import React, { memo } from "react";

const Fallback = () => {
  return <div>Fallback</div>;
};

export default memo(Fallback);
