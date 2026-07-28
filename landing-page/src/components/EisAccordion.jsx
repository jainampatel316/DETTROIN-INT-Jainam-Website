import * as Accordion from '@radix-ui/react-accordion';

/* Styled accordion built on Radix: smooth measured-height animation,
   full keyboard support. `items` is [{ q, a }]. */
export default function EisAccordion({ items, defaultOpen = 0 }) {
  return (
    <Accordion.Root
      className="faq-list"
      type="single"
      collapsible
      defaultValue={defaultOpen >= 0 ? `item-${defaultOpen}` : undefined}
    >
      {items.map((it, i) => (
        <Accordion.Item className="faq-item" value={`item-${i}`} key={i}>
          <Accordion.Header asChild>
            <h3 className="faq-h">
              <Accordion.Trigger className="faq-q">
                <span>{it.q}</span>
                <i className="faq-icon" aria-hidden="true" />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <div className="faq-a">
              <p>{it.a}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
