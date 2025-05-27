"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from 'next/image';


export function Navbar() {
  const { theme } = useTheme();


  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">             
           <div className="flex flex-col gap-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Image 
                  src="/logo.png" 
                  alt="Arrow Starter"
                  width={70}
                  height={70}
                />
              Arrow Starter
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}