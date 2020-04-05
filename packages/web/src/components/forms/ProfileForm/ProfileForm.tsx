import {
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Select, Switch, TextField } from "formik-material-ui";
import React from "react";
import { FancyButton } from "../..";
import { profileSchema } from "../../../schemas";

const ranges = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "0-20",
    label: "0 to 20",
  },
  {
    value: "21-50",
    label: "21 to 50",
  },
  {
    value: "51-100",
    label: "51 to 100",
  },
];

const ProfileForm: React.FC = () => (
  <Formik
    initialValues={{
      email: "",
      password: "",
      select: "none",
      tags: [],
      rememberMe: true,
    }}
    validationSchema={profileSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {({ submitForm, isSubmitting }) => (
      <Form>
        <Field
          component={TextField}
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
        />
        <Field
          component={TextField}
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <FormControlLabel
          control={<Field component={Switch} name="rememberMe" />}
          label="Remember Me"
        />
        <Field
          component={TextField}
          name="select"
          type="text"
          label="With Select"
          select
          variant="outlined"
          fullWidth
          helperText="Please select Range"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="tags">Tags</InputLabel>
          <Field
            component={Select}
            type="text"
            name="tags"
            multiple={true}
            label="Tags"
            inputProps={{ name: "tags", id: "tags" }}
          >
            <MenuItem value="dogs">Dogs</MenuItem>
            <MenuItem value="cats">Cats</MenuItem>
            <MenuItem value="rats">Rats</MenuItem>
            <MenuItem value="snakes">Snakes</MenuItem>
          </Field>
        </FormControl>
        <br />
        {isSubmitting && <LinearProgress />}
        <FormControl margin="normal">
          <FancyButton disabled={isSubmitting} onClick={submitForm}>
            Submit
          </FancyButton>
        </FormControl>
      </Form>
    )}
  </Formik>
);

export { ProfileForm };
