const mockUsers = [
  {
    username: "teslafan2024",
    name: "Elon Musk",
    password: "supersecretpassword",
  },
  {
    username: "spacexfan2024",
    name: "SpaceX Enthusiast",
    password: "anothersecretpassword",
  },
  {
    username: "solarcityfan2024",
    name: "SolarCity Supporter",
    password: "yetanothersecretpassword",
  },
];

const duplicateUsername = {
  username: "teslafan2024",
  name: "Someone else",
  password: "secretsofsecrettos",
};

const shortUsername = {
  username: "hi",
  name: "Someone else",
  password: "adsad23",
};

const shortPassword = {
  username: "Newuser",
  name: "Absolutely",
  password: "hi",
};

module.exports = {
  mockUsers,
  duplicateUsername,
  shortUsername,
  shortPassword
};
