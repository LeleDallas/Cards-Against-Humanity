import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorRoute = () => {
    const navigate = useNavigate()
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Button onClick={() => navigate("/")}>Go to homepage</Button>
        </div>
    );
}

export default ErrorRoute