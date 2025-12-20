
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "SMS",
    submenu: [
      { label: "Send SMS", href: "/dashboard/sms" },
      { label: "SMS History", href: "/dashboard/sms/history" },
      { label: "Scheduled SMS", href: "/dashboard/sms/scheduled" },
    ],
  },
  {
    label: "Wallet",
    submenu: [
      { label: "Top-Up", href: "/dashboard/wallet/top-up" },
      { label: "Wallet History", href: "/dashboard/wallet/history" },
      { label: "Low Balance Reminder", href: "/dashboard/wallet/low-balance-reminder" },
    ],
  },
  {
    label: "Settings",
    submenu: [
      { label: "Change Password", href: "/dashboard/settings/change-password" },
      { label: "Update Profile", href: "/dashboard/settings/profile" },
      { label: "API", href: "/dashboard/settings/api" },
    ],
  },
];

export default function Sidebar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch()

    const isActive = (href: string) => {
        if (href === '/dashboard') {
          return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const defaultOpenMenus = links
    .filter((link) => link.submenu?.some((sublink) => pathname.startsWith(sublink.href)))
    .map((link) => link.label);

     const handleLogout = ()=>{
        dispatch(logout())
    }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen fixed top-0 left-0 bg-muted p-4 hidden md:block z-[1000] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6">SMS Dashboard</h2>
        <nav className="space-y-3">
          <Accordion type="multiple" className="w-full" defaultValue={defaultOpenMenus}>
            {links.map((link, index) =>
                link.submenu ? (
                    <AccordionItem key={index} value={link.label}>
                        <AccordionTrigger className="text-left hover:no-underline cursor-pointer">{link.label}</AccordionTrigger>
                        <AccordionContent className="pl-4 space-y-1">
                            {link.submenu.map((sublink) => {
                                const isActive = pathname === sublink.href;
                            return (
                            <Link
                                key={sublink.href}
                                href={sublink.href}
                                className={`block text-sm rounded-md px-2 py-2.5 
                                    hover:bg-card hover:text-accent-foreground 
                                    transition-all duration-300 ease-in-out cursor-pointer 
                                    ${isActive ? "bg-card" : ''}`}
                            >
                                {sublink.label}
                            </Link>
                            )})}
                        </AccordionContent>
                    </AccordionItem>
                ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 -ml-3
                    hover:bg-card hover:text-accent-foreground 
                    transition-all duration-300 ease-in-out 
                    ${isActive(link.href) ? 'bg-card font-semibold' : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </Accordion>
        </nav>

        <Button onClick={handleLogout}
        variant="destructive" size="lg" 
        className="mt-20 w-full cursor-pointer">
          Logout
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden py-6 z-[1000]">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="m-3 fixed top-0 left-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-8 z-[10000]">
            <h2 className="text-lg font-semibold mb-4">SMS Dashboard</h2>
            <nav className="space-y-2 z-[1000]">
              <Accordion type="multiple" className="w-full" defaultValue={defaultOpenMenus}>
                {links.map((link, index) =>
                  link.submenu ? (
                    <AccordionItem key={index} value={link.label}>
                      <AccordionTrigger className="text-left">{link.label}</AccordionTrigger>
                      <AccordionContent className="pl-4 space-y-1">
                        {link.submenu.map((sublink) => {
                        const isActive = pathname.startsWith(sublink.href || '');
                        return(
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className={`block text-sm rounded-md px-2 py-2.5 
                                hover:bg-card hover:text-accent-foreground 
                                transition-all duration-300 ease-in-out 
                                ${isActive ? "bg-card" : ''}`}
                          >
                            {sublink.label}
                          </Link>
                        )})}
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-md px-3 py-2 -ml-3
                        hover:bg-card hover:text-accent-foreground 
                        transition-all duration-300 ease-in-out 
                        ${isActive(link.href) ? 'bg-card font-semibold' : ''}`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </Accordion>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
