import { motion } from "motion/react";
import { CSSProperties, ReactNode } from "react";

export interface OverviewProps {
    style: CSSProperties;
    tiles: ReactNode[];
    background: string;
};

export default function TileLayout(props: OverviewProps) {
    const gridWidth = Math.ceil(Math.sqrt(props.tiles.length));

    return (<>
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                default: { type: "spring", duration: 1, delay: 0.5 },
                opacity: { ease: "linear", duration: 2, delay: 0.5 }
            }}
            style={{
                position: 'absolute',
                left: 0, right: 0, top: 0, bottom: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
                gridGap: '1rem',
                backgroundColor: 'transparent',
                backgroundImage: `url(${props.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...props.style,
            }}>
            {props.tiles.map((component, index) => (
                <div key={`overview-component-div-${index}`}>
                    {component}
                </div>
            ))}
        </motion.div>
    </>);
};