import React from "react";
import Banner from "../../components/atoms/Banner";
import Container from "../../components/atoms/Container";
import Card from "../../components/atoms/Card";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Heading from "../../components/atoms/SectionSubHeading";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFilePdf,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import FaqPanel from "./components/FaqPanel";

function index() {
  const faqs = [
    {
      question: "Know your Health Facilities",
      children: [
        {
          question: "How do I view a health facility(s)?",
          answer:
            "To view a health facility, click on the “Facilities” menu item and browse through the list in the table to locate the facility desired. You can also locate a facility by clicking on the advanced search filter “icon goes here” and specifying the relevant parameters to return the desired facility(s)."
        },
        {
          question: "How do I add a health facility?",
          answer:
            "You can only add a facility if you have access control rights to the system. Once logged in, click on the “Facilities” menu item and then click on the “Add Facility” button to add a facility in the system. Proceed to fill in all details of the facility in the “New Facility” form wizard before saving all content in the system. *Please note that you can only add a facility by completing all sections of the “New Facility” form wizard."
        },
        {
          question: "How do I edit a health facility?",
          answer:
            "You can only edit a facility if you have access control rights to the system. Once logged in, locate the facility by clicking on the “Facilities” menu item and browse through the list in the table to locate the facility desired. You can also locate a facility by clicking on the advanced search filter “icon goes here” and specifying the parameters to return the desired facility(s). Proceed to edit the Facility summary, contacts, resource, utilities and services section by clicking on the “Update Facility” button. Upon completion, click on the “save” button to apply the changes."
        }
      ]
    },
    {
      question: "Downloading a Facility(s)",
      children: [
        {
          question: "How do I download a health facility?",
          answer:
            "To download a health facility, click on the “Facilities” menu item and browse through the list in the table to locate the facility desired. You can also locate a facility by clicking on the advanced search filter “icon goes here” and specifying the parameters to return the desired facility(s). Click on the health facility to access its details. Click on the “Download PDF” button to download details of the facility in PDF format."
        },
        {
          question: "How do I download health facilities?",
          answer:
            "To download health facilities, click on the “Facilities” menu item and click on the “download Excel” or “download PDF” to download all health facilities in the system. In either Excel or PDF format. "
        }
      ]
    },
    {
      question: "Searching for a facility(s)",
      children: [
        {
          question: "How do I search for a health facility?",
          answer:
            "To search for a health facility, in the “Home” section of the application, click on the search icon “icon goes here” and supply the search criteria in the text field. Press the “Enter” key on your keyboard to return results or from the list of suggestions, click on the desired facility to access its details. *Please note that you can only search for a facility by name or facility code in the “Home” section of the application."
        },
        {
          question: "How do I perform an advanced search for a facility(s)?",
          answer:
            "To perform an advanced search, click on the “Facilities” menu item, then click on the advanced search filter “icon goes here” and specify the relevant parameters to return the desired facility(s)."
        }
      ]
    },
    {
      question: "User Management",
      children: [
        {
          question: "How do I add a user?",
          answer:
            "To add a new user to the system, make sure you are logged in as an administrator. Click on the “Users” menu item to open the User Management page. Proceed to click on “Add new user” button to add the user to the system. Enter the details of the new user and click on “Add user” button to update the new user in the system."
        },
        {
          question: "How do I edit a user?",
          answer:
            "To edit an existing user in the system, make sure you are logged in as an administrator. Click on the “Users” menu item to open the User Management page. Locate the user and click on the “Update” button to edit details of the user. Upon completion, click on “Save Changes” to update the record in the database. "
        },
        {
          question: "How do I delete a user?",
          answer:
            "To delete an existing user in the system, make sure you are logged in as an administrator. Click on the “Users” menu item to open the User Management page. Locate the user and click on the delete icon “icon goes here” to remove the user from the system. Confirm deletion by accepting the prompt message. *Please note that deleting a user will also remove the user from his/her assigned user group. "
        },
        {
          question: "How do I search for a user?",
          answer:
            "To search for a user in the system, make sure you are logged in as an administrator. Click on the “Users” menu item to open the User Management page. Enter your search criteria in the text field and press “Enter” on your keyboard to return the user. "
        },
        {
          question: "How do I sort users?",
          answer:
            "To sort users by first or last name, make sure you are logged in as an administrator. Click on the “Users” menu item to open the User Management page. Sort users by first or last name by clicking on the “Sort by username” dropdown box and selecting either option. "
        }
      ]
    },
    {
      question: "Submitting Feedback on a Health Facility(s)",
      children: [
        {
          question:
            "How do I submit feedback or report a facility through the system?",
          answer:
            "To submit feedback, click on the “More” menu item and select “Feedback” from the dropdown list. In the Feedback page, enter the details in the fields provided and click on “Submit Feedback” button to submit the feedback to relevant system users."
        }
      ]
    },
    {
      question: "Documentation",
      answer:
        "Please note that useful documentation for the system can be found and downloaded under the “Useful Links” section in the “Feedback” and “Help” pages."
    },
    {
      question: "Passwords",
      children: [
        {
          question: "How do I change a password for a Systems Administrator?",
          answer:
            "To change the password for a Systems Administrator, make sure you are logged in as an administrator. Click on the user logged in on the main menu bar and then click on “change password” to open the “change password” from. Click on “Save password” to update the new password."
        },
        {
          question: "How do I change a password for a user?",
          answer:
            "To change the password for a user, make sure you are logged in as an administrator. Click on the “Users” menu item to open the User Management page. Locate the user and click on the “Update” button to edit the user’s password. Upon completion, click on “Save Changes” to update the new password in the database. "
        }
      ]
    }
  ];

  const renderFaq = (faqs: any) => {
    if (faqs.length === 0) {
      return;
    }
    return faqs.map((faq: any) => {
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
          {faq.children ? (
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
                {faq.question}
              </ExpansionPanelSummary>
              {renderFaq(faq.children)}
            </ExpansionPanel>
          ) : (
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
                {faq.question}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{faq.answer}</ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </ExpansionPanel>
      );
    });
  };

  return (
    <>
      <Banner title="Let Us Help You" />
      <Container style={{ paddingTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Heading>FAQs</Heading>
            <Card bodyStyle={{ padding: "20px" }}>
              {faqs.map((faq: any) => (
                <FaqPanel faq={faq} />
              ))}
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Heading>Instructions</Heading>
            <video
              style={{ width: "100%", background: "black" }}
              controls
              preload="none"
            >
              <source src={"/static/video/movie.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Heading>Useful Links</Heading>
            <TextContainer>
              <div>
                <a href="/">
                  <Icon icon={faFilePdf} />
                  Guidelines
                </a>
              </div>
              <div>
                <a href="/">
                  <Icon icon={faFileAlt} />
                  Instruction Manual
                </a>
              </div>
            </TextContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default index;

const TextContainer = styled.div`
  color: #484848;
  & a {
    font-weight: bold;
  }
  & div {
    padding: 3px 0px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 24px;
`;
