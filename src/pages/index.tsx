import React from "react";

const HomePage: React.FC = () => {
  React.useEffect(() => {
    window.location.href = "/friends";
  }, []);

  return null;
};

export default HomePage;
