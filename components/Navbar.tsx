import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MobileNav from "./MobileNav";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const user = false; // Mocked user state for demonstration; replace with actual user logic
  const isAuthenticated = !!user; // Check if the user is logged in

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all text-black">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-16">
        <Link href="/" className="z-40 flex font-semibold text-2xl">
          <span>
            Tony <span className="text-gradient">Nash.</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <MobileNav isAuth={isAuthenticated} />

          <div className="hidden sm:flex items-center space-x-4">
            <Link href="/home" className="hover:text-secondary transition-colors duration-200 ease-in-out">
              Home
            </Link>
            <Link href="/about" className="hover:text-secondary transition-colors duration-200 ease-in-out">
              About Us
            </Link>
            <Link href="/services" className="hover:text-secondary transition-colors duration-200 ease-in-out">
              Our Services
            </Link>
            <Link href="/contact" className="hover:text-secondary transition-colors duration-200 ease-in-out">
              Contact Us
            </Link>
            <Link href="/store" className="hover:text-secondary transition-colors duration-200 ease-in-out">
              Shop
            </Link>

            {!isAuthenticated ? (
              <>
                <Link href={`/sign-up`} className={cn(buttonVariants())}>Get Started</Link>
                <Link href={`/sign-in`} className={cn(buttonVariants({variant:"ghost"}))}>Sign In</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="hover:text-secondary transition-colors duration-200 ease-in-out">
                  User Dashboard
                </Link>
                {user?.admin && (
                  <Link href="/admin_panel" className="hover:text-secondary transition-colors duration-200 ease-in-out">
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
