import {LevelDB} from './leveldb';
import WriteStream from 'level-ws'

export class Metric {

public timestamp: string
public value: number

constructor(ts: string, v: number) {
this.timestamp = ts
this.value = v
}
}

export class MetricsHandler {

private db: any

constructor(dbPath: string) {
this.db = LevelDB.open(dbPath)
}

public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
const stream = WriteStream(this.db)
stream.on('error', callback)
stream.on('close', callback)
metrics.forEach((m: Metric) => {
stream.write({ key: `metric:${key}`, value: `${m.value} / ${m.timestamp}`})
})
stream.end()
}

public have_one(key: number, callback: (error: Error | null, result?: String) => void) {

this.db.get(`metric:${key}`, function(err, value) {  
if (err) {
console.log("Erreur "+err);
}
console.log(JSON.stringify(value));
});

}

public have_all(callback: (error: Error | null, result?: String) => void) {

var stream = this.db.createReadStream();
stream.on('data', function(data) {
 console.log(JSON.stringify(data));
})

}

public suppress_one(key: number,callback: (error: Error | null, result?: String) => void) {

this.db.del(`metric:${key}`, function(err, value) {  
  if (err) {
    console.log("Erreur "+err);
  }
  console.log('delete !');
});

}

static get(callback: (error: Error | null, result?: Metric[]) => void) {
const result = [
new Metric('2013-11-04 14:00 UTC', 12),
new Metric('2013-11-04 14:30 UTC', 15)
]
callback(null, result)
}


}