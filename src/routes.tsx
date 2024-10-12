import Home from "./Home";
import WhiteNoise from "./pages/white-noise/WhiteNoise";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/white-noise",
    element: <WhiteNoise />,
  },
];
