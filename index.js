const fs = require('fs');
const { connected } = require('process');
const superagent = require('superagent');

// let readFilePro = filePath => {
//     fs.readFile(filePath, (err,data)=>{
//     if (err) return console.log(err);

//     console.log(`Breed: ${data}`);

//         // superagent
//         //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         //     .then((res)=>{
//         //         fs.writeFile('dog-image-link.txt', res.body.message, err => {
//         //             if (err) return console.log(err.message);
//         //             console.log('Random image link saved to file');
//         //         });
//         //     })
//         //     .catch(err => console.log(err.message));
//     });
// }



// ------------ Async Await ---------------------

const readFilePro = async filePath =>{
    let data;
    await new Promise((res,rej)=>{
        fs.readFile(filePath, (err,data)=>{
        if (err) rej(err);
        res(data);
        });
    }).then(
        res => data = res,
        err => data = err
    );
    return data
}

const writeFilePro = async (filePath, data) =>{
    await new Promise((res,rej)=>{
        fs.writeFile(filePath, data, err=>{
        if (err) rej(err);
        res('File written');
        });
    }).then(
        res => console.log(res),
        err => console.log(err)
    );
}

const getDogPic = async () => {
    try {

        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        
        await writeFilePro(`${__dirname}/dog-image-link.txt`, res.body.message);
        console.log(`Random picture link saved to file`);
        
    } catch (err) {
        throw err;
    }
}

getDogPic();