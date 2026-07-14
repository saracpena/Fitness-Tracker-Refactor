import { Link } from "react-router";

/** Error page displayed when no route matches the URL. */
export default function Error404() {
  return (
    <>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/activities">Return to activities</Link>
    </>
  );
}