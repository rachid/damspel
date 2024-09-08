# Dammen Spel (Checkers Game)

Dammen spel, gemaakt met TypeScript. 
Het spel is console-gestuurd en is Test Driven opgezet.

## Vereisten

Voordat je begint, zorg ervoor dat je de volgende tools hebt geïnstalleerd:

- **TypeScript** en **ts-node**

## Installatie

1. Clone de repository of download de bestanden.

2. Open een terminal in de hoofdmap van het project en voer het volgende commando uit om alle benodigde pakketten te installeren:

    ```bash
    npm install
    ```

## Project Uitvoeren

### Via `ts-node`

Gebruik `ts-node` om het TypeScript-bestand direct uit te voeren:

```bash
npx ts-node 
```

Binnen de node REPL kan het spel gestart worden
```node
import { DamSpel } from './src/DamSpel';

const game = new DamSpel;
// Basis requirement 4
game.getBoard()
game.getCurrentPlayer()

// Basis requirement 1 & 2
game.movePiece({ row: 6, col:3 }, { row: 5, col: 4})
```
