import { Link } from "react-router-dom";
export default function FormComponent({
  formData,
  handleOnSubmit,
  handleOnChange,
  currentPage,
  postResponse,
}) {
  return (
    <div>
      <h2>Groceries App</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        <button>Login</button>
      </form>
      <p>
        Not a member yet? Click <Link to="/create_user">here</Link> to join.
      </p>
      <p style={{ color: "red" }}>{postResponse}</p>
    </div>
  );
}
