import React from "react";

const LinkifyDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

export default LinkifyDecorator;
