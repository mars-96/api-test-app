// Custom components
import Button from "../../Button";
import Input from "../../Input";

// Hooks
import { useHistory } from "react-router";
import { useState } from "react";
import { Formik } from "formik";

// Validation classes
import Signup from "../../../validations/signup";

// api
import api from "../../../api";

// utils
import showToast from "../../../utils/notificationUtil";

// Custom css file
import "../../../common.css";

const SignUpForm = () => {
  const history = useHistory();
  const [signUpStatus, setSignUpStatus] = useState(false);

  const handleSignUp = async (data) => {
    setSignUpStatus(true);

    const result = await api.register(data);
    if (result.ok) {
      setSignUpStatus(false);
      showToast(true, "Registration completed");
      history.push("/login");
      return;
    } else showToast(false, result.message);

    setSignUpStatus(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={handleSignUp}
      validationSchema={Signup.signupValidation}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit} className="card-container__form">
          <Input name="name" label="Name" placeholder="Name" />
          <Input name="email" label="Email" placeholder="Email" />
          <Input name="password" label="Password" type="password" placeholder="Password" />
          <Input name="confirmPassword" label="Confirm password" type="password" placeholder="Confirm Password" />
          <Button loading={signUpStatus} type="submit" value={"Sign Up"} fullWidth color="primary" variant="outlined" />
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
