import React from "react";
import { Switch } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import settings from "./settings";
import "./App.css";
import { Header, Footer } from "../components/organisms";
import Content from "../components/organisms/Content";
import Dashboard from "../scenes/Dashboard";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Content>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </Content>
      <Footer />
    </>
  );
};

export default App;
