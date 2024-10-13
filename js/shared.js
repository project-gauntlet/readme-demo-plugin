import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { Detail, Grid, List, ActionPanel } from '@project-gauntlet/api/components';
import { d as dist } from './vendor.js';
import { useNavigation } from '@project-gauntlet/api/hooks';

function GameOfLifeView() {
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
    ];
    const initialProps = { width: 75, height: 18, initialCell };
    const game = new dist.GameOfLife(initialProps);
    const [gameContainer, setGameContainer] = useState({ game });
    const [running, setRunning] = useState(true);
    const [speedMs, setSpeedMs] = useState(200);
    useInterval(() => {
        if (running) {
            setGameContainer(prevState => {
                prevState.game.next();
                return { game: prevState.game };
            });
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
                    throw new Error("unexpected value: " + cell);
                }
            }
        })
            .join("");
    })
        .join('\n');
    Array(gameContainer.game.cells.length)
        .fill("\u{25A0}")
        .join('\n');
    return (jsxs(Detail, { children: [jsx(Detail.Content, { children: jsx(Detail.Content.CodeBlock, { children: grid }) }), jsxs(Detail.Metadata, { children: [jsx(Detail.Metadata.Value, { label: "State", children: running ? "Running" : "Paused" }), jsx(Detail.Metadata.TagList, { label: "Play", children: jsx(Detail.Metadata.TagList.Item, { onClick: () => {
                                setRunning(prevState => !prevState);
                            }, children: running ? "Pause" : "Resume" }) }), jsxs(Detail.Metadata.TagList, { label: "Speed", children: [jsx(Detail.Metadata.TagList.Item, { onClick: () => {
                                    setSpeedMs(prevState => {
                                        let number = prevState - 100;
                                        if (number <= 0) {
                                            return 100;
                                        }
                                        else {
                                            return number;
                                        }
                                    });
                                }, children: "Faster" }), jsx(Detail.Metadata.TagList.Item, { onClick: () => {
                                    setSpeedMs(prevState => prevState + 100);
                                }, children: "Slower" })] }), jsxs(Detail.Metadata.TagList, { label: "Actions", children: [jsx(Detail.Metadata.TagList.Item, { onClick: () => {
                                    const game = new dist.GameOfLife(initialProps);
                                    setGameContainer({ game });
                                }, children: "Reset" }), jsx(Detail.Metadata.TagList.Item, { onClick: () => {
                                    const amount = getRandomInt(400);
                                    const initialCell = Array(amount)
                                        .fill(0)
                                        .map(_ => ({
                                        width: getRandomInt(70),
                                        height: getRandomInt(18),
                                    }));
                                    const game = new dist.GameOfLife({ ...initialProps, initialCell });
                                    setGameContainer({ game });
                                }, children: "Randomize" })] })] })] }));
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

function StarWarsLocations() {
    return (jsxs(Grid, { children: [jsx(Grid.Item, { title: "Naboo", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "naboo.jpg" } }) }) }), jsx(Grid.Item, { title: "Ryloth", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "dagobah.jpg" } }) }) }), jsx(Grid.Item, { title: "Tatooine", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "ryloth.jpg" } }) }) }), jsx(Grid.Item, { title: "Dagobah", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "tatooine.jpg" } }) }) }), jsx(Grid.Item, { title: "Coruscant", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "deathstar.jpg" } }) }) }), jsx(Grid.Item, { title: "Endor", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "endor.jpg" } }) }) }), jsx(Grid.Item, { title: "Death Star", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "coruscant.jpg" } }) }) }), jsx(Grid.Item, { title: "Dathomir", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "dathomir.jpg" } }) }) }), jsx(Grid.Item, { title: "Dantooine", children: jsx(Grid.Item.Content, { children: jsx(Grid.Item.Content.Image, { source: { asset: "dantooine.jpg" } }) }) })] }));
}

function StarWarsSpecies() {
    let { pushView } = useNavigation();
    return (jsxs(List, { children: [jsx(List.Item, { title: "Adarian" }), jsx(List.Item, { title: "Aruzan" }), jsx(List.Item, { title: "Blutopian" }), jsx(List.Item, { title: "Caphex" }), jsx(List.Item, { title: "Condluran" }), jsx(List.Item, { title: "Frozian" }), jsx(List.Item, { title: "Evereni" }), jsx(List.Item, { title: "Ezaraa", onClick: () => pushView(jsx(Ezaraa, {})) }), jsx(List.Item, { title: "Houk" }), jsx(List.Item, { title: "Inleshat" })] }));
}
function Ezaraa() {
    return (jsxs(Detail, { actions: jsx(ActionPanel, {}), children: [jsxs(Detail.Metadata, { children: [jsx(Detail.Metadata.Value, { label: "Designation", children: "Sentient" }), jsx(Detail.Metadata.Value, { label: "Classification", children: "Humanoid" }), jsx(Detail.Metadata.Value, { label: "Homeworld", children: "Ezaraa" }), jsx(Detail.Metadata.Value, { label: "Diet", children: "Carnivorous" }), jsxs(Detail.Metadata.TagList, { label: "Appearances", children: [jsx(Detail.Metadata.TagList.Item, { children: "The Screaming Citadel 1" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 9" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 10" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 11" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 12" })] })] }), jsxs(Detail.Content, { children: [jsx(Detail.Content.Paragraph, { children: "The Ezaraa were a species of warmongering carnivorous sentients that were native to the the planet Ezaraa. They intended to overthrow the Galactic Empire, only to replace it with their own dominion and feed on the other species, which they deemed as lesser to them. To arm their revolution, the dominion sent Ezaraa to take advantage of opportunities such as the Auction of Rur." }), jsx(Detail.Content.H4, { children: "Society and culture" }), jsx(Detail.Content.CodeBlock, { children: "\"Bring the Dominion of the Ezaraa across the stars! And consume the flesh of all the lesser species!\"" }), jsx(Detail.Content.Paragraph, { children: "\u2015An Ezaraa, to Luke Skywalker" })] })] }));
}

export { GameOfLifeView as G, StarWarsLocations as S, StarWarsSpecies as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlcyI6W10sInNvdXJjZXNDb250ZW50IjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
