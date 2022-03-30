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
        fetch(`https://api.capes.dev/load/${config.credentials.minecraft.uuid}/optifine`)
            .then(res => res.json())
            .then(({ imageUrl }) => {
                const skin = new SkinRenderer({
                    canvas: canvas.current,
                    width: 256,
                    height: 320,
                    skin: `https://crafatar.com/skins/${config.credentials.minecraft.uuid}.png`,
                    cape: `${imageUrl}.png`,
                    zoom: 1
                });

                const control = createOrbitControls(skin);

                control.enableRotate = true;
                control.enableZoom = false;

                skin.animations.add(WalkingAnimation);
                skin.animations.add(IdleAnimation);
            });
    }, []);

    return <canvas ref={canvas} className="skin h-64 w-80" />;
};

export default MinecraftSkin;
