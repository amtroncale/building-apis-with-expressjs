const fs = require('fs');
let chirps = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}

let GetChirps = () => {
    return Object.assign({}, chirps); //create a copy and return it
}

let GetChirp = id => {
    return Object.assign({}, chirps[id]); //create a copy and return it
}

let CreateChirp = (chirp) => {
    chirps[chirps.nextid++] = chirp;
    WriteChirps();
};

let UpdateChirp = (id, chirp) => {
    chirps[id] = chirp;
    WriteChirps();
}

let DeleteChirp = id => {
    delete chirps[id];
    WriteChirps();
}

let WriteChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

module.exports = {
    CreateChirp: CreateChirp,
    DeleteChirp: DeleteChirp,
    GetChirps: GetChirps,
    GetChirp: GetChirp,
    UpdateChirp: UpdateChirp
}