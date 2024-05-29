import { View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SingleRepository from "./RespositoryItem/SingleRepository";
import AppBar from "./AppBar/AppBar";
import SignIn from "./SignIn";

const Main = () => {
  return (
    <View style={{ flexGrow: 1, flexShrink: 1, backgroundColor: "#e1e4e8" }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
      </Routes>
    </View>
  );
};

export default Main;
