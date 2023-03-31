import { Button } from "antd"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button onClick={() => navigate("/lobby")}>See lobby</Button>
        </div >
    )
}
export default Home