const FormAuth = ({
  onChange,
  handleSubmit,
  formValues,
  textButton,
  autoComplete,
}) => {
  return (
    <form name="auth" action="/" className="auth__form" onSubmit={handleSubmit}>
      <input
        type="email"
        autoComplete="email"
        placeholder="Email"
        className="auth__input"
        name="email"
        id="email"
        minLength={4}
        maxLength={40}
        value={formValues.email}
        onChange={onChange}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="password"
        placeholder="Пароль"
        className="auth__input"
        name="password"
        id="password"
        minLength={2}
        maxLength={200}
        value={formValues.password}
        onChange={onChange}
        autoComplete={autoComplete}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <button type="submit" className="auth__button">
        {textButton}
      </button>
    </form>
  );
};

export default FormAuth;
