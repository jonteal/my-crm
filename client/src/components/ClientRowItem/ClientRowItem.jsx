import "../ClientCard/clientCard.css";

const rootClass = "client-card";

const ClientCardItem = ({ value, header }) => {
  return (
    <div className={`${rootClass}-item-container`}>
      <p className={`${rootClass}-header`}>{header}</p>
      <p>{value}</p>
    </div>
  );
};

export default ClientCardItem;
