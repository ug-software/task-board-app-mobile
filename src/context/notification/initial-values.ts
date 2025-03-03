import { useState } from "react"

export default () => {
    const [notifications, setNotifications] = useState<number>(0);

    const sum = () => setNotifications(state => state + 1);

    const decrease = () => setNotifications(state => state - 1);

    const set = (value: number) => setNotifications(value);

    return { notifications, sum, decrease, set }
}