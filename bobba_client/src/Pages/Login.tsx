
import TestData2 from "../components/GetPost";
import Header from "../components/Header";
import ReactDOM from "react-dom";
import InstaHeader from "../components/OldHeader2";

export const Login = () => {
  return (
    <main>
      <Header />
      <InstaHeader />
      <TestData2 />

      <form className="form-signin w-100 m-auto">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </main>
  );
};
