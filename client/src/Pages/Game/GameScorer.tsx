import { List } from "antd"
import { useContext } from "react";
import socketContext from "../../context/SocketContext";

interface User {
    score: number,
    name: string,
}


const GameScorer = ({ ...props }) => {
    const { score } = useContext(socketContext).socketState;

    console.log(score)

    let players: Array<User> = Array.from(score, ([name, score]) => ({ name, score }));

    return (
        <>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={players}
                renderItem={(user) => (
                    <List.Item actions={[<a>{user.score}</a>]}>
                        <div>{user.name}</div>
                    </List.Item>
                )}
            />
        </>
    )
}
export default GameScorer