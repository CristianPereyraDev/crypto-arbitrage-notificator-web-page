import "../../../styles/prices.css";

type SymbolMonitorProps = { crypto: string; fiat: string };

export default function SymbolMonitor(props: SymbolMonitorProps) {
  const symbol: { crypto: string; fiat: string } = props;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <span>Buy</span>
        <span>Sell</span>
      </div>

      <div
        id={`${symbol.crypto}-${symbol.fiat}-container`}
        className="grid grid-cols-2 gap-4"
        data-asset={symbol.crypto}
        data-fiat={symbol.fiat}
      />
    </div>
  );
}
