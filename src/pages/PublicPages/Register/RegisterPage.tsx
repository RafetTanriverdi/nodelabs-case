import Button from "@rt/components/ui/Button/Button";
import Input from "@rt/components/ui/Input/Input";
import Text from "@rt/components/ui/Text/Text";
import logo from "@rt/assets/images/logo.png";

import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import styles from "./RegisterPage.module.scss";

import { useRegister } from "@rt/hooks/useAuth";
import { Navigate } from "react-router-dom";

type RegisterValues = {
  fullName: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .required("Full name is required."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function RegisterPage() {
  return <RegisterForm />;
}

const RegisterForm = () => {
  const mutation = useRegister();
  const isLoading = mutation.isPending;

  const initialValues: RegisterValues = {
    fullName: "",
    email: "",
    password: "",
  };

  if (mutation.isSuccess) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className={styles.registerPageContainer}>
      <img src={logo} alt="logo" className={styles.logo} />

      <div>
        <div className={styles.header}>
          <Text variant="title">Sign Up</Text>
          <Text variant="hint">Create your account to continue.</Text>
        </div>

        <Formik<RegisterValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (values, helpers) => {
            try {
              await mutation.mutateAsync({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
              });

              toast.success("Account created successfully!");
            } catch (error: unknown) {
              const message =
                error instanceof Error ? error.message : String(error);
              toast.error(`Register failed: ${message}`);
            } finally {
              helpers.setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            const disabled = isLoading || isSubmitting;

            const fullNameHasError = Boolean(
              touched.fullName && errors.fullName
            );
            const emailHasError = Boolean(touched.email && errors.email);
            const passHasError = Boolean(touched.password && errors.password);

            return (
              <form
                onSubmit={handleSubmit}
                noValidate
                className={styles.registerFormContainer}
              >
                <div className={styles.field}>
                  <Input
                    label="Full Name"
                    name="fullName"
                    type="text"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={fullNameHasError ? styles.inputError : undefined}
                  />
                  {fullNameHasError && (
                    <div className={styles.errorText}>{errors.fullName}</div>
                  )}
                </div>

                <div className={styles.field}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={emailHasError ? styles.inputError : undefined}
                  />
                  {emailHasError && (
                    <div className={styles.errorText}>{errors.email}</div>
                  )}
                </div>

                <div className={styles.field}>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={passHasError ? styles.inputError : undefined}
                  />
                  {passHasError && (
                    <div className={styles.errorText}>{errors.password}</div>
                  )}
                </div>

                <Button
                  variant="primary"
                  loading={isLoading}
                  disabled={disabled}
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>
            );
          }}
        </Formik>

        <div className={styles.signInText}>
          <Text variant="hint" muted>
            Already have an account?{" "}
            <Text as="a" href="/login" variant="link">
              Sign in
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
};
