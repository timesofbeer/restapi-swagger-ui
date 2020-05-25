const express =require('express');
const appRouter = express.Router();
const appController = require('../controller');
const middleware =require('../middleware')
//Intergrating Swagger UI : Test API endpoints
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
appRouter.use('/docs', swaggerUi.serve);
appRouter.get('/docs', swaggerUi.setup(swaggerDocument));

appRouter.post('/register',appController.auth.register);
appRouter.post('/login',appController.auth.login);
appRouter.post('/otplogin',appController.auth.loginWithOtp);
appRouter.post('/verifyotp',appController.auth.verifyOtp);
appRouter.get('/polls',middleware.auth,appController.polls.showPolls);
appRouter.post('/polls',middleware.auth,appController.polls.createPolls);
appRouter.get('/test',(req,res)=>{
  res.json({})
});


module.exports= appRouter;