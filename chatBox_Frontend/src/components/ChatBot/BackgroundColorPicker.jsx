import "../../cssFiles/ChatBot/BackgroundColorPicker.css";

export default function BackgroundColorPicker({
  backgroundColor,
  setBackgroundColor,
}) {
  const defaultColors = ["#FFFFFF", "#000000", "#EEEEEE"];

  const handleColorClick = (color) => setBackgroundColor(color);

  const handleInputChange = (e) => setBackgroundColor(e.target.value);

  return (
    <div className="color-picker-container">
      <h3>Background Color</h3>
      <div className="color-options">
        {defaultColors.map((color) => (
          <div
            key={color}
            onClick={() => handleColorClick(color)}
            className={`color-circle ${
              backgroundColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="background-color">
        <div
          className="color-preview"
          style={{ backgroundColor: backgroundColor }}
        />
        <input
          type="text"
          value={backgroundColor}
          onChange={handleInputChange}
          placeholder="#EEEEEE"
          className="hex-input"
        />
      </div>
    </div>
  );
}
