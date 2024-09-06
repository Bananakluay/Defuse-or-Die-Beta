type Props = {
  batteries: string[];
  pulledBatteries: string[];
  onBatteryPull: (fuse: string) => void;
};

function BatterySlot({ batteries, pulledBatteries, onBatteryPull }: Props) {



  return (
    <div className="fuse-panel">
      {batteries.map(battery => (
        <button
          key={battery}
          onClick={() => onBatteryPull(battery)}
          disabled={pulledBatteries.includes(battery)} // Disable if already pulled
          className={pulledBatteries.includes(battery) ? 'fuse-pulled' : 'fuse-button'}
        >
          Battery
        </button>
      ))}
    </div>
  );
};

export default BatterySlot;
