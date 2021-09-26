const { json } = require('express');
const { nanoid } = require('nanoid');
const { update } = require('../db/schema');
const Student = require('../db/schema')
const jwt = require('jsonwebtoken')




const resolvers = {



    loginUser: async ({ email, password }, request, context) => {
        if (!request.isAuth) {
            console.log(false);
            throw new Error("unauthorzed");
        }
        console.log(request.isAuth);
        const User = await Student.findOne({ email })
        if (!User) {
            throw new Error('User not found')
        }
        else {
            if (!password == User.password) {
                throw new Error('incorrect password')
            }
            else {
                const token = jwt.sign({ email, password }, "thisisashishpanwar", {
                    expiresIn: "1h"
                })
                return ({ token, Expiry: 1, id: User._id })
            }
        }


    },
    getstudentDeail: async (args) => {
        const id = args.id
        const stuData = await Student.findById(id)
        return stuData

    },
    addnewStudent: async (input) => {
        const userId = nanoid();
        const { name, fname, roll, address } = input.input
        console.log(name, fname, roll, address);
        const newStudent = await Student({ userId, name, fname, roll, address })
        newStudent.save()
        console.log(newStudent);
        return newStudent
    },
    updateStu: async (args) => {

        const id = args.id;
        const { name, roll, fname, address } = args.input
        const updatedStu = await Student.findByIdAndUpdate({ _id: id }, { "name": name, "fname": fname, "address": address }, {
            new: true
        })
        console.log(updatedStu);
        return updatedStu

    },

}

module.exports = resolvers