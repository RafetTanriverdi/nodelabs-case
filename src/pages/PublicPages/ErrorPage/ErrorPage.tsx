import { Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error = useRouteError() as { message?: string };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Oops! An error occurred.</h1>
            <p>{error?.message || "An unknown error has occurred."}</p>
            <Link to="/">Return to Home</Link>
        </div>
    );
};

export default ErrorPage;
