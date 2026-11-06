//setting up of path outside server can withstand an object express
const express=require('express')
const userController=require('../controller/userController')
const authMiddleware=require('../Middlewares/authMiddleware')
const adminAuthMiddleware=require('../Middlewares/adminAuthMiddleware')
const multerMiddleware=require('../Middlewares/multerMiddleware')
const bookController=require('../controller/bookController')

//to setup routes outside express server,create object for router class in express
const router=new express.Router()

//register 
router.post('/register',userController.registerController)
router.post('/login',userController.loginController)
router.post('/google-login',userController.googleLoginController)
router.get('/home-books',bookController.getHomePageBookController)


// -----------authorized users-------

// router specific middleware
router.put('/user/edit/:id',authMiddleware,multerMiddleware.single('picture'),userController.userEditController)

router.put('/admin-settings/edit/:id',authMiddleware,multerMiddleware.single('picture'),userController.adminEditController)

router.post('/add-book',authMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

router.get('/all-books',authMiddleware,bookController.getBooksPageController),

router.get('/user-books',authMiddleware,bookController.getUserBookContoller)

router.get('/bought-books',authMiddleware,bookController.getUserBoughtBookContoller)

router.get('/single-book/:id',authMiddleware,bookController.getSingleBookContoller)

//get book abstract via ai
router.post('/books-ai',authMiddleware,bookController.generateBookAbstractController)

router.delete('/remove-book/:id',authMiddleware,bookController.removeBookContoller)

router.get('/make-payment/:id',authMiddleware,bookController.bookPaymentController)

router.post('/verify-payment',bookController.verifyPaymentController)

// --------------------admin section --------------------------
router.get('/books',adminAuthMiddleware,bookController.getAllBooksController)
// admin book approval route
router.put('/book-update/:id',adminAuthMiddleware,bookController.approvalBooksController)
// admin users listing route
router.get('/all-users',adminAuthMiddleware,userController.getAllUserController)


module.exports=router