const Order = require('../Models/orderModle')

const addOrder = async (req, res) => {
    try {
        console.log("in try")
        const { userId, subTotal, phoneNumber } = req.body;
        
        console.log("Before creating")
        const order = new Order({
            userId: userId,
            subTotal: subTotal,
            phoneNumber: phoneNumber
        });

        console.log("Before saving")
        await order.save();

        console.log("After saving")
        res.json({ message: 'Order added successfully' });
    } catch (error) {
        console.error(error.message);
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
