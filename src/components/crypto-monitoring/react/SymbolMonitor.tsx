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
      <div className="sticky top-0 grid grid-cols-2 gap-x-4 bg-gray-800 text-slate-50">
        <section class="col-span-full flex gap-x-1 px-2 py-2">
          <label>
            Volumen: <input type="number" id="input-volume" />
          </label>
        </section>
        <div className="rounded-t-md bg-teal-400 px-2 py-1">
          <strong>Compra</strong>
        </div>
        <div className="rounded-t-md bg-teal-400 px-2 py-1">
          <strong>Venta</strong>
        </div>
      </div>

      <div
        id={`${symbol.crypto}-${symbol.fiat}-container`}
        className="px-l-1 grid w-full grid-cols-2 gap-x-4"
        data-asset={symbol.crypto}
        data-fiat={symbol.fiat}
      />
    </>
  );
}
