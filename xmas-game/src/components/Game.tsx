import { useState } from 'react';
import parchment from '../assets/parchment.png';
import bear from '../assets/polar-think.png';
import scene from '../assets/scene.png';
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
                        input: { content: <span>riddle 1</span>, backgroundImage: parchment, transition: 'scaleX' },
                        complete: { content: <span>complete 1</span>, backgroundImage: parchment }
                    }}
                    />,
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: { content: <span>riddle 2</span>, backgroundImage: parchment, transition: 'scaleX' },
                        complete: { content: <span>complete 2</span>, backgroundImage: parchment }
                    }}
                    />,
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: { content: <span>riddle 3</span>, backgroundImage: parchment, transition: 'scaleX' },
                        complete: { content: <span>complete 3</span>, backgroundImage: parchment }
                    }}
                    />,
                    <AnimatedTile config={{
                        initial: { content: <></>, backgroundImage: bear, transition: 'scale' },
                        input: { content: <span>riddle 4</span>, backgroundImage: parchment, transition: 'scaleX' },
                        complete: { content: <span>complete 4</span>, backgroundImage: parchment }
                    }}
                    />,
                ]}
            />}

    </>);
};