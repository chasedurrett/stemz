import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import UploadSampleForm from "./components/UploadSampleForm/UploadSampleForm";
import SamplePackDashboard from "./components/SamplePackDashboard/SamplePackDashboard";
import SamplesDashboard from "./components/SamplesDashboard/SamplesDashboard";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/new-sample" component={UploadSampleForm} />
    <Route path="/sample-pack-dashboard" component={SamplePackDashboard} />
    <Route path="/samples-dashboard" component={SamplesDashboard} />
  </Switch>
);
