import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? (
    <h1>You are Signed In!</h1>
  ) : (
    <h1>You are NOT signed in!</h1>
  );
};

Landing.getInitialProps = async (context) => {
  const client = buildClient(context);
  try {
    const { data } = await client.get("/api/users/currentuser");
    return data;
  } catch (error) {
    return error;
  }
};

export default Landing;
