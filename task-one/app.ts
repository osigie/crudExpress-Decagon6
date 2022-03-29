import createError from 'http-errors';
import express,{Request, Response, NextFunction} from'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';



import indexRouter from'./routes/index';
import usersRouter from'./routes/users' ;

const app = express();

// view engine setup
app.set('views', path.join(__dirname,'views'));
// app.set('views', "/Users/user/Desktop/Dev/week-6-node-010-osigie/task-one/views")
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/api/datas", usersRouter)

// catch 404 and forward to error handler
app.use(function(req:Express.Request, res:Express.Response, next:Function) {
  next(createError(404));
});

///error handler
app.use(function(err:createError.HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});









// import express from 'express';
// const app = express();
// import {router} from "./routes/index"
// //Express body parser
// app.use(express.json());

// app.use("/api/datas", indexRouter)

const PORT = process.env.PORT || 6000

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
