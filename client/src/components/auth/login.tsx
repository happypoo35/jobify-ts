import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LoginRequest, useLoginMutation } from "@/app/auth.api";

import { Button, Form, Input } from "../shared";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data).unwrap();
      navigate("/", { replace: true });
    } catch (err: any) {
      setError("email", {
        type: "manual",
        message: ` `,
      });
      setError("password", {
        type: "manual",
        message: err?.data?.msg || "Incorrect email or password",
      });
      setTimeout(() => {
        clearErrors();
      }, 5000);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h1 data-h3>Login</h1>
        <Input
          type="email"
          label="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          label="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div data-buttons>
          <Button type="submit" isLoading={isLoading || isSuccess}>
            Submit
          </Button>
          <p>
            Not a member yet?{" "}
            <Link to="/register" data-link>
              Register
            </Link>
          </p>
        </div>
      </section>
    </Form>
  );
};
export default Login;
