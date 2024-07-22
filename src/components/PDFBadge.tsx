import Link from "next/link";
import { Badge } from "~/components/ui/badge";

function PDFIcon() {
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
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

export function PDFLinkBadge({
  href,
  badge,
}: {
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-1"
    >
      {badge && (
        <Badge className="transition-colors hover:bg-primary/80">
          <div className="flex flex-row items-center gap-1 tracking-wider">
            {badge}
            <PDFIcon />
          </div>
        </Badge>
      )}
    </Link>
  );
}
