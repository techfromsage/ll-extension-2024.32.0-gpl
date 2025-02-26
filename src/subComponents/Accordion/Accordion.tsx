import React from 'react';
import {
  Accordion as ReactAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import AccordionArrowIcon from '@/icons/AccordionArrowIcon';

export interface AccordionItemValues {
  uuid: string,
  expanded: boolean,
  title: string,
  contentLength?: number,
  icon?: JSX.Element,
  strapline?: string,
  content: JSX.Element | JSX.Element[],
  expandable?: boolean,
}

interface Props {
  items: AccordionItemValues[],
  allowZeroExpanded?: boolean,
  preExpandedUuids?: string[],
  onChange?: (uuids: string[]) => void,
}

/**
 * Accordion
 */
const Accordion = ({
  items, allowZeroExpanded = true, preExpandedUuids = [], onChange,
}: Props) => {
  return (
    <ReactAccordion
      className="accordion--default"
      allowMultipleExpanded
      allowZeroExpanded={allowZeroExpanded}
      preExpanded={preExpandedUuids}
      onChange={onChange}
    >
      {
        items.map((item, index) => {
          if (item.contentLength === 0) {
            return <div key={index} />;
          }

          return (
            <AccordionItem
              uuid={item.uuid}
              key={`accordion-item-${index}`}
              data-testid={`accordion-item-${item.title}`}
            >
              <AccordionItemState>
                { ({ expanded }) => {
                  const expandable = 'expandable' in item ? item.expandable : true;
                  const classes = ['accordion__body', expanded && 'accordion__body--open'].filter(Boolean);
                  const titleClasses = [
                    'accordion__heading__title',
                    item.icon ? 'accordion__heading__title--with-icon' : '',
                  ];

                  const panelClasses = [
                    'accordion__panel',
                    !item.strapline ? 'accordion__panel--no-strapline' : '',
                  ];

                  return (
                    <div className={classes.join(' ')}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <div className={titleClasses.join(' ')}>
                            { item.icon }
                            <span>{ item.title }</span>
                          </div>
                          { !!item.strapline && <p className="accordion-body">{ item.strapline }</p> }

                          { expandable && <AccordionArrowIcon expanded={expanded || false} /> }
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className={panelClasses.join(' ')}>
                        { item.content }
                      </AccordionItemPanel>
                    </div>
                  );
                } }
              </AccordionItemState>
            </AccordionItem>
          );
        })
      }
    </ReactAccordion>
  );
};

export default Accordion;
