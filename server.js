const express=require('express')
const {graphqlHTTP} =require('express-graphql')
const {buildSchema} =require('graphql')
// Grphql schema
const scheme=buildSchema(`
    type Query{
        course(id:Int!):Course
        courses(topic:String):[Course]
    }
    type Course{
        id:Int
        title:String
        author:String
        description:String
        topic:String
        url:String
    }

`)

var coursesData=[
    {
        id:1,
        title:'Course one ',
        author:'Alamin',
        description:"this is discription",
        topic:'Math',
        url:'http://course.com/post1'
    },
    {
        id:2,
        title:'Course two ',
        author:'Ayrin',
        description:"this is discription 2",
        topic:'Math 2',
        url:'http://course.com/post2'
    },
    {
        id:3,
        title:'Course three ',
        author:'moyna ',
        description:"this is discription 3",
        topic:'Math3',
        url:'http://course.com/post3'
    },
    {
        id:4,
        title:'Course  four ',
        author:'lima',
        description:"this is discription 4",
        topic:'Math 4',
        url:'http://course.com/post4'
    },
    {
        id:5,
        title:'Course 5',
        author:'human',
        description:"this is discription 5",
        topic:'Math 5',
        url:'http://course.com/post5'
    },
    {
        id:6,
        title:'Course 6 ',
        author:'Alamin 6',
        description:"this is discription 6",
        topic:'Math 6',
        url:'http://course.com/post17'
    },
    {
        id:7,
        title:'Course 7 ',
        author:' g 7',
        description:"this is discription 6",
        topic:'Math 7' ,
        url:'http://course.com/post7'
    }
]

const getCourse =(args)=>{
    return coursesData.filter(course=>{
        return course.id==args.id
    })[0]
}
const getCourses=(args)=>{
    if(args.topic){
        return coursesData.filter(course=>course.topic===args.topic)
    }
    return coursesData
}
const root ={
    course:getCourse,
    courses:getCourses
}


// create an express server nd a graphQl endpoing
const app=express()
app.use('/graphql',graphqlHTTP({
    schema:scheme,
    rootValue:root,
    graphiql:true
}))

app.listen(5000,()=>console.log('server running on port 5000'))