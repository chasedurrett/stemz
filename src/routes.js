import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import UploadSampleForm from "./components/UploadSampleForm/UploadSampleForm";
import SamplePackDashboard from "./components/SamplePackDashboard/SamplePackDashboard";
import SamplesDashboard from "./components/SamplesDashboard/SamplesDashboard";
import Profile from "./components/Profile/Profile";
import SamplePackForm from "./components/SamplePackForm/StepTwo/SamplePackForm";
import SamplePackFormStepOne from "./components/SamplePackForm/StepOne/SamplePackFormStepOne";
import SamplePack from "./components/SamplePack/SamplePack";
import ForumDashboard from "./components/ForumDashboard/ForumDashboard";
import NewPost from "./components/NewPost/NewPost";
import Post from "./components/Post/Post";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/new-sample" component={UploadSampleForm} />
    <Route path="/new-sample-pack" component={SamplePackFormStepOne} />
    <Route path="/new-sample-pack-step-two" component={SamplePackForm}/>
    <Route path="/sample-pack-dashboard" component={SamplePackDashboard} />
    <Route path="/samples-dashboard" component={SamplesDashboard} />
    <Route path="/profile" component={Profile} />
    <Route path='/samplepack/:samplepackid' component={SamplePack} />
    <Route path='/forum-dashboard' component={ForumDashboard} />
    <Route path="/new-post" component={NewPost}/>
    <Route path="/post/:postid" component={Post}/>
  </Switch>
);
