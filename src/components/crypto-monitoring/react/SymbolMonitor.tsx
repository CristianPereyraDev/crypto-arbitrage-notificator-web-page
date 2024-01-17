import "../../../styles/prices.css";

type SymbolMonitorProps = { crypto: string; fiat: string };

export default function SymbolMonitor(props: SymbolMonitorProps) {
  const symbol: { crypto: string; fiat: string } = props;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-slate-50">
        <div className="rounded-t bg-gray-800 px-2 py-1">
          <strong>Buy</strong>
        </div>
        <div className="rounded-t bg-gray-800 px-2 py-1">
          <strong>Sell</strong>
        </div>
      </div>

      <div
        id={`${symbol.crypto}-${symbol.fiat}-container`}
        className="grid grid-cols-2 gap-4"
        data-asset={symbol.crypto}
        data-fiat={symbol.fiat}
      />
    </>
  );
}
