import "../../cssFiles/ChatBot/HeaderColorPicker.css";

export default function HeaderColorPicker({ inputColor, setInputColor }) {
  const defaultColors = ["#FFFFFF", "#000000", "#33475B"];

  const handleColorClick = (color) => setInputColor(color);

  const handleInputChange = (e) => setInputColor(e.target.value);

  return (
    <div className="color-picker-container">
      <h3>Header Color</h3>
      <div className="color-options">
        {defaultColors.map((color) => (
          <div
            key={color}
            onClick={() => handleColorClick(color)}
            className={`color-circle ${inputColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="header-color">
        <div
          className="color-preview"
          style={{ backgroundColor: inputColor }}
        />

        <input
          type="text"
          value={inputColor}
          onChange={handleInputChange}
          placeholder="#33475B"
          className="hex-input"
        />
      </div>
    </div>
  );
}
