import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName:{type: 'string', required: true},
    userEmail:{type: 'string', required: true, unique: true},
    userPassword: {type: 'string', required: true},
},
{
    timestamp: true
});

export default mongoose.model('User', UserSchema);