import { Accordion as BootstrapAccordion } from 'react-bootstrap';
import { AccordionChildProps } from './accordion.props';

/**
 * 기본 Accordion 컴포넌트
 */
export function AccordionChild({
  dataId,
  headerContent,
  bodyContent,
  headerClickHandler,
  ...props
}: AccordionChildProps) {
  return (
    <BootstrapAccordion.Item eventKey={dataId} {...props}>
      <BootstrapAccordion.Header onClick={headerClickHandler}>
        {headerContent}
      </BootstrapAccordion.Header>
      <BootstrapAccordion.Body>
        {bodyContent}
      </BootstrapAccordion.Body>
    </BootstrapAccordion.Item>
  );
}