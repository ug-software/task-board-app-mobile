import { useState } from "react"
import { Message } from "./index";

export default () => {
    const [state, setState] = useState<Message>({
        phase: null,
        severity: "success",
        variant: "container"
    });
    const [open, setOpen] = useState<boolean>(false);

    const schedule = (props: Message) => {
        setState(props);
        setOpen(true);

        setTimeout(() => setOpen(false), 1500)
    }

    return { state, open, schedule }
}