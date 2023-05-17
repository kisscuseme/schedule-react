import { Accordion as BootstrapAccordion } from 'react-bootstrap';
import { AccordionParentProps } from './accordion.props';
import { defaultStyle } from './accordion.styles';

/**
 * 기본 Accordion 컴포넌트
 */
export function AccordionParent({
  children,
  ...props
}: AccordionParentProps) {
  return (
    <>
      <style>{defaultStyle}</style>
      <BootstrapAccordion defaultActiveKey={null} {...props}>
        {children}
      </BootstrapAccordion>
    </>
  );
}