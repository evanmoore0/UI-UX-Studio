import "../App.css";

// Bakery Item Component
const BakeryItem = (props) => {
  return (
    <div className="BakeryItem">
      <p id="item-title">{props.name}</p>

      <img src={props.image} alt = {`Can't get ${props.name} :(`} />

      <p className="description">{props.description}</p>
    </div>
  );
};

export default BakeryItem;
