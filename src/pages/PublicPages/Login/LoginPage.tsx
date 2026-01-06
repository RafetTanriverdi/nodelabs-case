import Button from "@rt/components/ui/Button/Button";
import Input from "@rt/components/ui/Input/Input";
import { useLogin } from "@rt/hooks/useAuth";
import { Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import logo from "@rt/assets/images/logo.png";

import styles from "./LoginPage.module.scss";
import Text from "@rt/components/ui/Text/Text";
import { Link, Navigate } from "react-router-dom";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { toast } from "react-toastify";

type LoginValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function LoginPage() {
  return <LoginForm />;
}

const LoginForm = () => {
  const mutation = useLogin();
  const isLoading = mutation.isPending;
  const initialValues: LoginValues = { email: "", password: "" };

  if (mutation.isSuccess) {
    return <Navigate to={getRoutePath(ROUTES_ID.dashboard)} replace />;
  }

  return (
    <div className={styles.loginPageContainer}>
      <img src={logo} alt="logo" className={styles.logo} />

      <div>
        <div className={styles.header}>
          <Text variant="title">Sign In</Text>
          <Text variant="hint">Welcome back! Please enter your details.</Text>
        </div>

        <Formik<LoginValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (values, helpers) => {
            try {
              await mutation.mutateAsync({
                email: values.email,
                password: values.password,
              });
            } catch (error: unknown) {
              toast.error(
                "Login failed. Please check your credentials and try again."
              );

              void error;
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

            const emailHasError = Boolean(touched.email && errors.email);
            const passHasError = Boolean(touched.password && errors.password);

            return (
              <form
                onSubmit={handleSubmit}
                noValidate
                className={styles.loginFormContainer}
              >
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
                  Sign In
                </Button>

                <Button
                  icon={<FcGoogle />}
                  variant="secondary"
                  loading={isLoading}
                  disabled={disabled}
                  type="button"
                >
                  Sign In with Google
                </Button>
              </form>
            );
          }}
        </Formik>
        <div className={styles.signUpText}>
          <Text variant="hint" muted>
            Don’t have an account?{" "}
            <Text
              as={Link}
              to={getRoutePath(ROUTES_ID.register)}
              variant="link"
            >
              Sign up
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
};
