// src/App.jsx
import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-8 bg-gray-50 dark:bg-gray-900">
        <header className="flex w-full justify-end">
          <ModeToggle />
        </header>

        <main className="flex flex-col items-center space-y-8 text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl font-bold">Welcome to Shadcn UI</h1>
          <div className="space-x-4">
            <Button variant="default">Light Button</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-md border rounded-md bg-white dark:bg-gray-800"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
              <AccordionContent>
                A set of beautiful, accessible React components built with
                Tailwind CSS and Radix.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How to add more components?</AccordionTrigger>
              <AccordionContent>
                Run <code>npx shadcn@latest add &lt;component&gt;</code>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </main>
      </div>
    </ThemeProvider>
  );
}
