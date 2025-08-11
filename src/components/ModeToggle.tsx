"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}