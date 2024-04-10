import { ArrowRight2 } from "iconsax-react";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

export const Breadcrumbs = ({
  breadcrumb,
  firstText,
  action,
  link,
  savelink,
}: {
  breadcrumb: string;
  firstText: string;
  action: string;
  link?: string;
  savelink?: string;
}) => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {link && (
          <Link href={link}>
            <p className="text-base font-medium text-comment">{firstText}</p>
          </Link>
        )}
        <ArrowRight2 size="16" />
        <p className="text-base font-medium text-comment">{breadcrumb}</p>
      </div>
      {savelink && (
        <Link href={savelink}>
          <Button
            type="submit"
            className=" text-card font-medium text-sm bg-primary lg:py-5 px-6 rounded-[40px] h-0 py-4"
          >
            {action}
          </Button>
        </Link>
      )}
    </section>
  );
};
