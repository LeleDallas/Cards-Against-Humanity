import { List } from "antd"

interface User {
    points: number,
    name: string,
    id?: string
}

interface GameScorerProps {
    players: Array<User>
}

const GameScorer = ({ players = [], ...props }: GameScorerProps) => {
    return (
        <>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={players}
                renderItem={(user) => (
                    <List.Item actions={[<a>{user.points}</a>]}>
                        <div>{user.name}</div>
                    </List.Item>
                )}
            />
        </>
    )
}
export default GameScorer