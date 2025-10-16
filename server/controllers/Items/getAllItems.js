import Item from '../../models/Item.js'

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        console.log(items);
        if (items.length > 0) {
            return res.status(201).json({ items })
        } else {
            return res.status(204).json({ ok: false, msg: 'No items in DB' })
        }
    } catch (error) {

        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: error.message,
        })
    }
}

export default getAllItems
