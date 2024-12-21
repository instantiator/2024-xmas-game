import { useEffect, useState } from 'react';
import Sparkles from 'react-sparkle';
import useSound from 'use-sound';
import cat from '../assets/cat.png';
import codex from '../assets/codex.png';
import heart from '../assets/heart.png';
import music1 from '../assets/music-1.mp3';
import music2 from '../assets/music-2.mp3';
import parchmentWin1 from '../assets/parchment-win-1.png';
import parchmentWin2 from '../assets/parchment-win-2.png';
import parchmentWin3 from '../assets/parchment-win-3.png';
import parchment from '../assets/parchment.png';
import bear from '../assets/polar-think.png';
import scene from '../assets/scene.png';
import star from '../assets/star.png';
import sun from '../assets/sun.png';
import win from '../assets/win-sound.mp3';
import AnimatedTile from './AnimatedTile';
import TileLayout from "./TileLayout";

export interface GameProps {

};

export enum GameMode {
    Ready,
    Intro,
    PlayingCore,
    PlayingFinale,
};

export default function Game(props: GameProps) {
    const [mode, setMode] = useState<GameMode>(GameMode.Ready);
    const [coreComplete, setCoreComplete] = useState<boolean[]>([]);
    const [forceShow, setForceShow] = useState<boolean[]>([]);

    const [playMusic1] = useSound(music1);
    const [playMusic2] = useSound(music2);
    const [playWin] = useSound(win);

    useEffect(() => {
        switch (mode) {
            case GameMode.Intro:
                playMusic1();
                break;
            case GameMode.PlayingCore:
                setForceShow([true]);
                setCoreComplete([]);
                break;
            case GameMode.PlayingFinale:
                setTimeout(() => { playMusic2(); }, 3000); 
                break;
        }
    }, [mode]);

    const onTileComplete = (index: number) => {
        playWin();

        const newCoreComplete = [...coreComplete];
        newCoreComplete[index] = true;

        const newForceShow = [...forceShow];
        newForceShow[index + 1] = true;

        if (newCoreComplete.length === coreTiles.length && newCoreComplete.every(x => x)) {
            setMode(GameMode.PlayingFinale);
        }

        setCoreComplete(newCoreComplete);
        setForceShow(newForceShow);
    };

    const readyTiles = [
        <AnimatedTile
            config={{
                initial: {
                    content:
                        <>
                            <span>Click to start...</span>
                        </>,
                    backgroundImage: parchment,
                    transition: 'scaleX',
                }
            }}
            clickableStart={true}
            forceShow={false}
            onComplete={() => { setMode(GameMode.Intro); }}
        />
    ];

    const introTiles = [
        <AnimatedTile config={{
            initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
            input: {
                content:
                    <>
                        <span>Oh no! Our friends are lost in the snow!</span>
                        <span>Help us find them and bring them back to base!</span>
                    </>,
                instruction: "When you're ready, type READY",
                backgroundImage: parchment,
                transition: 'scaleX',
                answer: 'ready'
            },
            complete: {
                content:
                    <>
                        <span>Great job!</span>
                        <span>Let's get started!</span>
                    </>,
                backgroundImage: parchment,
                transition: 'scaleY'
            }
        }}
            clickableStart={true}
            onComplete={() => { setMode(GameMode.PlayingCore); }}
            forceShow={false}
        />
    ];

    const coreTiles = [
        <AnimatedTile config={{
            initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
            input: {
                content:
                    <>
                        <span>In the garden, find the compass, don't let it go to waste,</span>
                        <span>Bring it back to base with haste, and set the perfect pace.</span>
                    </>,
                backgroundImage: parchment,
                transition: 'scaleX',
                answer: 'cave'
            },
            complete: {
                content:
                    <>
                        <span>That's right!</span>
                        <span>Snowy was playing in a cave.</span>
                        <img src={sun} style={{ width: '15%', height: 'auto' }} />
                    </>,
                backgroundImage: parchmentWin1,
                transition: 'scaleY'
            }
        }}
            clickableStart={true}
            forceShow={forceShow[0]}
            onComplete={() => { onTileComplete(0); }}
        />,
        <AnimatedTile config={{
            initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
            input: {
                content:
                    <>
                        <span>Find a magnet in the tree, where Christmas lights embrace,</span>
                        <span>The bring it back to base with glee, a festive, joyful chase.</span>
                    </>,
                backgroundImage: parchment,
                transition: 'scaleX',
                answer: 'forest'
            },
            complete: {
                content:
                    <>
                        <span>Hurray!</span>
                        <span>You found Sunny in the forest!</span>
                        <img src={star} style={{ width: '15%' }} />
                    </>,
                backgroundImage: parchmentWin2,
                transition: 'scaleY'
            }
        }}
            clickableStart={false}
            forceShow={forceShow[1]}
            onComplete={() => { onTileComplete(1); }}
        />,
        <AnimatedTile config={{
            initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
            input: {
                content:
                    <>
                        <span>Go to the playroom and take a glance,</span>
                        <span>Spot 4 differences to advance!</span>
                    </>,
                backgroundImage: parchment,
                transition: 'scaleX',
                answer: 'mountain'
            },
            complete: {
                content:
                    <>
                        <span>Well done!</span>
                        <span>Sky was hiking in the mountains.</span>
                        <img src={heart} style={{ width: '15%', height: 'auto' }} />
                    </>,
                backgroundImage: parchmentWin3,
                transition: 'scaleY'
            }
        }}
            clickableStart={false}
            forceShow={forceShow[2]}
            onComplete={() => { onTileComplete(2); }}
        />,
        <AnimatedTile config={{
            initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
            input: {
                content:
                    <>
                        <span>Look in Avery's room and Eden's too,<br />
                            Find two new books that hold a clue.</span>
                        <span>Put these clues together with care,<br />
                            To discover the answer waiting there!</span>
                    </>,
                backgroundImage: parchment,
                transition: 'scaleX',
                answer: 'sea'
            },
            complete: {
                content:
                    <>
                        <span>You've done it!</span>
                        <span>Scout had gone to sea!</span>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', gap: '0.5rem' }}>
                            <img src={cat} style={{ width: '15%', height: 'auto' }} />
                            <span>=</span>
                            <span>7</span>
                        </div>
                    </>,
                backgroundImage: parchmentWin1,
                transition: 'scaleY'
            }
        }}
            clickableStart={false}
            forceShow={forceShow[3]}
            onComplete={() => { onTileComplete(3); }}
        />
    ];

    const finaleTiles = [
        <AnimatedTile
            config={{
                initial: {
                    content:
                        <>
                            <Sparkles flicker={false} />

                            <span>Well done, you've found all our friends!</span>
                            <span>To claim your prize, you're nearly there,<br />
                                Find the Codex with knowledge to share</span>
                            <span>Then seek the tale of a curious land,<br />
                                Where Alice’s journey is close at hand.</span>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <img src={star} style={{ width: '10%', height: 'auto' }} />
                                <img src={sun} style={{ width: '10%', height: 'auto' }} />
                                <img src={heart} style={{ width: '10%', height: 'auto' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
                                <img src={cat} style={{ width: '30%', height: 'auto' }} /> = 7
                            </div>
                            <img src={codex} style={{ width: '20%', height: 'auto', opacity: 0.8 }} />
                        </>,
                    backgroundImage: parchmentWin1,
                    transition: 'scaleX',
                }
            }}
            clickableStart={false}
            forceShow={false}
        />
    ];

    return (<>
        {mode === GameMode.Ready &&
            <TileLayout
                background={scene}
                style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                tiles={readyTiles}
            />}

        {mode === GameMode.Intro &&
            <TileLayout
                background={scene}
                style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                tiles={introTiles}
            />}

        {mode === GameMode.PlayingCore &&
            <TileLayout
                background={scene}
                style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                tiles={coreTiles}
            />}

        {mode === GameMode.PlayingFinale &&
            <TileLayout
                background={scene}
                style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                tiles={finaleTiles}
            />}

    </>);
};