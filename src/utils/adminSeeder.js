const User = require('../models/User');

async function ensureAdminExists() {
    try {
        // Kontrollera om admin redan finns
        const existingAdmin = await User.findOne({ 
            email: process.env.ADMIN_EMAIL,
            role: 'admin'
        });

        if (existingAdmin) {
            console.log('✅ Admin-konto finns redan');
            return;
        }

        // Skapa admin-användare
        const adminUser = new User({
            username: 'admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
        });

        await adminUser.save();
        console.log('✅ Admin-konto har skapats');
    } catch (error) {
        console.error('❌ Fel vid skapande av admin-konto:', error);
    }
}

module.exports = { ensureAdminExists };
