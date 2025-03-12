/** @format */

import { useState } from "react";

export interface OnProps {
  title: string,
  description: string,
  onConfirm: (value: boolean) => void
}

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<Function | null>(null);
  const [dialog, setDialog] = useState({
    title: "",
    description: ""
  });

  const handleChange = () => setOpen(state => !state);

  const on = ({ title, description, onConfirm }: OnProps) => {
    setDialog({ title, description });
    setConfirm(() => onConfirm);
    setOpen(true);
  }

  return { ...dialog, open, confirm, handleChange, on };
};
