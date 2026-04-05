const menu = [
  { name: "Home", icon: "house", activeIcon: "house-fill", to: "/app/", mobile: true, web: true },
  {
    name: "Pride",
    icon: "patch-plus",
    activeIcon: "patch-plus-fill",
    to: "/app/pride",
    mobile: true,
    web: true,
  },
  {
    name: "Profile",
    icon: "person",
    activeIcon: "person-fill",
    to: "/app/profile/self",
    mobile: false,
    web: true,
  },
  {
    name: "Notification",
    icon: "bell",
    activeIcon: "bell-fill",
    to: "/app/notification",
    mobile: true,
    web: false,
  },
  {
    name: "Feedback",
    icon: "envelope-open",
    activeIcon: "envelope-open-fill",
    to: "/app/feedback",
    mobile: true,
    web: true,
  },
  {
    name: "Family",
    icon: "house",
    activeIcon: "house-fill",
    to: "/app/family",
    mobile: true,
    web: true,
  },
  {
    name: "About",
    icon: "info-square",
    activeIcon: "info-square-fill",
    to: "/app/about",
    mobile: true,
    web: true,
  },
];

export { menu };
