import { Text } from "@/components/atoms/text/Text";
import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { TitleProps } from "./title.props";
import { topColStyle, topRowStyle } from "./title.styles";

export const Title = ({
  children
}: TitleProps) => {
  return (
    <Row css={css(topRowStyle)}>
      <Col css={css(topColStyle)}>
        <Text as="h2" align="center">{children}</Text>
      </Col>
    </Row>
  )
}