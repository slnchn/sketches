import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>

      <Link to="/white-noise">White Noise</Link>
    </div>
  );
};

export default Home;
