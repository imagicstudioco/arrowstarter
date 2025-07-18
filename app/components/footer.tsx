import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Raise funds for</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/medical">Medical</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/emergency">Emergency</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/memorial">Memorial</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/education">Education</Link>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Learn More</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/how-it-works">How it Works</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/success-stories">Success Stories</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/pricing">Pricing</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/support">Support</Link>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/help-center">Help Center</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/blog">Blog</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/press">Press</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/careers">Careers</Link>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/privacy">Privacy</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/terms">Terms</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/legal">Legal</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Zoinr. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              Facebook
            </Button>
            <Button variant="ghost" size="sm">
              Twitter
            </Button>
            <Button variant="ghost" size="sm">
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}