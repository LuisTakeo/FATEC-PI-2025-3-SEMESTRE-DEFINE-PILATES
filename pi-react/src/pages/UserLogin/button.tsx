export function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="submit"
      className="!bg-[var(--azul-segundario)] text-white font-inter py-3 rounded-md hover:!bg-[var(--destaque)] transition-all w-full font-semibold"
      onClick={onClick}
    >
      {children}
    </button>
  );
}