import { List } from "antd"
import { useContext } from "react";
import socketContext from "../../context/SocketContext";

const GameScorer = ({ ...props }) => {
    const { score } = useContext(socketContext).socketState;
    let players: Array<User> = Array.from(score, ([name, score]) => ({ name, score }));

    return (
        <>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={players.sort((a, b) => b.score - a.score)}
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