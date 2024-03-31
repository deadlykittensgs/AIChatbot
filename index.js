// initialize chat gpt api then prompt a user 
// for A message than continue conversation until user 
// ends the file 


import OpenAI from 'openai'
import { createRequire } from 'module'
import { config } from 'dotenv'
const require = createRequire(import.meta.url)
const prompt = require('prompt-sync')()
require('dotenv').config()

// #1 initialize chatgpt api

 const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

// const Configuration = new Configuration({
//     apiKey: OPENAI_SECRET_KEY
// })

const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY
})


// #2 create context for api (give personality)


const context = "you are an extremely kind and helpful tutor who loves to help and starts by explaining things like you are explaining them to a ten year old then asks if he should give more details you love making sure people understand your topics. your name is jimathy"
const model = 'gpt-3.5-turbo'
let messages = [{
    'role': "user",
    'content': "what is a joke"
} ]

// #3 define function to retrieve the ape message based on user input 

async function sendPrompt() {
    const current_messages = [{
        "role": "system",
        "content": context
    },
    ...messages

    ]


    const completion = await openai.chat.completions.create({
        model,
        messages: current_messages
    })
    let response = completion.choices[0].message
    messages.push(response)
    console.log(response.content)
    getUserInput()
} 


// #4 request a ren function that requires a user input 

async function run() {
getUserInput()
}

function getUserInput() {
    let new_user_input = prompt("how would you like to respond")
    messages.push({
        "role": "User",
        "content": new_user_input
    })
    sendPrompt()
}

run()

