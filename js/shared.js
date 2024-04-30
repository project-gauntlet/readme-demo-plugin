import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { Detail, Grid, List, ActionPanel } from '@project-gauntlet/api/components';
import { d as dist } from './vendor.js';
import { assetData } from '@project-gauntlet/api/helpers';
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
    const nabooImage = assetData("naboo.jpg");
    const dagobahImage = assetData("dagobah.jpg");
    const rylothImage = assetData("ryloth.jpg");
    const tatooineImage = assetData("tatooine.jpg");
    const deathstarImage = assetData("deathstar.jpg");
    const endorImage = assetData("endor.jpg");
    const coruscantImage = assetData("coruscant.jpg");
    const dathomirImage = assetData("dathomir.jpg");
    const dantooineImage = assetData("dantooine.jpg");
    return (jsxs(Grid, { children: [jsx(Grid.Item, { id: "naboo", title: "Naboo", children: jsx(Grid.Item.Content.Image, { source: { data: nabooImage } }) }), jsx(Grid.Item, { id: "ryloth", title: "Ryloth", children: jsx(Grid.Item.Content.Image, { source: { data: rylothImage } }) }), jsx(Grid.Item, { id: "tatooine", title: "Tatooine", children: jsx(Grid.Item.Content.Image, { source: { data: tatooineImage } }) }), jsx(Grid.Item, { id: "dagobah", title: "Dagobah", children: jsx(Grid.Item.Content.Image, { source: { data: dagobahImage } }) }), jsx(Grid.Item, { id: "coruscant", title: "Coruscant", children: jsx(Grid.Item.Content.Image, { source: { data: coruscantImage } }) }), jsx(Grid.Item, { id: "endor", title: "Endor", children: jsx(Grid.Item.Content.Image, { source: { data: endorImage } }) }), jsx(Grid.Item, { id: "deathstar", title: "Death Star", children: jsx(Grid.Item.Content.Image, { source: { data: deathstarImage } }) }), jsx(Grid.Item, { id: "dathomir", title: "Dathomir", children: jsx(Grid.Item.Content.Image, { source: { data: dathomirImage } }) }), jsx(Grid.Item, { id: "dantooine", title: "Dantooine", children: jsx(Grid.Item.Content.Image, { source: { data: dantooineImage } }) })] }));
}

function StarWarsSpecies() {
    let { pushView } = useNavigation();
    return (jsxs(List, { onSelectionChange: id => {
            if (id === "ezaraa") {
                pushView(jsx(Ezaraa, {}));
            }
        }, children: [jsx(List.Item, { id: "adarian", title: "Adarian" }), jsx(List.Item, { id: "aruzan", title: "Aruzan" }), jsx(List.Item, { id: "blutopian", title: "Blutopian" }), jsx(List.Item, { id: "caphex", title: "Caphex" }), jsx(List.Item, { id: "condluran", title: "Condluran" }), jsx(List.Item, { id: "frozian", title: "Frozian" }), jsx(List.Item, { id: "evereni", title: "Evereni" }), jsx(List.Item, { id: "ezaraa", title: "Ezaraa" }), jsx(List.Item, { id: "houk", title: "Houk" }), jsx(List.Item, { id: "inleshat", title: "Inleshat" })] }));
}
function Ezaraa() {
    return (jsxs(Detail, { actions: jsx(ActionPanel, {}), children: [jsxs(Detail.Metadata, { children: [jsx(Detail.Metadata.Value, { label: "Designation", children: "Sentient" }), jsx(Detail.Metadata.Value, { label: "Classification", children: "Humanoid" }), jsx(Detail.Metadata.Value, { label: "Homeworld", children: "Ezaraa" }), jsx(Detail.Metadata.Value, { label: "Diet", children: "Carnivorous" }), jsxs(Detail.Metadata.TagList, { label: "Appearances", children: [jsx(Detail.Metadata.TagList.Item, { children: "The Screaming Citadel 1" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 9" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 10" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 11" }), jsx(Detail.Metadata.TagList.Item, { children: "Doctor Aphra (2016) 12" })] })] }), jsxs(Detail.Content, { children: [jsx(Detail.Content.Paragraph, { children: "The Ezaraa were a species of warmongering carnivorous sentients that were native to the the planet Ezaraa. They intended to overthrow the Galactic Empire, only to replace it with their own dominion and feed on the other species, which they deemed as lesser to them. To arm their revolution, the dominion sent Ezaraa to take advantage of opportunities such as the Auction of Rur." }), jsx(Detail.Content.H4, { children: "Society and culture" }), jsx(Detail.Content.CodeBlock, { children: "\"Bring the Dominion of the Ezaraa across the stars! And consume the flesh of all the lesser species!\"" }), jsx(Detail.Content.Paragraph, { children: "\u2015An Ezaraa, to Luke Skywalker" })] })] }));
}

export { GameOfLifeView as G, StarWarsLocations as S, StarWarsSpecies as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2FtZS1vZi1saWZlLnRzeCIsIi4uLy4uL3NyYy9zdGFyd2Fycy1sb2NhdGlvbnMudHN4IiwiLi4vLi4vc3JjL3N0YXJ3YXJzLXNwZWNpZXMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3RFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7RGV0YWlsfSBmcm9tIFwiQHByb2plY3QtZ2F1bnRsZXQvYXBpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7R2FtZU9mTGlmZX0gZnJvbSBcImdhbWVvZmxpZmUuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lT2ZMaWZlVmlldygpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGluaXRpYWxDZWxsID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDogMjQsXG4gICAgICAgICAgICBoZWlnaHQ6IDQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiAyNSxcbiAgICAgICAgICAgIGhlaWdodDogNSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgd2lkdGg6IDIzLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDogMjQsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiAyNSxcbiAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgfSxcbiAgICBdXG4gICAgY29uc3QgaW5pdGlhbFByb3BzID0geyB3aWR0aDogNzUsIGhlaWdodDogMTgsIGluaXRpYWxDZWxsIH07XG4gICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lT2ZMaWZlKGluaXRpYWxQcm9wcylcblxuICAgIGNvbnN0IFtnYW1lQ29udGFpbmVyLCBzZXRHYW1lQ29udGFpbmVyXSA9IHVzZVN0YXRlKHsgZ2FtZSB9KTtcbiAgICBjb25zdCBbcnVubmluZywgc2V0UnVubmluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc3BlZWRNcywgc2V0U3BlZWRNc10gPSB1c2VTdGF0ZSgyMDApO1xuXG4gICAgdXNlSW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgc2V0R2FtZUNvbnRhaW5lcihwcmV2U3RhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHByZXZTdGF0ZS5nYW1lLm5leHQoKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGdhbWU6IHByZXZTdGF0ZS5nYW1lIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LCBzcGVlZE1zKTtcblxuICAgIGxldCBncmlkID0gZ2FtZUNvbnRhaW5lci5nYW1lLmNlbGxzXG4gICAgICAgIC5tYXAocm93ID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3dcbiAgICAgICAgICAgICAgICAubWFwKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcdXsyNUEwfVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuZXhwZWN0ZWQgdmFsdWU6IFwiICsgY2VsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpO1xuXG4gICAgY29uc3QgdGVzdCA9IEFycmF5KGdhbWVDb250YWluZXIuZ2FtZS5jZWxscy5sZW5ndGgpXG4gICAgICAgIC5maWxsKFwiXFx1ezI1QTB9XCIpXG4gICAgICAgIC5qb2luKCdcXG4nKVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPERldGFpbD5cbiAgICAgICAgICAgIDxEZXRhaWwuQ29udGVudD5cbiAgICAgICAgICAgICAgICA8RGV0YWlsLkNvbnRlbnQuQ29kZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICB7Lyp7dGVzdH0qL31cbiAgICAgICAgICAgICAgICAgICAge2dyaWR9XG4gICAgICAgICAgICAgICAgPC9EZXRhaWwuQ29udGVudC5Db2RlQmxvY2s+XG4gICAgICAgICAgICA8L0RldGFpbC5Db250ZW50PlxuICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YT5cbiAgICAgICAgICAgICAgICA8RGV0YWlsLk1ldGFkYXRhLlZhbHVlIGxhYmVsPVwiU3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge3J1bm5pbmcgPyBcIlJ1bm5pbmdcIiA6IFwiUGF1c2VkXCJ9XG4gICAgICAgICAgICAgICAgPC9EZXRhaWwuTWV0YWRhdGEuVmFsdWU+XG4gICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0IGxhYmVsPVwiUGxheVwiPlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSdW5uaW5nKHByZXZTdGF0ZSA9PiAhcHJldlN0YXRlKVxuICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtydW5uaW5nID8gXCJQYXVzZVwiIDogXCJSZXN1bWVcIn1cbiAgICAgICAgICAgICAgICAgICAgPC9EZXRhaWwuTWV0YWRhdGEuVGFnTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgIDwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3Q+XG4gICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0IGxhYmVsPVwiU3BlZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3BlZWRNcyhwcmV2U3RhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBwcmV2U3RhdGUgLSAxMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bWJlciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBGYXN0ZXJcbiAgICAgICAgICAgICAgICAgICAgPC9EZXRhaWwuTWV0YWRhdGEuVGFnTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTcGVlZE1zKHByZXZTdGF0ZSA9PiBwcmV2U3RhdGUgKyAxMDApXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgU2xvd2VyXG4gICAgICAgICAgICAgICAgICAgIDwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICA8L0RldGFpbC5NZXRhZGF0YS5UYWdMaXN0PlxuICAgICAgICAgICAgICAgIDxEZXRhaWwuTWV0YWRhdGEuVGFnTGlzdCBsYWJlbD1cIkFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lT2ZMaWZlKGluaXRpYWxQcm9wcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEdhbWVDb250YWluZXIoeyBnYW1lIH0pXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgICAgICAgPC9EZXRhaWwuTWV0YWRhdGEuVGFnTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbSBvbkNsaWNrPXsoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudCA9IGdldFJhbmRvbUludCg0MDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsQ2VsbCA9IEFycmF5KGFtb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsbCgwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoXyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogZ2V0UmFuZG9tSW50KDcwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBnZXRSYW5kb21JbnQoMTgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWVPZkxpZmUoeyAuLi5pbml0aWFsUHJvcHMsIGluaXRpYWxDZWxsIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEdhbWVDb250YWluZXIoeyBnYW1lIH0pXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9taXplXG4gICAgICAgICAgICAgICAgICAgIDwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICA8L0RldGFpbC5NZXRhZGF0YS5UYWdMaXN0PlxuICAgICAgICAgICAgPC9EZXRhaWwuTWV0YWRhdGE+XG4gICAgICAgIDwvRGV0YWlsPlxuICAgICk7XG59O1xuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcbn1cblxuZnVuY3Rpb24gdXNlSW50ZXJ2YWwoY2FsbGJhY2s6ICgpID0+IHZvaWQsIGRlbGF5OiBudW1iZXIpIHtcbiAgICBjb25zdCBzYXZlZENhbGxiYWNrID0gdXNlUmVmPCgpID0+IHZvaWQ+KCk7XG5cbiAgICAvLyBSZW1lbWJlciB0aGUgbGF0ZXN0IGNhbGxiYWNrLlxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNhdmVkQ2FsbGJhY2suY3VycmVudCA9IGNhbGxiYWNrO1xuICAgIH0sIFtjYWxsYmFja10pO1xuXG4gICAgLy8gU2V0IHVwIHRoZSBpbnRlcnZhbC5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBsZXQgaWQgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBzYXZlZENhbGxiYWNrLmN1cnJlbnQhISgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsYXkhIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfSwgW2RlbGF5XSk7XG59IiwiaW1wb3J0IHtSZWFjdEVsZW1lbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtHcmlkfSBmcm9tIFwiQHByb2plY3QtZ2F1bnRsZXQvYXBpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7YXNzZXREYXRhfSBmcm9tIFwiQHByb2plY3QtZ2F1bnRsZXQvYXBpL2hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhcldhcnNMb2NhdGlvbnMoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBuYWJvb0ltYWdlID0gYXNzZXREYXRhKFwibmFib28uanBnXCIpO1xuICAgIGNvbnN0IGRhZ29iYWhJbWFnZSA9IGFzc2V0RGF0YShcImRhZ29iYWguanBnXCIpO1xuICAgIGNvbnN0IHJ5bG90aEltYWdlID0gYXNzZXREYXRhKFwicnlsb3RoLmpwZ1wiKTtcbiAgICBjb25zdCB0YXRvb2luZUltYWdlID0gYXNzZXREYXRhKFwidGF0b29pbmUuanBnXCIpO1xuICAgIGNvbnN0IGRlYXRoc3RhckltYWdlID0gYXNzZXREYXRhKFwiZGVhdGhzdGFyLmpwZ1wiKTtcbiAgICBjb25zdCBlbmRvckltYWdlID0gYXNzZXREYXRhKFwiZW5kb3IuanBnXCIpO1xuICAgIGNvbnN0IGNvcnVzY2FudEltYWdlID0gYXNzZXREYXRhKFwiY29ydXNjYW50LmpwZ1wiKTtcbiAgICBjb25zdCBkYXRob21pckltYWdlID0gYXNzZXREYXRhKFwiZGF0aG9taXIuanBnXCIpO1xuICAgIGNvbnN0IGRhbnRvb2luZUltYWdlID0gYXNzZXREYXRhKFwiZGFudG9vaW5lLmpwZ1wiKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgPEdyaWQuSXRlbSBpZD1cIm5hYm9vXCIgdGl0bGU9XCJOYWJvb1wiPlxuICAgICAgICAgICAgICAgIDxHcmlkLkl0ZW0uQ29udGVudC5JbWFnZSBzb3VyY2U9e3tkYXRhOiBuYWJvb0ltYWdlfX0vPlxuICAgICAgICAgICAgPC9HcmlkLkl0ZW0+XG4gICAgICAgICAgICA8R3JpZC5JdGVtIGlkPVwicnlsb3RoXCIgdGl0bGU9XCJSeWxvdGhcIj5cbiAgICAgICAgICAgICAgICA8R3JpZC5JdGVtLkNvbnRlbnQuSW1hZ2Ugc291cmNlPXt7ZGF0YTogcnlsb3RoSW1hZ2V9fS8+XG4gICAgICAgICAgICA8L0dyaWQuSXRlbT5cbiAgICAgICAgICAgIDxHcmlkLkl0ZW0gaWQ9XCJ0YXRvb2luZVwiIHRpdGxlPVwiVGF0b29pbmVcIj5cbiAgICAgICAgICAgICAgICA8R3JpZC5JdGVtLkNvbnRlbnQuSW1hZ2Ugc291cmNlPXt7ZGF0YTogdGF0b29pbmVJbWFnZX19Lz5cbiAgICAgICAgICAgIDwvR3JpZC5JdGVtPlxuICAgICAgICAgICAgPEdyaWQuSXRlbSBpZD1cImRhZ29iYWhcIiB0aXRsZT1cIkRhZ29iYWhcIj5cbiAgICAgICAgICAgICAgICA8R3JpZC5JdGVtLkNvbnRlbnQuSW1hZ2Ugc291cmNlPXt7ZGF0YTogZGFnb2JhaEltYWdlfX0vPlxuICAgICAgICAgICAgPC9HcmlkLkl0ZW0+XG4gICAgICAgICAgICA8R3JpZC5JdGVtIGlkPVwiY29ydXNjYW50XCIgdGl0bGU9XCJDb3J1c2NhbnRcIj5cbiAgICAgICAgICAgICAgICA8R3JpZC5JdGVtLkNvbnRlbnQuSW1hZ2Ugc291cmNlPXt7ZGF0YTogY29ydXNjYW50SW1hZ2V9fS8+XG4gICAgICAgICAgICA8L0dyaWQuSXRlbT5cbiAgICAgICAgICAgIDxHcmlkLkl0ZW0gaWQ9XCJlbmRvclwiIHRpdGxlPVwiRW5kb3JcIj5cbiAgICAgICAgICAgICAgICA8R3JpZC5JdGVtLkNvbnRlbnQuSW1hZ2Ugc291cmNlPXt7ZGF0YTogZW5kb3JJbWFnZX19Lz5cbiAgICAgICAgICAgIDwvR3JpZC5JdGVtPlxuICAgICAgICAgICAgPEdyaWQuSXRlbSBpZD1cImRlYXRoc3RhclwiIHRpdGxlPVwiRGVhdGggU3RhclwiPlxuICAgICAgICAgICAgICAgIDxHcmlkLkl0ZW0uQ29udGVudC5JbWFnZSBzb3VyY2U9e3tkYXRhOiBkZWF0aHN0YXJJbWFnZX19Lz5cbiAgICAgICAgICAgIDwvR3JpZC5JdGVtPlxuICAgICAgICAgICAgPEdyaWQuSXRlbSBpZD1cImRhdGhvbWlyXCIgdGl0bGU9XCJEYXRob21pclwiPlxuICAgICAgICAgICAgICAgIDxHcmlkLkl0ZW0uQ29udGVudC5JbWFnZSBzb3VyY2U9e3tkYXRhOiBkYXRob21pckltYWdlfX0vPlxuICAgICAgICAgICAgPC9HcmlkLkl0ZW0+XG4gICAgICAgICAgICA8R3JpZC5JdGVtIGlkPVwiZGFudG9vaW5lXCIgdGl0bGU9XCJEYW50b29pbmVcIj5cbiAgICAgICAgICAgICAgICA8R3JpZC5JdGVtLkNvbnRlbnQuSW1hZ2Ugc291cmNlPXt7ZGF0YTogZGFudG9vaW5lSW1hZ2V9fS8+XG4gICAgICAgICAgICA8L0dyaWQuSXRlbT5cbiAgICAgICAgPC9HcmlkPlxuICAgIClcbn1cbiIsImltcG9ydCB7UmVhY3RFbGVtZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7TGlzdCwgRGV0YWlsLCBBY3Rpb24sIEFjdGlvblBhbmVsfSBmcm9tIFwiQHByb2plY3QtZ2F1bnRsZXQvYXBpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7dXNlTmF2aWdhdGlvbn0gZnJvbSBcIkBwcm9qZWN0LWdhdW50bGV0L2FwaS9ob29rc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGFyV2Fyc1NwZWNpZXMoKTogUmVhY3RFbGVtZW50IHtcbiAgICBsZXQge3B1c2hWaWV3fSA9IHVzZU5hdmlnYXRpb24oKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxMaXN0IG9uU2VsZWN0aW9uQ2hhbmdlPXtpZCA9PiB7XG4gICAgICAgICAgICBpZiAoaWQgPT09IFwiZXphcmFhXCIpIHtcbiAgICAgICAgICAgICAgICBwdXNoVmlldyg8RXphcmFhLz4pXG4gICAgICAgICAgICB9XG4gICAgICAgIH19PlxuICAgICAgICAgICAgPExpc3QuSXRlbSBpZD1cImFkYXJpYW5cIiB0aXRsZT1cIkFkYXJpYW5cIi8+XG4gICAgICAgICAgICA8TGlzdC5JdGVtIGlkPVwiYXJ1emFuXCIgdGl0bGU9XCJBcnV6YW5cIi8+XG4gICAgICAgICAgICA8TGlzdC5JdGVtIGlkPVwiYmx1dG9waWFuXCIgdGl0bGU9XCJCbHV0b3BpYW5cIi8+XG4gICAgICAgICAgICA8TGlzdC5JdGVtIGlkPVwiY2FwaGV4XCIgdGl0bGU9XCJDYXBoZXhcIi8+XG4gICAgICAgICAgICA8TGlzdC5JdGVtIGlkPVwiY29uZGx1cmFuXCIgdGl0bGU9XCJDb25kbHVyYW5cIi8+XG4gICAgICAgICAgICA8TGlzdC5JdGVtIGlkPVwiZnJvemlhblwiIHRpdGxlPVwiRnJvemlhblwiLz5cbiAgICAgICAgICAgIDxMaXN0Lkl0ZW0gaWQ9XCJldmVyZW5pXCIgdGl0bGU9XCJFdmVyZW5pXCIvPlxuICAgICAgICAgICAgPExpc3QuSXRlbSBpZD1cImV6YXJhYVwiIHRpdGxlPVwiRXphcmFhXCIvPlxuICAgICAgICAgICAgPExpc3QuSXRlbSBpZD1cImhvdWtcIiB0aXRsZT1cIkhvdWtcIi8+XG4gICAgICAgICAgICA8TGlzdC5JdGVtIGlkPVwiaW5sZXNoYXRcIiB0aXRsZT1cIklubGVzaGF0XCIvPlxuICAgICAgICA8L0xpc3Q+XG4gICAgKVxufVxuXG5cbmZ1bmN0aW9uIEV6YXJhYSgpOiBSZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxEZXRhaWwgYWN0aW9ucz17PEFjdGlvblBhbmVsLz59PlxuICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YT5cbiAgICAgICAgICAgICAgICA8RGV0YWlsLk1ldGFkYXRhLlZhbHVlIGxhYmVsPXtcIkRlc2lnbmF0aW9uXCJ9PlNlbnRpZW50PC9EZXRhaWwuTWV0YWRhdGEuVmFsdWU+XG4gICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5WYWx1ZSBsYWJlbD17XCJDbGFzc2lmaWNhdGlvblwifT5IdW1hbm9pZDwvRGV0YWlsLk1ldGFkYXRhLlZhbHVlPlxuICAgICAgICAgICAgICAgIDxEZXRhaWwuTWV0YWRhdGEuVmFsdWUgbGFiZWw9e1wiSG9tZXdvcmxkXCJ9PkV6YXJhYTwvRGV0YWlsLk1ldGFkYXRhLlZhbHVlPlxuICAgICAgICAgICAgICAgIDxEZXRhaWwuTWV0YWRhdGEuVmFsdWUgbGFiZWw9e1wiRGlldFwifT5DYXJuaXZvcm91czwvRGV0YWlsLk1ldGFkYXRhLlZhbHVlPlxuICAgICAgICAgICAgICAgIDxEZXRhaWwuTWV0YWRhdGEuVGFnTGlzdCBsYWJlbD17XCJBcHBlYXJhbmNlc1wifT5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0+VGhlIFNjcmVhbWluZyBDaXRhZGVsIDE8L0RldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxEZXRhaWwuTWV0YWRhdGEuVGFnTGlzdC5JdGVtPkRvY3RvciBBcGhyYSAoMjAxNikgOTwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0+RG9jdG9yIEFwaHJhICgyMDE2KSAxMDwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0+RG9jdG9yIEFwaHJhICgyMDE2KSAxMTwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbC5NZXRhZGF0YS5UYWdMaXN0Lkl0ZW0+RG9jdG9yIEFwaHJhICgyMDE2KSAxMjwvRGV0YWlsLk1ldGFkYXRhLlRhZ0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICA8L0RldGFpbC5NZXRhZGF0YS5UYWdMaXN0PlxuICAgICAgICAgICAgPC9EZXRhaWwuTWV0YWRhdGE+XG4gICAgICAgICAgICA8RGV0YWlsLkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPERldGFpbC5Db250ZW50LlBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgVGhlIEV6YXJhYSB3ZXJlIGEgc3BlY2llcyBvZiB3YXJtb25nZXJpbmcgY2Fybml2b3JvdXMgc2VudGllbnRzIHRoYXQgd2VyZSBuYXRpdmUgdG8gdGhlIHRoZSBwbGFuZXRcbiAgICAgICAgICAgICAgICAgICAgRXphcmFhLlxuICAgICAgICAgICAgICAgICAgICBUaGV5IGludGVuZGVkIHRvIG92ZXJ0aHJvdyB0aGUgR2FsYWN0aWMgRW1waXJlLCBvbmx5IHRvIHJlcGxhY2UgaXQgd2l0aCB0aGVpciBvd24gZG9taW5pb24gYW5kIGZlZWRcbiAgICAgICAgICAgICAgICAgICAgb24gdGhlIG90aGVyIHNwZWNpZXMsIHdoaWNoIHRoZXkgZGVlbWVkIGFzIGxlc3NlciB0byB0aGVtLlxuICAgICAgICAgICAgICAgICAgICBUbyBhcm0gdGhlaXIgcmV2b2x1dGlvbiwgdGhlIGRvbWluaW9uIHNlbnQgRXphcmFhIHRvIHRha2UgYWR2YW50YWdlIG9mIG9wcG9ydHVuaXRpZXMgc3VjaCBhcyB0aGVcbiAgICAgICAgICAgICAgICAgICAgQXVjdGlvbiBvZiBSdXIuXG4gICAgICAgICAgICAgICAgPC9EZXRhaWwuQ29udGVudC5QYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgPERldGFpbC5Db250ZW50Lkg0PlxuICAgICAgICAgICAgICAgICAgICBTb2NpZXR5IGFuZCBjdWx0dXJlXG4gICAgICAgICAgICAgICAgPC9EZXRhaWwuQ29udGVudC5IND5cbiAgICAgICAgICAgICAgICA8RGV0YWlsLkNvbnRlbnQuQ29kZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICBcIkJyaW5nIHRoZSBEb21pbmlvbiBvZiB0aGUgRXphcmFhIGFjcm9zcyB0aGUgc3RhcnMhIEFuZCBjb25zdW1lIHRoZSBmbGVzaCBvZiBhbGwgdGhlIGxlc3NlclxuICAgICAgICAgICAgICAgICAgICBzcGVjaWVzIVwiXG4gICAgICAgICAgICAgICAgPC9EZXRhaWwuQ29udGVudC5Db2RlQmxvY2s+XG4gICAgICAgICAgICAgICAgPERldGFpbC5Db250ZW50LlBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAg4oCVQW4gRXphcmFhLCB0byBMdWtlIFNreXdhbGtlclxuICAgICAgICAgICAgICAgIDwvRGV0YWlsLkNvbnRlbnQuUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9EZXRhaWwuQ29udGVudD5cbiAgICAgICAgPC9EZXRhaWw+XG4gICAgKTtcbn0iXSwibmFtZXMiOlsiR2FtZU9mTGlmZSIsIl9qc3hzIiwiX2pzeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUljLFNBQVUsY0FBYyxHQUFBO0FBQ2xDLElBQUEsTUFBTSxXQUFXLEdBQUc7QUFDaEIsUUFBQTtBQUNJLFlBQUEsS0FBSyxFQUFFLEVBQUU7QUFDVCxZQUFBLE1BQU0sRUFBRSxDQUFDO0FBQ1osU0FBQTtBQUNELFFBQUE7QUFDSSxZQUFBLEtBQUssRUFBRSxFQUFFO0FBQ1QsWUFBQSxNQUFNLEVBQUUsQ0FBQztBQUNaLFNBQUE7QUFDRCxRQUFBO0FBQ0ksWUFBQSxLQUFLLEVBQUUsRUFBRTtBQUNULFlBQUEsTUFBTSxFQUFFLENBQUM7QUFDWixTQUFBO0FBQ0QsUUFBQTtBQUNJLFlBQUEsS0FBSyxFQUFFLEVBQUU7QUFDVCxZQUFBLE1BQU0sRUFBRSxDQUFDO0FBQ1osU0FBQTtBQUNELFFBQUE7QUFDSSxZQUFBLEtBQUssRUFBRSxFQUFFO0FBQ1QsWUFBQSxNQUFNLEVBQUUsQ0FBQztBQUNaLFNBQUE7S0FDSixDQUFBO0FBQ0QsSUFBQSxNQUFNLFlBQVksR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUM1RCxJQUFBLE1BQU0sSUFBSSxHQUFHLElBQUlBLGVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUV6QyxJQUFBLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENB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QUMsYUFBYSxDQUFDLENBQUM7QUFDOUMsSUFBQSxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUMsSUFBQSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDaEQsSUFBQSxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDbEQsSUFBQSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUMsSUFBQSxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDbEQsSUFBQSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDaEQsSUFBQSxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFbEQsSUFBQSxRQUNJQyxJQUFBLENBQUMsSUFBSSxFQUFBLEVBQUEsUUFBQSxFQUFBLENBQ0RDLElBQUMsSUFBSSxDQUFDLElBQUksRUFBQSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFDL0IsUUFBQSxFQUFBQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUEsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxFQUFHLENBQUEsRUFBQSxDQUM5QyxFQUNaQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFDakMsUUFBQSxFQUFBQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUEsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxFQUFHLENBQUEsRUFBQSxDQUMvQyxFQUNaQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFBLEVBQUUsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFD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SUFBSSxDQUFDLElBQUksRUFBQSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBRSxDQUFBLEVBQzdDQSxHQUFDLENBQUEsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFBLEVBQUUsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQSxDQUFFLEVBQ3ZDQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFBLEVBQUUsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBRSxDQUFBLEVBQzdDQSxHQUFDLENBQUEsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFBLEVBQUUsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQSxDQUFFLEVBQ3pDQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFBLEVBQUUsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQSxDQUFFLEVBQ3pDQSxHQUFBLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBRSxDQUFBLEVBQ3ZDQSxJQUFDLElBQUksQ0FBQyxJQUFJLEVBQUEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUUsQ0FBQSxFQUNuQ0EsR0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLElBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFFLENBQUEsQ0FBQSxFQUFBLENBQ3hDLEVBQ1Y7QUFDTCxDQUFDO0FBR0QsU0FBUyxNQUFNLEdBQUE7QUFDWCxJQUFBLFFBQ0lELElBQUMsQ0FBQSxNQUFNLEVBQUMsRUFBQSxPQUFPLEVBQUVDLEdBQUMsQ0FBQSxXQUFXLEVBQUUsRUFBQSxDQUFBLEVBQUEsUUFBQSxFQUFBLENBQzNCRCxLQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQ1osRUFBQSxRQUFBLEVBQUEsQ0FBQUMsR0FBQSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFDLEtBQUssRUFBRSxhQUFhLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxDQUFrQyxFQUM3RUEsR0FBQyxDQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFBLEVBQUMsS0FBSyxFQUFFLGdCQUFnQix5QkFBa0MsRUFDaEZBLEdBQUEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxFQUFBLEtBQUssRUFBRSxXQUFXLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxDQUFnQyxFQUN6RUEsR0FBQSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFBLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBcUMsUUFBQSxFQUFBLGFBQUEsRUFBQSxDQUFBLEVBQ3pFRCxLQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLEVBQUEsS0FBSyxFQUFFLGFBQWEsYUFDekNDLEdBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQXVELEVBQUEsUUFBQSxFQUFBLHlCQUFBLEVBQUEsQ0FBQSxFQUNwRkEsSUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQXFELEVBQUEsUUFBQSxFQUFBLHVCQUFBLEVBQUEsQ0FBQSxFQUNsRkEsSUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUEsRUFBQSxRQUFBLEVBQUEsd0JBQUEsRUFBQSxDQUFzRCxFQUNuRkEsR0FBQSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQSxFQUFBLFFBQUEsRUFBQSx3QkFBQSxFQUFBLENBQXNELEVBQ25GQSxHQUFBLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFzRCxFQUFBLFFBQUEsRUFBQSx3QkFBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQzdELENBQ1osRUFBQSxDQUFBLEVBQ2xCRCxLQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUEsRUFBQSxRQUFBLEVBQUEsQ0FDWEMsSUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFPRSxFQUFBLFFBQUEsRUFBQSw0WEFBQSxFQUFBLENBQUEsRUFDM0JBLElBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBRUUsRUFBQSxRQUFBLEVBQUEscUJBQUEsRUFBQSxDQUFBLEVBQ3BCQSxJQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUywwSEFHRSxFQUMzQkEsR0FBQSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxxREFFRSxDQUNkLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FDWixFQUNYO0FBQ047Ozs7In0=