import type { NextPage } from 'next';
import {
    createOrbitControls,
    SkinViewer as SkinRenderer,
    WalkingAnimation,
    IdleAnimation
} from 'skinview3d';
import config from '@utils/config';
import { useEffect, useRef } from 'react';

const MinecraftSkin: NextPage = () => {
    const canvas = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const skin: string = `${config.baseUrl}/minecraft/skin.png`;
        const cape: string = `${config.baseUrl}/minecraft/cape.png`;

        const renderer = new SkinRenderer({
            canvas: canvas.current,
            width: 256,
            height: 320,
            skin,
            cape,
            zoom: 1
        });

        const control = createOrbitControls(renderer);

        control.enableRotate = true;
        control.enableZoom = false;

        renderer.animations.add(WalkingAnimation);
        renderer.animations.add(IdleAnimation);
    }, []);

    return <canvas ref={canvas} className="skin h-64 w-80" />;
};

export default MinecraftSkin;
