import { ReactElement, useEffect, useRef, useState } from 'react';
import { Detail } from "@project-gauntlet/api/components";
import { GameOfLife } from "gameoflife.js"

export default function GameOfLifeView(): ReactElement {
    const initialCell = [
        {
            width: 24,
            height: 4,
        },
        {
            width: 25,
            height: 5,
        },
        {
            width: 23,
            height: 6,
        },
        {
            width: 24,
            height: 6,
        },
        {
            width: 25,
            height: 6,
        },
    ]
    const initialProps = { width: 75, height: 18, initialCell };
    const game = new GameOfLife(initialProps)

    const [gameContainer, setGameContainer] = useState({ game });
    const [running, setRunning] = useState(true);
    const [speedMs, setSpeedMs] = useState(200);

    useInterval(() => {
        if (running) {
            setGameContainer(prevState => {
                prevState.game.next()
                return { game: prevState.game }
            })
        }
    }, speedMs);

    let grid = gameContainer.game.cells
        .map(row => {
            return row
                .map(cell => {
                    switch (cell) {
                        case 0: {
                            return " ";
                        }
                        case 1: {
                            return "\u{25A0}";
                        }
                        default: {
                            throw new Error("unexpected value: " + cell)
                        }
                    }
                })
                .join("")
        })
        .join('\n');

    const test = Array(gameContainer.game.cells.length)
        .fill("\u{25A0}")
        .join('\n')

    return (
        <Detail>
            <Detail.Content>
                <Detail.Content.CodeBlock>
                    {/*{test}*/}
                    {grid}
                </Detail.Content.CodeBlock>
            </Detail.Content>
            <Detail.Metadata>
                <Detail.Metadata.Value label="State">
                    {running ? "Running" : "Paused"}
                </Detail.Metadata.Value>
                <Detail.Metadata.TagList label="Play">
                    <Detail.Metadata.TagList.Item onClick={() => {
                        setRunning(prevState => !prevState)
                    }}>
                        {running ? "Pause" : "Resume"}
                    </Detail.Metadata.TagList.Item>
                </Detail.Metadata.TagList>
                <Detail.Metadata.TagList label="Speed">
                    <Detail.Metadata.TagList.Item onClick={() => {
                        setSpeedMs(prevState => {
                            let number = prevState - 100;
                            if (number <= 0) {
                                return 100
                            } else {
                                return number
                            }
                        })
                    }}>
                        Faster
                    </Detail.Metadata.TagList.Item>
                    <Detail.Metadata.TagList.Item onClick={() => {
                        setSpeedMs(prevState => prevState + 100)
                    }}>
                        Slower
                    </Detail.Metadata.TagList.Item>
                </Detail.Metadata.TagList>
                <Detail.Metadata.TagList label="Actions">
                    <Detail.Metadata.TagList.Item onClick={() => {
                        const game = new GameOfLife(initialProps)
                        setGameContainer({ game })
                    }}>
                        Reset
                    </Detail.Metadata.TagList.Item>
                    <Detail.Metadata.TagList.Item onClick={() => {

                        const amount = getRandomInt(400);

                        const initialCell = Array(amount)
                            .fill(0)
                            .map(_ => ({
                                width: getRandomInt(70),
                                height: getRandomInt(18),
                            }))

                        const game = new GameOfLife({ ...initialProps, initialCell })

                        setGameContainer({ game })
                    }}>
                        Randomize
                    </Detail.Metadata.TagList.Item>
                </Detail.Metadata.TagList>
            </Detail.Metadata>
        </Detail>
    );
};

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(
            () => {
                savedCallback.current!!()
            },
            delay!!
        );
        return () => clearInterval(id);
    }, [delay]);
}