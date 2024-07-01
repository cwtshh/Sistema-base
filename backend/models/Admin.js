const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        type: {
            type: String,
            enum: ['admin', 'superadmin'],
            default: 'admin'
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'admins',
    }
);

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;