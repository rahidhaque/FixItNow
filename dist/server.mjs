
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
import p from"cookie-parser";import e from"express";var o=e();o.use(e.json());o.use(e.urlencoded({extended:!0}));o.use(p());o.get("/",(c,i)=>{i.send("Server is running")});var r=o;import{configDotenv as s}from"dotenv";import{env as t}from"process";s();var n={NODE_ENV:t.NODE_ENV,PORT:t.PORT,DATABASE_URL:t.DATABASE_URL};n.NODE_ENV!=="production"&&r.listen(3e3,()=>{console.log("Server is running on http://localhost:3000/")});var g=r;export{g as default};
