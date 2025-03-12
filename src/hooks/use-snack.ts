import { useContext } from "react"
import { SnackContext } from "../context/snack"

export default () => {
    const { schedule } = useContext(SnackContext);

    return { schedule };
}