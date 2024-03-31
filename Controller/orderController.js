const Order = require('../Models/orderModle')

const addOrder = async (req, res) => {
    try {
        const { userId, subTotal, phoneNumber } = req.body;
        
        const order = new Order({
            userId: userId,
            subTotal: subTotal,
            phoneNumber: phoneNumber
        });

        await order.save();

        res.json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getOrder = async (req, res) => {
    try {
        const { user_id } = req.query;

        const orders = await Order.find({ user: user_id });

        const  orderDeatils={id:orders.userId, subToatal:orders.subTotal,phoneNumber:orders.phoneNumber}
        res.json(orderDeatils);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    addOrder,
    getOrder
};
