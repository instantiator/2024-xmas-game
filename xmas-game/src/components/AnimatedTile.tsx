import { AnimatePresence, motion } from "motion/react";
import { createRef, ReactNode, useId, useState } from "react";

export interface TileProps {
    config: {
        initial: TileConfig,
        input: TileConfig,
        complete: TileConfig,
    }
};

export interface TileConfig {
    transition?: 'scale' | 'scaleX' | 'scaleY';
    backgroundImage?: string;
    content?: ReactNode;
    css?: string;
};

export enum TileState {
    Initial, Input, Complete
}

const animationConfig = {
    initial: {
        scale: { opacity: 0, scale: 0 },
        scaleX: { opacity: 0, scaleX: 0 },
        scaleY: { opacity: 0, scaleY: 0 }
    },
    animate: {
        scale: { opacity: 1, scale: 1, transition: { scale: { type: 'spring', duration: 1, delay: 1 }, opacity: { ease: 'linear', duration: 1, delay: 1 } } },
        scaleX: { opacity: 1, scaleX: 1, transition: { scaleX: { type: 'spring', duration: 1, delay: 1 }, opacity: { ease: 'linear', duration: 1, delay: 1 } } },
        scaleY: { opacity: 1, scaleY: 1, transition: { scaleY: { type: 'spring', duration: 1, delay: 1 }, opacity: { ease: 'linear', duration: 1, delay: 1 } } }
    },
    exit: {
        scale: { opacity: 0, scale: 0, transition: { scale: { type: 'spring', duration: 1 }, opacity: { ease: 'linear', duration: 1 } } },
        scaleX: { opacity: 0, scaleX: 0, transition: { scaleX: { type: 'spring', duration: 1 }, opacity: { ease: 'linear', duration: 1 } } },
        scaleY: { opacity: 0, scaleY: 0, transition: { scaleY: { type: 'spring', duration: 1 }, opacity: { ease: 'linear', duration: 1 } } }
    }
};

export default function AnimatedTile(props: TileProps) {
    const id = useId();
    const animatedDivRef = createRef<HTMLDivElement>();
    const [currentState, setCurrentState] = useState<TileState>(TileState.Initial);

    const getConfig = (state: TileState) => {
        switch (state) {
            case TileState.Initial:
                return props.config.initial;
            case TileState.Input:
                return props.config.input;
            case TileState.Complete:
                return props.config.complete;
        };
    };

    const onTileClick: React.MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === animatedDivRef.current) {
            switch (currentState) {
                case TileState.Initial:
                    setCurrentState(TileState.Input);
                    break;
                case TileState.Input:
                    setCurrentState(TileState.Initial);
                    break;
            }
        }
    };

    return (<>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence initial={false}>
                <motion.div
                    ref={animatedDivRef}
                    key={`tile-${id}-content-${currentState}`}
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: getConfig(currentState).backgroundImage ? `url(${getConfig(currentState).backgroundImage})` : 'none',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={onTileClick}
                    initial={animationConfig.initial[getConfig(currentState).transition || 'scale']}
                    animate={animationConfig.animate[getConfig(currentState).transition || 'scale']}
                    exit={animationConfig.exit[getConfig(currentState).transition || 'scale']}>
                    <div>{getConfig(currentState).content}</div>
                    {currentState === TileState.Input && <>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <span>enter your answer here</span>
                            <input type="text" style={{ textTransform: 'uppercase', fontSize: '2rem', alignSelf: 'stretch' }} />
                        </div>
                    </>}
                </motion.div>
            </AnimatePresence>
        </div>
    </>);
};