import cors         from 'cors';
import express      from 'express';
import morgan       from 'morgan';
import mainRoutes   from './routes/main';

const port  = 2012;
const app   = express()
    .use(cors({origin: 'http://localhost:5173'}))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(morgan(':date \: :remote-addr - :method :url | :status | :response-time ms | :res[content-length]'))
    .use('/', mainRoutes)
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;