class Room {
    paths: { [key: string]: boolean };
    coordinates: { [key: string]: number };
    start: boolean;

    constructor(paths: { N: boolean; S: boolean; E: boolean; W: boolean }, coordinates: { X: number; Y: number }, start: boolean = false) {
        this.paths = paths;
        this.coordinates = coordinates;
        this.start = start;
    }

    createRoomElement(): HTMLElement {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room');
        if (this.start) roomElement.classList.add('start');

        // Set position variables as CSS custom properties
        roomElement.style.setProperty('--pos-x', this.coordinates.X.toString());
        roomElement.style.setProperty('--pos-y', this.coordinates.Y.toString());

        const roomContents: HTMLElement[] = [];

        // Loop through each row
        for (let i = 0; i < 3; i++) {
            // Loop through each column
            for (let j = 0; j < 3; j++) {
                const element = document.createElement('div');
                if ((i === 0 || i === 2) && (j === 0 || j === 2)) {
                    element.className = 'corner';
                } else if (i === 1 && j === 1) {
                    element.className = 'center';
                } else {
                    element.className = 'path';
                    if (i === 0) element.dataset.path = String(this.paths.N);
                    else if (i === 2) element.dataset.path = String(this.paths.S);
                    else if (j === 0) element.dataset.path = String(this.paths.W);
                    else if (j === 2) element.dataset.path = String(this.paths.E);
                }
                roomContents.push(element);
            }
        }

        roomElement.append(...roomContents)

        // Hide borders based on paths
        if (this.paths.N) roomElement.style.borderTop = 'none';
        if (this.paths.S) roomElement.style.borderBottom = 'none';
        if (this.paths.E) roomElement.style.borderRight = 'none';
        if (this.paths.W) roomElement.style.borderLeft = 'none';

        return roomElement;
    }
}

function generateMap(gridWidth: number, gridHeight: number): Room[] {
    const grid: Room[] = [];

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            grid.push(new Room({ N: false, S: false, E: false, W: false }, { X: x + 1, Y: y + 1 }));
        }
    }

    const visited = new Set<Room>();
    const unvisited = new Set<Room>();

    const start_x: number = Math.ceil(gridWidth / 2);
    const start_y: number = Math.ceil(gridHeight / 2);

    const start_room: Room = grid.find((room) => room.coordinates.X === start_x && room.coordinates.Y === start_y) || new Room({ N: false, S: false, E: false, W: false }, { X: 0, Y: 0 });

    start_room.start = true;

    while (Object.values(start_room.paths).filter((item) => item === true).length < 2) {
        unvisited.clear();

        start_room.paths = {
            N: generatePath(start_room, 'N'),
            S: generatePath(start_room, 'S'),
            E: generatePath(start_room, 'E'),
            W: generatePath(start_room, 'W'),
        };
    }

    visited.add(start_room);

    function generatePath(room: Room, direction: string): boolean {
        let path_open: boolean = false;

        if (room.paths[direction]) return true;

        let new_room_coords: { [key: string]: number } = { ...room.coordinates };

        if (direction === 'N' || direction === 'North') new_room_coords.Y--;
        if (direction === 'S' || direction === 'South') new_room_coords.Y++;
        if (direction === 'E' || direction === 'East') new_room_coords.X++;
        if (direction === 'W' || direction === 'West') new_room_coords.X--;

        let room_to_test: Room | undefined = grid.find((grid_room: Room) => grid_room.coordinates.X === new_room_coords.X && grid_room.coordinates.Y === new_room_coords.Y);

        if (room_to_test) {
            path_open = !visited.has(room_to_test) && !unvisited.has(room_to_test) && Math.random() > 0.6;

            if (path_open) {
                if (direction === 'N' || direction === 'North') room_to_test.paths.S = true;
                if (direction === 'S' || direction === 'South') room_to_test.paths.N = true;
                if (direction === 'E' || direction === 'East') room_to_test.paths.W = true;
                if (direction === 'W' || direction === 'West') room_to_test.paths.E = true;
                unvisited.add(room_to_test);
            }
        }

        return path_open;
    }

    while ([...unvisited].length > 0) {
        [...unvisited].forEach((u_room: Room) => {
            unvisited.delete(u_room);

            visited.add(u_room);

            u_room.paths = {
                N: generatePath(u_room, 'N'),
                S: generatePath(u_room, 'S'),
                E: generatePath(u_room, 'E'),
                W: generatePath(u_room, 'W'),
            };
        });
    }

    return grid;
}

// Usage example
const gridWidth: number = 15;
const gridHeight: number = 15;
const map = generateMap(gridWidth, gridHeight);

const container = document.querySelector('.grid-container');

// console.log(map);

map.forEach((room) => container?.appendChild(room.createRoomElement()));
