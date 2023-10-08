import { createReadStream } from "fs";
import { Writable, Transform, pipeline } from "stream";
import path from "path";

console.log(path.dirname("") + "../data/nakamura_1979_sm_locations.csv");

const read = createReadStream(path.dirname("") + "/data/nakamura_1979_sm_locations.csv");

const toJson = new Transform({
    objectMode: true,
    transform(chunk, enc, cb) {
        const csvContent = chunk.toString();
        const [headers, ...content] = csvContent.split("\n").map(el => el.replace("\r", ""))
        content.pop();

        const obj = content.map(data => {
            const arrValues = data.split(",");
            
            return {  
                year:arrValues[0],
                day:arrValues[1],
                hour:arrValues[2],
                minute:arrValues[3],
                second:arrValues[4],
                latitude:arrValues[5],
                longitude:arrValues[6],
                magnitude:arrValues[7],
            }
        })
        console.log(obj);

        cb()
    }
})

const write = new Writable({
    write(chunk, enc, cb) {
        console.log(chunk.toString());
        cb();
    }
})



read.pipe(toJson)