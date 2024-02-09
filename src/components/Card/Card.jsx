import "./Card.css";

export default function Card({
  media_root,
  id,
  shown,
  card_image_url,
  onClick,
  found,
}) {
  const backImage = media_root + "images/back.gif";
  const cardImage = media_root + card_image_url;
  return (
    <div
      className={
        "Card " + (found ? "Found " : "") + (shown ? "Card--shown" : "")
      }
      onClick={onClick}
    >
      <div className="Card__face Card__face--front">
        <img src={cardImage} />
      </div>
      <div className="Card__face Card__face--back">
        <img src={backImage} />
      </div>
    </div>
  );
}
