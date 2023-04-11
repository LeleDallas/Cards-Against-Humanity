import { List } from "antd"

let rawData = [
    {
        name: "adsa",
        points: 4
    },
    {
        name: "adsa",
        points: 2
    },
    {
        name: "adsa",
        points: 1
    },
    {
        name: "adsa",
        points: 9
    },
    {
        name: "adsa",
        points: 9
    },
    {
        name: "adsa",
        points: 9
    },
]

const GameScorer = ({ ...props }) => {
    return (
        <>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={rawData}
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