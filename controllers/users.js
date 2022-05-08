import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../model/user.js';
import Message from '../model/message.js';

export const login = async(req, res) => {
    const { name, email, password, mobile } = req.body;
    try {
        const result = await User.findOne({ email });
        if(!result) {            
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await User.create({name, email, password: hashedPassword, mobile, loginAt: Date.now()});
            const token = jwt.sign({email: result.email, id: result._id }, 'test', {expiresIn: '600000'});

            if(result.name === 'admin' && result.email === 'admin@admin.com' && result.mobile === "0000000000") {
                const allUsers = await User.find();                
                res.status(200).json({allUsers, result, token});
            }

            res.status(200).json({ result, token });
        }        
        const loginTime = Number(Date.parse(result.loginAt));
        const expireTime = loginTime + 600000;

        const recentTime = Date.now();
        if(recentTime > expireTime) {
            res.status(300).json({message: "You exceed your time to login"});
        }
        const token = jwt.sign({email: result.email, id: result._id }, 'test', {expiresIn: '600000'});

        if(result.email === "admin@admin.com" && result.name === "admin" && result.mobile === "0000000000"){
            const allUsers = await User.find();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({allUsers, result, token});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({result, token});
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong "});
    }
}