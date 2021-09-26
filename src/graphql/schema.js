var { buildSchema } = require("graphql")




const schema = buildSchema(`


type googleAuthData{
    accessToken:String

}

type StudentsDetails{
   
    name:String
    class:Int
    roll:Int
    fname:String
}

type AuthData{
    token:String
    Expiry:Int
    id:ID
}

type Query {
    loginUser(email:String!,password:String!):AuthData

    getstudentDeail(id:ID):StudentsDetails

}

input name {
     name:String

}

input newStudent{
    
    name:String
    class:Int
    roll:Int
    fname:String
    address:String

}
type studentDetail{
    _id:ID
    name:String
    class:Int
    roll:Int
    fname:String

}
input updateStudent{
    
    name:String
    class:Int
    roll:Int
    fname:String

}

type Mutation{
    addnewStudent(input:newStudent!) : studentDetail
    updateStu(input:updateStudent ,id:ID):studentDetail
}



`)


module.exports = schema