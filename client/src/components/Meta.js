import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({
  title = "Welcome to E-Commerce",
  description = "We sell the best products. Always.",
  keyword = "Electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
};

export default Meta;
