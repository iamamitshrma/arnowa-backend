import Message from '../model/message.js';


export const postMessage = async(req, res) => {
    const { message, userId } = req.body;
    // console.log(req.body);
    try {
       const result = await Message.create({message, userId});
       res.status(200).json(result);  
    } catch (error) {
        res.status(500).json({ message: "Something went wrong "});
    }
}

export const getMessage = async(req, res) => {
    console.log(req.body);
    const { email } = req.body;
    try {
        const response = await Message.find({ userId: email });
        console.log(response);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
    }
}