import '../styles/SwitchPanel.css';

type Props = {
  switches: string[];
  onSwitchToggle: (switchName: string) => void;
  switchStates: { [key: string]: boolean };
};

function SwitchPanel({ switches, onSwitchToggle, switchStates }: Props) {
  //console.log('SwitchPanel props:', { switches, switchStates });

  return (
    <div className="switch-container">
      {switches.map(switchName => (
        <div key={switchName} className="switch-item">
          <label>
            <input
              type="checkbox"
              checked={switchStates[switchName] || false}
              onChange={() => onSwitchToggle(switchName)}
            />
            {switchName}
          </label>
        </div>
      ))}
    </div>
  );
}

export default SwitchPanel;
