import React from "react";
import { Formik } from "formik";
import { feedbackSchema } from "./schema";
import {
  Grid,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Select
} from "@material-ui/core";
import { renderOptions } from "../../../services/helpers";
import Button from "../../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function index(props: Props) {
  const { onSubmit, feedbackTypes } = props;
  const initialValues = {
    name: "",
    message: "",
    email: "",
    feedbackType: 1
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={feedbackSchema}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        errors,
        values,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className="mfl-max-width">
                <TextField
                  value={values.name}
                  name="name"
                  label="Name"
                  placeholder="Enter Your Name"
                  error={touched.name && typeof errors.name != "undefined"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="component-error-text"
                />
                {errors.name && touched.name && (
                  <FormHelperText id="component-error-text">
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className="mfl-max-width">
                <TextField
                  value={values.email}
                  name="email"
                  label="Email"
                  placeholder="Enter Your Email"
                  error={touched.email && typeof errors.email != "undefined"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="component-error-text"
                />
                {errors.email && touched.email && (
                  <FormHelperText id="component-error-text">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <InputLabel htmlFor="feedbackType">Feedback Type</InputLabel>
              <FormControl className="mfl-max-width">
                <Select
                  value={values.feedbackType}
                  onBlur={handleBlur}
                  error={
                    touched.feedbackType &&
                    typeof errors.feedbackType != "undefined"
                  }
                  onChange={(e: any) =>
                    setFieldValue("feedbackType", e.target.value)
                  }
                  inputProps={{
                    id: "feedbackType",
                    name: "feedbackType"
                  }}
                >
                  {renderOptions(feedbackTypes, "feedback_type")}
                </Select>
                {errors.feedbackType && touched.feedbackType && (
                  <FormHelperText>{errors.feedbackType}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className="mfl-max-width">
                <TextField
                  rows={4}
                  multiline
                  value={values.message}
                  name="message"
                  label="message"
                  placeholder="Type Message"
                  error={
                    touched.message && typeof errors.message != "undefined"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="component-error-text"
                />
                {errors.message && touched.message && (
                  <FormHelperText id="component-error-text">
                    {errors.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                style={{ marginLeft: "0px" }}
                disabled={isSubmitting}
                theme="secondary"
                icon={<FontAwesomeIcon icon={faPaperPlane} />}
              >
                {isSubmitting ? "Submitting" : "Submit Feedback"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}

export default index;

type Props = {
  onSubmit: any;
  feedbackTypes: Array<any>;
};
