// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import { Navbar } from "./Components/Navbar";

// import { PostsList } from "./store/slices/posts/PostsList";
// import { AddPostForm } from "./store/slices/posts/AddPostForm";
// import { EditPostForm } from "./store/slices/posts/EditPostForm";
// import { SinglePostPage } from "./store/slices/posts/SinglePostPage";
import theme from "@data/themes/theme";
import {  MantineProvider } from "@mantine/core";
import ModeToggle from "@components/ui/ModeToggle";



function App() {
	return (
		<MantineProvider theme={theme}>
			{/*  <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<React.Fragment><AddPostForm /><PostsList /></React.Fragment>} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router> */}
			<div>bla</div>
      <ModeToggle/>
		</MantineProvider>
	);
}

export default App;
