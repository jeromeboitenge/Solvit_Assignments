import fs from 'fs'
import path from 'path'
export const database = () => {

    var db
    const cwd = process.cwd()
    const dbpath = path.join(cwd, './src/database/db.json')
    if (fs.readFileSync(dbpath)) {
        db = fs.readFileSync(dbpath, "utf-8");
    }
    else {
        fs.createWriteStream(dbpath)
        db = fs.readFileSync(dbpath, "utf-8")
    }
    return db

}
export const writeFile = (content: any) => {
    const cwd = process.cwd();
    const dbPath = path.join(cwd, "./src/database/db.json");
    fs.writeFileSync(dbPath, JSON.stringify(content));
};