import { View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
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
      </Routes>
    </View>
  );
};

export default Main;
