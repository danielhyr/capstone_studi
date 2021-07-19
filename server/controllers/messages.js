
import userMessage from '../models/userMessage.js'



export const createMessages = async (req, res) => {
    const newMessage = new userMessage (req.body)
    console.log(req.body)
    try { 
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }

  }

  export const getMessages = async (req, res) => {
    console.log(req.params)
    try { 
       const messages = await userMessage.find({
        conversationId:req.params.conversationId
       })
       res.status(200).json(messages);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

  }