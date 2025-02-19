const nav = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Admin",
    is_strict: true,
    child: [
      {
        name: "role",
        path: "/super/userrole",
      },
      {
        name: "User",
        path: "/super/user",
      },
      {
        name: "Event",
        path: "/super/event",
      },
    ],
  },
];

const extra = [
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Terms & Condition",
    path: "/tnc",
  },
  {
    name: "Privacy & Policy",
    path: "/privacypolicy",
  },
];

export { nav, extra };
