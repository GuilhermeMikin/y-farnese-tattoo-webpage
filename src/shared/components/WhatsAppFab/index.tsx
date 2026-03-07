import Image from "next/image";

type WhatsAppFabProps = {
  href: string;
  label: string;
};

export default function WhatsAppFab({ href, label }: WhatsAppFabProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-brand p-3 shadow-lg hover:bg-brand-dark dark:bg-brand-dark dark:shadow-black/30 dark:hover:bg-brand"
    >
      <Image
        src="/whatsapp-icon.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
      />
    </a>
  );
}
