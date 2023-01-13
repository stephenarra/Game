# GIF Game

GIF Game is a [Jackbox](https://www.jackboxgames.com/)-esque multiplayer game where players use a shared screen and their phones to select the best GIF response.

## About

The server uses a framework, [Colyseus](https://docs.colyseus.io/colyseus/), to manage rooms and sync game state across players. The client is a [NextJS](https://nextjs.org/) project.

## Game Flow
- The leader selects a prompt
- The other players select a GIF that they think the leader will like the best
- The leader sees all GIFs and selects their favorite, that player receives a point

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
