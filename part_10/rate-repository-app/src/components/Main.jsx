import { View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RespositoryList/RepositoryList";
import SingleRepository from "./RespositoryItem/SingleRepository";
import CreateReview from "./RespositoryItem/CreateReview";
import AppBar from "./AppBar/AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const Main = () => {
  return (
    <View style={{ flexGrow: 1, flexShrink: 1, backgroundColor: "#e1e4e8" }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
