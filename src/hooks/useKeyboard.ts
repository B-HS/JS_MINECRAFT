import { useCallback, useEffect, useState } from "react";

const actionByKey = (key: string)=> {
    const keyActionMap : any = {
        KeyW: "moveFoward",
        KeyS: "moveBackward",
        KeyA: "moveLeft",
        KeyD: "moveRight",
        Space: "jump",
        Digit1: "dirt",
        Digit2: "grass",
        Digit3: "glass",
        Digit4: "wood",
        Digit5: "log",
    };
    return keyActionMap[key];
}

export const useKeybaord = () => {
    const [action, setAction] = useState({
        moveForward: false,
        moveBackword: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        texture1: false,
        texture2: false,
        texture3: false,
        texture4: false,
        texture5: false,
    });

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const action = actionByKey(e.code);
        if (action) {
            setAction((prev) => {
                return {
                    ...prev,
                    [action]: true,
                };
            });
        }
    }, []);

    const handleKeyup = useCallback((e: KeyboardEvent) => {
        const action = actionByKey(e.code);
        if (action) {
            setAction((prev) => {
                return {
                    ...prev,
                    [action]: false,
                };
            });
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyup);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyup);
        };
    }, [handleKeyDown, handleKeyup]);

    return action
};
