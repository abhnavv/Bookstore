
const books = require('../Models/bookModel')
const stripe = require('stripe')(process.env.STRIPEKEY)
const {GoogleGenerativeAI} = require('@google/generative-ai')
// adding new book by user controller
exports.addBookController = async (req, res) => {
    console.log("inside add book controller");
    const { title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category } = req.body

    const uploadImages = req.files.map(item => item.filename)

    const sellerEmail = req.payload

    console.log(title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages, sellerEmail);

    const existingBook = await books.findOne({ title, sellerEmail })
    if (existingBook) {
        res.status(409).json("Book already exist..operation denied")
    } else {
        const newBook = await books.create({ title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages, sellerEmail })
        res.status(200).json(newBook)
    }


}

// recent 4 images in the home page
exports.getHomePageBookController = async (req, res) => {
    console.log("Inside gethomepagebookControler");
    const homeBooks = await books.find().sort({ _id: -1 }).limit(4)
    res.status(200).json(homeBooks)
}

// display all books for logined users
exports.getBooksPageController = async (req, res) => {
    console.log("Inside getBooksPageController");
    const loginUsermail = req.payload
    const searchKey = req.query.search
    const allBooks = await books.find({ sellerEmail: { $ne: loginUsermail }, title: { $regex: searchKey, $options: "i" } })
    res.status(200).json(allBooks)
}

// display book uploaded by the logined user
exports.getUserBookContoller = async (req, res) => {
    console.log("inside getUserBookContoller");
    const loginUsermail = req.payload
    const userUploadbooks = await books.find({ sellerEmail: loginUsermail })
    res.status(200).json(userUploadbooks)
}

// display book bought by the logined user
exports.getUserBoughtBookContoller = async (req, res) => {
    console.log("inside getUserBoughtBookContoller");
    const loginUsermail = req.payload
    const userBoughtbooks = await books.find({ buyerEmail: loginUsermail })
    res.status(200).json(userBoughtbooks)
}

// get single book 
exports.getSingleBookContoller = async (req, res) => {
    console.log("inside getSingleBookContoller");
    const { id } = req.params
    const bookDetails = await books.find({ _id: id })
    res.status(200).json(bookDetails)
}

// remove a book 
exports.removeBookContoller = async (req, res) => {
    console.log("inside emoveBookContoller");
    const { id } = req.params
    const deletedBook = await books.findByIdAndDelete({ _id: id })
    res.status(200).json(deletedBook)
}

// payment controler for stripe
exports.bookPaymentController = async (req, res) => {
    console.log("inside bookpayment controller");
    const { id } = req.params
    const loginUsermail = req.payload
    const bookDetails = await books.findById({ _id: id })
    const stripe = require('stripe')(process.env.STRIPEKEY);

    const session = await stripe.checkout.sessions.create({
       
        line_items: [
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:bookDetails.title
                    },
                    unit_amount:Math.round(bookDetails.discountPrice*100)
                },
                quantity:1
            },
        ],
        mode: 'payment',
        metadata:{
            bookId:id,
            buyerEmail:loginUsermail
        },
        success_url:'https://bookstore-three-blush.vercel.app//success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url:'https://bookstore-three-blush.vercel.app//cancel'
    });
    console.log(session);
    res.status(200).json({checkoutURL:session.url})
}

//updating the bookstatus after payment successfull
exports.verifyPaymentController = async(req,res) => {
    console.log("inside veirfyPayment controler");
    const {sessionID} = req.body
    const session = await stripe.checkout.sessions.retrieve(sessionID)
    console.log(session)
    if(session.payment_status == 'paid'){
        const bookid = session.metadata.bookId
        const email = session.metadata.buyerEmail
        const book = await books.findById({_id:bookid}) 
        book.status = 'Sold'
        book.buyerEmail = email
        await book.save()
        res.status(200).json({message:"Payment Verified",book})
    }else{
        res.status(400).json("payment Not completed")

    }
}

// get all books admin section
exports.getAllBooksController = async (req, res) => {
    console.log("Inside getAllBooksController");
    const allBooks = await books.find()
    res.status(200).json(allBooks)
}

// admin approval book controller
exports.approvalBooksController = async (req, res) => {
    console.log("Inside approvalBooksController");
    const {id} = req.params
    const book = await books.findById({_id:id})
    book.status='Approved'
    await book.save()
    res.status(200).json(book)
}

// get book abstract
exports.generateBookAbstractController = async (req,res) => {
    console.log("inside generatBookAbstractController")
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)
    const {title} = req.body
    const model = genAI.getGenerativeModel({
        model:'gemini-3.5-flash'
    })

    const result = await model.generateContent(`Give me a short abstract of the book ${title} as plain text`)
    const reply = result.response
    console.log(reply);
    
    res.status(200).json({
        success:true,
        content:reply.candidates[0].content.parts[0].text
    })
}