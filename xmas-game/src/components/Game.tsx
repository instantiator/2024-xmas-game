import { useState } from 'react';
import cat from '../assets/cat.png';
import heart from '../assets/heart.png';
import parchment from '../assets/parchment.png';
import bear from '../assets/polar-think.png';
import scene from '../assets/scene.png';
import star from '../assets/star.png';
import sun from '../assets/sun.png';
import AnimatedTile from './AnimatedTile';
import TileLayout from "./TileLayout";

export interface GameProps {

};

export enum GameMode {
    Playing,
    Completed
};

export default function Game(props: GameProps) {
    const [mode, setMode] = useState<GameMode>(GameMode.Playing);

    return (<>
        {mode === GameMode.Playing &&
            <TileLayout
                background={scene}
                style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                tiles={[
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: {
                            content:
                                <>
                                    <p>In the garden, find the compass, don't let it go to waste,</p>
                                    <p>Bring it back to base with haste, and set the perfect pace.</p>
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleX',
                            answer: 'cave'
                        },
                        complete: {
                            content:
                                <>
                                    <p>That's right!</p>
                                    <p>Snowy was playing in a cave.</p>
                                    <img src={sun} style={{ width: '15%', height: 'auto' }} />
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleY'
                        }
                    }}
                    />,
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: {
                            content:
                                <>
                                    <p>Find a clue in the tree, hidden sparkling bright,</p>
                                    <p>A magic treasure waits for you, in the soft glowing light.</p>
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleX',
                            answer: 'forest'
                        },
                        complete: {
                            content:
                                <>
                                    <p>Hurray!</p>
                                    <p>You found Sunny in the forest!</p>
                                    <img src={star} style={{ width: '15%' }} />
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleY'
                        }
                    }}
                    />,
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: {
                            content:
                                <>
                                    <p>Go to the playroom and take a glance,</p>
                                    <p>Spot the difference to advance!</p>
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleX',
                            answer: 'mountain'
                        },
                        complete: {
                            content:
                                <>
                                    <p>Well done!</p>
                                    <p>Sky was hiking in the mountains.</p>
                                    <img src={heart} style={{ width: '15%', height: 'auto' }} />
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleY'
                        }
                    }}
                    />,
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: {
                            content:
                                <>
                                    <p>Look in Avery's room and Eden's too,<br />
                                        Find two new books that hold a clue.</p>
                                    <p>Put these clues together with care,<br />
                                        To discover the answer waiting there!</p>
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleX',
                            answer: 'sea'
                        },
                        complete: {
                            content:
                                <>
                                    <p>You've done it!</p>
                                    <p>Scout had gone to sea!</p>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems:'center', gap: '0.5rem' }}>
                                        <img src={cat} style={{width: '15%', height: 'auto' }} />
                                        <span>=</span>
                                        <span>7</span>
                                    </div>
                                </>,
                            backgroundImage: parchment,
                            transition: 'scaleY'
                        }
                    }}
                    />,
                ]}
            />}

    </>);
};