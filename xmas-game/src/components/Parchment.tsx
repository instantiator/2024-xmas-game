import React, { createRef, CSSProperties, ReactNode } from "react";
import { useImageSize } from "react-image-size";
import parchment from '../assets/parchment.png';

export interface ParchmentProps {
    image?: string;
    children?: ReactNode;
    style?: CSSProperties;
    onClick?: () => void;
};

export default function Parchment(props: ParchmentProps) {
    const [dimensions, { loading, error }] = useImageSize(props.image ?? parchment);
    const coreDivRef = createRef<HTMLDivElement>();

    const onImageClicked = () => {
        props.onClick?.();
    };

    const onDivClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === coreDivRef.current) {
            props.onClick?.();
        }
    };

    return (<>
        {dimensions && <>
            <div style={{ width: '100%', height: '100%' }}>
                    <div style={{
                        aspectRatio: `${dimensions.width}/${dimensions.height}`,
                        width: 'auto', height: '100%',
                        maxHeight: '100%', maxWidth: '100%',
                        position: 'relative',
                        backgroundImage: props.image ? `url('${props.image}')` : 'none',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        overflow: 'hidden',
                        marginLeft: 'auto', marginRight: 'auto'
                    }}>
                        {/* {props.image &&
                        <img
                            src={props.image}
                            style={{ width: 'auto', height: 'auto' }} />} */}
                        <div
                            ref={coreDivRef}
                            onClick={onDivClicked}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center',
                                padding: '5%'
                            }}>
                            {props.children}
                        </div>
                    </div>
            </div>
        </>}
    </>);
}