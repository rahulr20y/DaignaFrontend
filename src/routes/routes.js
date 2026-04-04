import React from "react";
function getRoutes() {
  const Home = React.lazy(() => import("../pages/home/home"));
  const Logout = React.lazy(() => import("../common/logout"));
  const Notification = React.lazy(() =>
    import("../pages/notification/notification")
  );
  const Profile = React.lazy(() => import("../pages/profile/profile"));
  const Feedback = React.lazy(() => import("../pages/feedback/feedback"));
  const Pride = React.lazy(() => import("../pages/pride/pride"));
  const About = React.lazy(() => import("../pages/about/about"));
  const Post = React.lazy(() => import("../pages/post/post"));
  const Family = React.lazy(() => import("../pages/family/family"))

  let routes = [
    { path: "/app/logout", name: "Logout", component: Logout },
    {
      path: "/app/notification",
      name: "Notification",
      component: Notification,
    },
    {
      path: "/app/post/:postid",
      name: "Post",
      component: Post,
    },
    {
      path: "/app/profile/:username",
      name: "profile",
      component: Profile,
    },
    {
      path: "/app/feedback",
      name: "feedback",
      component: Feedback,
    },
    {
      path: "/app/pride",
      name: "pride",
      component: Pride,
    },
    {
      path: "/app/about",
      name: "about",
      component: About,
    },
    {
      path: "/app/family",
      name: "Family",
      component: Family,
    },
    { path: "/app/", name: "Home", component: Home },
  ];

  return routes;
}

const PageHead = {
  "/app/": { title: "Home" },
  "/app/logout": { title: "Logout" },
  "/app/notification": { title: "Notification" },
  "/app/profile": { title: "Profile" },
  "/app/feedback": { title: "Feedback" },
  "/app/pride": { title: "Pride" },
  "/app/about": { title: "About" },
  "/app/post": { title: "Post" },
};

export { getRoutes, PageHead };
