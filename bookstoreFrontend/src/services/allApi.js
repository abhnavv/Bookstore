import apiService from "../api/apiService"

//register api 
export const registerAPI=async(userData)=>{
    return  await apiService('POST','/register',userData)
}
// login api
export const loginAPI=async(userData)=>{
    return await apiService('POST','/login',userData)
}
// googel Login api
export const googleLoginAPI=async(userData)=>{
    return await apiService('POST','/google-login',userData)
}
//user profile edit API
export const userUpdateAPI=async(userId,userData)=>{
    return await apiService('PUT',`/user/edit/${userId}`,userData)
}

//add a book api - user 
export const addBookAPI=async(bookDetails)=>{
    return await apiService('POST',`/add-book`,bookDetails)
}
 
// home page recently added book details
export const homePageBooksAPI = async () => {
    return await apiService('GET','/home-books',{})
}

// the all books listing  api
export const allBooksAPI = async (searchKey) => {
    return await apiService('GET',`/all-books?search=${searchKey}`,{})
}

// for getting  user selling books api
export const userBookAPI = async () => {
    return await apiService('GET','/user-books',{})
}

// for getting  user bought books api
export const userBoughtBookAPI = async () => {
    return await apiService('GET','/bought-books',{})
}

// single book view api
export const getSingleBookAPI = async (id) => {
    return await apiService('GET',`/single-book/${id}`,{})
}

// remove book api
export const removeBookAPI = async (id) => {
    return await apiService('DELETE',`/remove-book/${id}`,{})
}

//make payment api
export const makePaymentAPI = async(id) => {
    return await apiService('GET',`/make-payment/${id}`,{})
}
//verify payment api
export const verifyPaymentAPI = async(reqbody) => {
    return await apiService('POST',`/verify-payment`,reqbody)
}
// get admin books api
export const BooksAPI = async () => {
    return await apiService('GET',`/books`,{})
}
// admin book approval API
export const editBookStatusAPI = async (id) => {
    return await apiService('PUT',`/book-update/${id}`,{})
}
// admin listing users page API
export const getAllUsersAPI = async () => {
    return await apiService('GET',`/all-users`,{})
}

// get book abstract API when entering book title
export const getBookAbstractAPI = async (title) => {
    return await apiService('POST',`/books-ai`,{title})
}
//admin profile edit API
export const adminUpdateAPI=async(adminId,adminData)=>{
    return await apiService('PUT',`/admin-settings/edit/${adminId}`,adminData)
}