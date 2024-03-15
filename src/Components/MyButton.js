import './MyButton.css'

function MyButton({ text }) {
  return (
    <div class='button_container'>
      <button class='btn'>
        <span>{text}</span>
      </button>
    </div>
  );
}

export default MyButton;
