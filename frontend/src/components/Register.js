import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FormAuth from "./FormAuth";

const Register = ({ onRegister }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  useEffect(() => {
    document.title = "Регистрация";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValues.email || !formValues.password) {
      return;
    }

    onRegister(formValues.email, formValues.password);
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
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <FormAuth
        onChange={onChange}
        handleSubmit={handleSubmit}
        formValues={formValues}
        textButton="Зарегистрироваться"
      />
      <p className="auth__signin">
        Уже зарегистрированы?
        <NavLink to="/signin" className="auth__link auth__link-in">
          &nbsp;Войти
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
