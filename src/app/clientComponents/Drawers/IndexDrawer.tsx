import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ExternalLink, User, Info, FileText } from "lucide-react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
const IndexDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg" className="md:hidden">
          <MoreHorizontal size={27} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>
            Access documentation, learn about the project, or sign in to your
            account.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <DrawerClose asChild>
              <Link
                href="https://github.com/prasannashrestha011/Portcraft/blob/main/README.md"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation"
              >
                <FileText className="h-4 w-4" />
                Documentation
                <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <Link
                href="#about"
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation"
              >
                <Info className="h-4 w-4" />
                About
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <Link
                href="/login"
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation"
              >
                <User className="h-4 w-4" />
                Sign In / Sign Up
              </Link>
            </DrawerClose>
          </nav>
        </div>

        <DrawerFooter className="pt-6">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close Menu
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default IndexDrawer;
