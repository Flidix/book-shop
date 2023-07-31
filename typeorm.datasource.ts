import { basename, join } from 'path';
import { DataSource } from 'typeorm';

import { Environment } from '@shared/variables/environment';

<<<<<<< HEAD
const isDist = __dirname.endsWith('dist');
=======
const isDist = basename(__dirname) === 'dist';
>>>>>>> db12171834fe2a43b22d6ddd8da51f758606ce5a

const filesExtension = isDist ? '.js' : '.ts';


const dataSource = new DataSource({
  type: 'postgres',
  host: Environment.DATABASE_HOST,
  port: Environment.DATABASE_PORT,
  username: Environment.DATABASE_USER,
  password: Environment.DATABASE_PASSWORD,
  database: Environment.DATABASE_NAME,

  migrationsRun: true,

  entities: [join(__dirname, '/**/entities/*.entity' + filesExtension)],
  migrations: [
    join(__dirname, '/**/migrations/*' + filesExtension),
    join(__dirname, '/**/seeds/*' + filesExtension),
  ],
  subscribers: [join(__dirname, '/**/subscribers/*' + filesExtension)],
});

export default dataSource;
