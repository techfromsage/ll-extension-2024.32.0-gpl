import React from 'react';
import htmlParser, { domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';

const FormatNotificationMessage = (message: string, onClick: (href: string) => void) => {
  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode.type === 'text') {
        return domNode;
      }
      const element = domNode as Element;
      if (element.type !== 'tag') {
        return domNode;
      }
      if (element.name === 'p') {
        return <p className="notification__paragraph">{domToReact(element.children, options)}</p>;
      }
      if (element.name === 'a' && element.attribs) {
        const classes = [
          'link',
          element.attribs.class?.includes('button') && 'link--as-button',
        ].filter(Boolean);
        return (
          <a
            className={classes.join(' ')}
            href={element.attribs.href}
            target={element.attribs.target || '_blank'}
            rel="noopener noreferrer"
            onClick={() => onClick(element.attribs.href)}
          >
            {domToReact(element.children)}
          </a>
        );
      }
      return domNode;
    },
  };
  return htmlParser(message, options);
};

export default FormatNotificationMessage;
