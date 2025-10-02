import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
@Injectable()
export class DbService implements OnModuleInit {
  pool: Pool;
  constructor(){
    const url = process.env.DATABASE_URL;
    this.pool = new Pool({ connectionString: url, max: 5 });
  }
  async onModuleInit(){
    await this.pool.query('CREATE TABLE IF NOT EXISTS health_checks (id serial primary key, created_at timestamptz default now())');
  }
}
