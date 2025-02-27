import { useContext } from "react"
import { DialogContext } from "../context/dialog";

export default () => {
    const { confirm, description, handleChange, on, open, title } = useContext(DialogContext);

    return { confirm, description, handleChange, on, open, title }
}