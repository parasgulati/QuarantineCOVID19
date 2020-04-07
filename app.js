const http=require('http');
const api=require('backend/API');
const port=process.env.PORT;
api.set('port',port);
const server=http.createServer(api);
server.listen(port);
