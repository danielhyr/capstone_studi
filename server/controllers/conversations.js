import Conversation from '../models/conversations.js';

export const createConvo = async (req, res) => {
    const newConversation = new Conversation ({
        member: [req.body.senderId, req.body.receiverId]
    })

    try { 
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }

  }

  export const getConvo = async (req, res) => {
    try { 
        const conversation = await Conversation.find({
            member: { $in: [req.params.userId] },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }

  }

  
  export const findconvo = async (req, res) => {
    console.log(req.params)
    try { 
        const conversation = await Conversation.findOne({
            member: { $all: [req.params.firstUserId, req.params.secondUserId]}
        })

        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }

  }