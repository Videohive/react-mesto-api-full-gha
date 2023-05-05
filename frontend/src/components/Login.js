import { useState, useEffect } from "react";
import FormAuth from "./FormAuth";

const Login = ({ onLogin }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  useEffect(() => {
    document.title = "Вход";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValues.email || !formValues.password) {
      return;
    }
    onLogin(formValues.email, formValues.password);
    setFormValues({ email: "", password: "" });
  }

  function onChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  return (
    <>
      <div className="auth">
        <h1 className="auth__title">Вход</h1>
        <FormAuth
          onChange={onChange}
          handleSubmit={handleSubmit}
          formValues={formValues}
          autoComplete="current-password"
          textButton="Войти"
        />
      </div>
    </>
  );
};

export default Login;
