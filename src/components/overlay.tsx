import { MouseEventHandler, ReactNode } from 'react';

type OverlayProps = {
    children: ReactNode;
    setDisplay?: Function;
};

export default function Overlay({ children, setDisplay }: OverlayProps) {
    return (
        <div onClick={() => setDisplay && setDisplay('none')} className="overlay bg-black bg-opacity-80 fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
            {children}
        </div>
    );
}
