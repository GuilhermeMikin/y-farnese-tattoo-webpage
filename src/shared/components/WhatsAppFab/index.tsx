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
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-dark dark:bg-brand-dark dark:shadow-black/30 dark:hover:bg-brand"
    >
      {label}
    </a>
  );
}
