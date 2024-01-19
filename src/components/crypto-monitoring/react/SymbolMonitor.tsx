import "../../../styles/prices.css";

type SymbolMonitorProps = { crypto: string; fiat: string };

export default function SymbolMonitor(props: SymbolMonitorProps) {
  const symbol: { crypto: string; fiat: string } = props;

  document.addEventListener("htmx:wsAfterMessage", ((event: CustomEvent) => {
    const targetId = document
      .createRange()
      .createContextualFragment(event.detail.message).firstElementChild?.id;
    if (targetId !== undefined) {
      //document.getElementById(targetId)?.classList.remove("htmx-added");
    }
  }) as EventListener);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-slate-50">
        <section class="col-span-full">
          <h2>Volumen</h2>
        </section>
        <div className="rounded-t bg-gray-800 px-2 py-1">
          <strong>Compra</strong>
        </div>
        <div className="rounded-t bg-gray-800 px-2 py-1">
          <strong>Venta</strong>
        </div>
      </div>

      <div
        id={`${symbol.crypto}-${symbol.fiat}-container`}
        className="symbol-monitor-container grid grid-cols-2 gap-4"
        data-asset={symbol.crypto}
        data-fiat={symbol.fiat}
      />
    </>
  );
}
