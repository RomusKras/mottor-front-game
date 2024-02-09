export default function Header({ media_root, game_name, game_logo_url }) {
  return (
    <div>
      <img src={media_root + game_logo_url} className="GameLogo" />
      <h1 className="GameName">Игра "{game_name}"</h1>
    </div>
  );
}
