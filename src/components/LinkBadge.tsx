import Link from "next/link";
import { Badge } from "~/components/ui/badge";

function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export function LinkBadge({ href, badge }: { href: string; badge?: string }) {
  return (
    <Link href={href} className="flex  gap-1">
      {badge && (
        <Badge>
          <div className="flex flex-row items-center gap-1">
            {badge}
            <LinkIcon />
          </div>
        </Badge>
      )}
    </Link>
  );
}
