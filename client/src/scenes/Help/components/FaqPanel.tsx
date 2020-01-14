import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function FaqPanel(props: Props) {
  const { faq } = props;
  return (
    <ExpansionPanel
      style={{
        marginBottom: "10px",
        boxShadow: "none",
        border: "1px solid #ddd",
        borderRadius: "10px",
        color: "#545454"
      }}
    >
      <ExpansionPanelSummary
        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      >
        <b>{faq.question}</b>
      </ExpansionPanelSummary>
      {faq.children ? (
        faq.children.map(f => <Faq faq={f} />)
      ) : (
        <ExpansionPanelDetails>{faq.answer}</ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
}

type Props = {
  faq: {
    question: string;
    children?: Array<{
      question: string;
      answer: string;
    }>;
    answer?: string;
  };
};
type faqProps = {
  faq: {
    question: string;
    answer: string;
  };
};

export default FaqPanel;

function Faq(props: faqProps) {
  const { faq } = props;
  return (
    <ExpansionPanel
      style={{
        marginBottom: "0px",
        boxShadow: "none",
        border: "1px solid #ddd",

        color: "#545454"
      }}
    >
      <ExpansionPanelSummary
        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      >
        {faq.question}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{faq.answer}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
