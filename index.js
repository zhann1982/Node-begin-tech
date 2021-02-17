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
        err => err
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
        err => err
    );
}

const getDogPic = async () => {

    try {

        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res1pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const allPro = await Promise.all([res1pro,res2pro,res3pro])

        const imgs = allPro.map(el=>el.body.message);
        
        await writeFilePro(`${__dirname}/dog-image-link.txt`, imgs.join('\n'));
        console.log(`Random picture link saved to file`);
        
    } catch (err) {

        throw err;

    }

    return '2 promise ready!'
}


(async () => {
    try {
        console.log("1 will get");
        const x = await getDogPic();
        console.log(x);
        console.log("3 got it");
    } catch (err) {
        console.log("error BANG!!!");
    }
})();


/*
console.log("1 will get");
getDogPic().then(x => {
    console.log(x);
    console.log("3 got it");
})
.catch(err=>{
    console.log("error");
});
*/

