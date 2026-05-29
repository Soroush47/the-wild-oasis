import { useEffect, useRef } from "react";

type Action = () => void;

export function useOutsideClick<
    T1 extends HTMLElement,
    T2 extends HTMLElement = HTMLElement,
>(action: Action, listenCapturing = true, extraRef?: React.RefObject<T2 | null>) {
    const ref = useRef<T1 | null>(null);

    // console.log(ref);
    // const actionRef = useRef(action);
    // useEffect(() => {
    //     actionRef.current = action;
    //     console.log("hello");
    // }, [action]);

    useEffect(() => {
        const handleClick = (e: PointerEvent) => {
            const target = e.target as Node;
            // console.log(target);
            const isInsideMain = ref.current?.contains(target);
            const isInsideExtra = extraRef?.current?.contains(target);
            // console.log({ref, extraRef})
            if (isInsideMain) console.log("inside main");
            if (isInsideExtra) console.log("Inside Extra");

            if (ref.current && !isInsideMain && !isInsideExtra) {
                // e.stopPropagation();
                // actionRef.current();
                console.log("action");
                action();
            }
        };
        // console.log("useOutsideClick");
        document.addEventListener("pointerdown", handleClick, true);
        // document.addEventListener("mousedown", handleClick, listenCapturing);
        // document.addEventListener("touchstart", handleClick, listenCapturing);

        return () => {
            document.removeEventListener("pointerdown", handleClick, true);
            // document.removeEventListener("mousedown", handleClick, listenCapturing);
            // document.removeEventListener("touchstart", handleClick, listenCapturing);
        };
    }, [action, extraRef, listenCapturing]);
    // console.log("close");

    return ref;
}
