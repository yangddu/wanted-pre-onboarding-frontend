import "./App.scss";

import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content-wrapper">
          <img
            src="https://i.ibb.co/MVCq7SK/logo.png"
            alt="logo"
            width="100px"
            height="100px"
          />
          <h1>TODO MATE</h1>
          <Link to="/signup">
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default App;
