"use client";

import Link from "next/link";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  function truncateAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  }

  function ConnectMenu() {
    const { isConnected, address } = useAccount();
    const { connect, connectors } = useConnect();

    if (isConnected) {
      return (
        <span className="text-sm text-green-600 font-mono">
          {truncateAddress(address!)}
        </span>
      );
    }

    return (
      <button
        type="button"
        onClick={() => connect({ connector: connectors[0] })}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}>
          <div
            className="fixed left-0 top-0 h-full w-64 bg-background shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={toggleSidebar}><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={toggleSidebar}>Explore</Link>
              <Link href="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <button onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <button className="nav-btn">Explore</button>
              </Link>
              <Link href="/dashboard">
                <button className="nav-btn">Dashboard</button>
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button className="create-btn hidden sm:inline-flex">
              <svg className="lucide h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <span>Create Project</span>
            </button>

            <div className="inline-flex items-center rounded-full border text-xs font-semibold text-foreground gap-1 px-3 py-1">
              <svg className="lucide h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
              <ConnectMenu />
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
